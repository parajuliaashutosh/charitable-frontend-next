/* eslint-disable @typescript-eslint/no-explicit-any */
import { RpcOptions, UnaryCall } from "@protobuf-ts/runtime-rpc";

type GrpcInterceptParams<
  TClient,
  TRequest extends object,
  TResponse extends object
> = {
  client: TClient;
  // Fix: The method returns a UnaryCall, not a Promise
  method: (
    client: TClient
  ) => (
    input: TRequest,
    options?: RpcOptions
  ) => UnaryCall<TRequest, TResponse>;
  args: TRequest;
  retries?: number;
  options?: RpcOptions;
};

export class CustomGrpcInterceptor {
  async intercept<TClient, TRequest extends object, TResponse extends object>({
    client,
    method,
    args,
    retries = 3,
    options = {},
  }: GrpcInterceptParams<TClient, TRequest, TResponse>): Promise<TResponse> {

    const meta = {
      ...(options?.meta || {}),
      "x-retry-config": JSON.stringify({ maxRetries: retries }),
    };
    const rpcOptions: RpcOptions = { ...options, meta };

    const targetMethod = method(client);

    let lastError: any;
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const call = targetMethod(args, rpcOptions);
        return await call.response;
      } catch (error: any) {
        lastError = error;
        if (attempt < retries && this.shouldRetry(error)) {
          await this.delay(Math.min(1000 * Math.pow(2, attempt), 30000));
          continue;
        }
        throw error;
      }
    }
    throw lastError;
  }

  private shouldRetry(error: any): boolean {
    const retryableCodes = ["UNAVAILABLE", "DEADLINE_EXCEEDED", "UNKNOWN"];
    return retryableCodes.includes(error?.code);
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
