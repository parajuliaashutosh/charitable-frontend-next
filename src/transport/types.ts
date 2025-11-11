/* eslint-disable @typescript-eslint/no-explicit-any */
// src/transport/types.ts

// The request object passed into your interceptor
export interface GrpcRequest<T = any> {
  method: string;       // the gRPC method name
  requestData: T;       // the payload sent
  service?: any;        // optional, the client instance
}

// The "next" function that actually makes the gRPC call
export type GrpcNext<TRequest = any, TResponse = any> = (request: GrpcRequest<TRequest>) => Promise<TResponse>;

// The interceptor interface your wrapper uses
export interface GrpcInterceptor {
  intercept<TRequest = any, TResponse = any>(
    request: GrpcRequest<TRequest>,
    next: GrpcNext<TRequest, TResponse>
  ): Promise<TResponse>;
}
// src/transport/types.ts

// The request object passed into your interceptor
export interface GrpcRequest<T = any> {
  method: string;       // the gRPC method name
  requestData: T;       // the payload sent
  service?: any;        // optional, the client instance
}

// The "next" function that actually makes the gRPC call

// The interceptor interface your wrapper uses
export interface GrpcInterceptor {
  intercept<TRequest = any, TResponse = any>(
    request: GrpcRequest<TRequest>,
    next: (request: GrpcRequest<TRequest>) => Promise<TResponse>
  ): Promise<TResponse>;
}
