import { RpcOptions } from "@protobuf-ts/runtime-rpc";
import { PerRequestRetryConfig, RETRY_CONFIG_META_KEY } from "./grpc-interceptor";

export interface GrpcCallOptions<TClient, TRequest, TResponse> {
  client: TClient;
  method: (client: TClient) => (request: TRequest, options?: RpcOptions) => UnaryCall<TRequest, TResponse>;
  args: TRequest;
  retries?: number;
  retryConfig?: Partial<PerRequestRetryConfig>;
}


export function grpcCall<TClient, TRequest, TResponse>(
  options: GrpcCallOptions<TClient, TRequest, TResponse>
): Promise<TResponse> {
  const { client, method, args, retries, retryConfig } = options;
  
  const callOptions: RpcOptions = {};
  
  if (retries !== undefined || retryConfig) {
    callOptions.meta = {
      [RETRY_CONFIG_META_KEY]: {
        maxRetries: retries,
        ...retryConfig
      }
    };
  }
  
  const methodFn = method(client);
  return methodFn(args, callOptions).response;
}