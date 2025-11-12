import { GrpcInterceptorWrapper } from "./gateway/gRPC/grpc-interceptor-wrapper";

type Protocol = "grpc" | "rest";

// Updated InterceptorRegistry with type safety
export class InterceptorRegistry {
  private static instance: InterceptorRegistry;
  private readonly interceptors: Record<Protocol, unknown>;

  private constructor() {
    this.interceptors = {
      grpc: new GrpcInterceptorWrapper(),
      rest: new GrpcInterceptorWrapper(),
    };
  }

  public static getInstance(): InterceptorRegistry {
    if (this.instance == null) {
      this.instance = new InterceptorRegistry();
    }
    return this.instance;
  }

  public getInterceptor(protocol: Protocol): unknown {
    const interceptor = this.interceptors[protocol];
    if (!interceptor) {
      throw new Error(`No interceptor found for protocol: ${protocol}`);
    }
    return interceptor;
  }
}

export const interceptorRegistry = InterceptorRegistry.getInstance();
