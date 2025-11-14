import { InterceptorRegistry } from "@/transport/interceptor-registry";
import { CustomGrpcInterceptor } from "./grpc-interceptor";

export function ensureInterceptorRegistry(): InterceptorRegistry {
  const registry = InterceptorRegistry.getInstance();

  return registry;
}

export function getGrpcInterceptor(): CustomGrpcInterceptor {
  const registry = ensureInterceptorRegistry();
  const interceptor = registry.getInterceptor("grpc") as CustomGrpcInterceptor;

  if (!interceptor) {
    throw new Error("gRPC interceptor is not registered!");
  }

  return interceptor;
}
