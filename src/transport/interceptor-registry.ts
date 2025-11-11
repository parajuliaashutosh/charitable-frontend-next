/* eslint-disable @typescript-eslint/no-explicit-any */
import { RpcInterceptor } from "@protobuf-ts/runtime-rpc";

type Protocol = "grpc" | "rest";


// Updated InterceptorRegistry with type safety
export class InterceptorRegistry {
  private static instance: InterceptorRegistry;
  private static interceptors: Map<Protocol, RpcInterceptor> = new Map();

  private constructor() {}

  public static getInstance(): InterceptorRegistry {
    if (this.instance == null) {
      this.instance = new InterceptorRegistry();
    }
    return this.instance;
  }

  public static getInterceptor(protocol: Protocol): RpcInterceptor {
    const interceptor = this.interceptors.get(protocol);
    if (!interceptor) {
      throw new Error(`No interceptor found for protocol: ${protocol}`);
    }
    return interceptor;
  }

  public static registerInterceptor(
    protocol: Protocol,
    interceptor: RpcInterceptor
  ): void {
    this.interceptors.set(protocol, interceptor);
  }

  public static hasInterceptor(protocol: Protocol): boolean {
    return this.interceptors.has(protocol);
  }
}

export const interceptorRegistry = InterceptorRegistry.getInstance();