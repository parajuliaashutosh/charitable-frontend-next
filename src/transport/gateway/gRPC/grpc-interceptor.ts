/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ClientStreamingCall,
  DuplexStreamingCall,
  MethodInfo,
  RpcError,
  RpcInterceptor,
  RpcOptions,
  ServerStreamingCall,
  UnaryCall,
} from "@protobuf-ts/runtime-rpc";

type Protocol = "grpc" | "rest";

// Configuration for retry behavior
export interface RetryConfig {
  maxRetries: number;
  initialDelayMs: number;
  maxDelayMs: number;
  backoffMultiplier: number;
  retryableStatusCodes?: string[]; // gRPC status codes to retry on
}

// Per-request retry configuration (add to RpcOptions.meta)
export interface PerRequestRetryConfig {
  maxRetries?: number;
  initialDelayMs?: number;
  maxDelayMs?: number;
  backoffMultiplier?: number;
}

// Custom metadata key for per-request retry config
export const RETRY_CONFIG_META_KEY = "x-retry-config";

// Configuration for logging
export interface LogConfig {
  logRequests: boolean;
  logResponses: boolean;
  logErrors: boolean;
  logger?: (message: string, data?: any) => void;
}

// Default configurations
const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxRetries: 3,
  initialDelayMs: 1000,
  maxDelayMs: 30000,
  backoffMultiplier: 2,
  retryableStatusCodes: ["UNAVAILABLE", "DEADLINE_EXCEEDED", "UNKNOWN"],
};

const DEFAULT_LOG_CONFIG: LogConfig = {
  logRequests: true,
  logResponses: true,
  logErrors: true,
  logger: (message: string, data?: any) => {
    console.log(message, data ? JSON.stringify(data, null, 2) : "");
  },
};

// Type-safe gRPC Interceptor
export class GrpcRetryLoggingInterceptor implements RpcInterceptor {
  private retryConfig: RetryConfig;
  private logConfig: LogConfig;

  constructor(
    retryConfig: Partial<RetryConfig> = {},
    logConfig: Partial<LogConfig> = {}
  ) {
    this.retryConfig = { ...DEFAULT_RETRY_CONFIG, ...retryConfig };
    this.logConfig = { ...DEFAULT_LOG_CONFIG, ...logConfig };
  }

  private log(message: string, data?: any): void {
    if (this.logConfig.logger) {
      this.logConfig.logger(message, data);
    }
  }

  private async delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private calculateBackoff(attempt: number): number {
    const delay = Math.min(
      this.retryConfig.initialDelayMs *
        Math.pow(this.retryConfig.backoffMultiplier, attempt),
      this.retryConfig.maxDelayMs
    );
    // Add jitter (±20%)
    const jitter = delay * 0.2 * (Math.random() * 2 - 1);
    return Math.floor(delay + jitter);
  }

  private shouldRetry(
    error: RpcError,
    attempt: number,
    maxRetries: number
  ): boolean {
    if (attempt >= maxRetries) {
      return false;
    }

    const statusCode = error.code;
    return this.retryConfig.retryableStatusCodes?.includes(statusCode) ?? false;
  }

  private getRetryConfig(options: RpcOptions): RetryConfig {
    // Check if there's a per-request retry config in meta
    const perRequestConfig = options.meta?.[RETRY_CONFIG_META_KEY] as
      | PerRequestRetryConfig
      | undefined;

    if (perRequestConfig) {
      return {
        ...this.retryConfig,
        ...perRequestConfig,
      };
    }

    return this.retryConfig;
  }

  interceptUnary(
    next: any,
    method: MethodInfo,
    input: object,
    options: RpcOptions
  ): Promise<any> {
    // <- change return type to Promise of payload
    if (this.logConfig.logRequests) {
      this.log(
        `[gRPC Request] ${method.service.typeName}.${method.name}`,
        input
      );
    }

    const retryConfig = this.getRetryConfig(options);
    let attempt = 0;
    const startTime = Date.now();

    const makeCall = async (): Promise<any> => {
      try {
        const call: UnaryCall<any, any> = next(method, input, options);
        const response = await call.response; // this is the actual payload

        if (this.logConfig.logResponses) {
          this.log(
            `[gRPC Response] ${method.service.typeName}.${method.name}`,
            {
              response,
              durationMs: Date.now() - startTime,
              attempts: attempt + 1,
            }
          );
        }

        return response; // ✅ only the payload
      } catch (error) {
        const rpcError = error as RpcError;

        if (this.logConfig.logErrors) {
          this.log(
            `[gRPC Error] ${method.service.typeName}.${method.name} - Attempt ${
              attempt + 1
            }`,
            {
              error: rpcError.message,
              code: rpcError.code,
            }
          );
        }

        if (this.shouldRetry(rpcError, attempt, retryConfig.maxRetries)) {
          attempt++;
          const backoffMs = this.calculateBackoff(attempt - 1);

          this.log(
            `[gRPC Retry] ${method.service.typeName}.${method.name} - Retrying in ${backoffMs}ms (attempt ${attempt}/${retryConfig.maxRetries})`
          );

          await this.delay(backoffMs);
          return makeCall();
        }

        throw error;
      }
    };

    return makeCall(); // ✅ returns Promise of payload directly
  }

  // For streaming calls, we don't retry but still log
  interceptServerStreaming(
    next: any,
    method: MethodInfo,
    input: object,
    options: RpcOptions
  ): ServerStreamingCall {
    if (this.logConfig.logRequests) {
      this.log(
        `[gRPC ServerStreaming Request] ${method.service.typeName}.${method.name}`,
        { input }
      );
    }

    const call = next(method, input, options);

    if (this.logConfig.logErrors) {
      call.status.catch((error: RpcError) => {
        this.log(
          `[gRPC ServerStreaming Error] ${method.service.typeName}.${method.name}`,
          {
            error: error.message,
            code: error.code,
          }
        );
      });
    }

    return call;
  }

  interceptClientStreaming(
    next: any,
    method: MethodInfo,
    options: RpcOptions
  ): ClientStreamingCall {
    if (this.logConfig.logRequests) {
      this.log(
        `[gRPC ClientStreaming Request] ${method.service.typeName}.${method.name}`
      );
    }

    return next(method, options);
  }

  interceptDuplex(
    next: any,
    method: MethodInfo,
    options: RpcOptions
  ): DuplexStreamingCall {
    if (this.logConfig.logRequests) {
      this.log(
        `[gRPC DuplexStreaming Request] ${method.service.typeName}.${method.name}`
      );
    }

    return next(method, options);
  }
}
