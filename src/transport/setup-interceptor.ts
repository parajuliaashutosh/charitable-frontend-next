
// import { GrpcRetryLoggingInterceptor } from "./gateway/gRPC/grpc-interceptor";
// import { InterceptorRegistry } from "./interceptor-registry";

// export function ensureGrpcInterceptorRegistered() {
//   if (!InterceptorRegistry.hasInterceptor("grpc")) {
//     const instance = new GrpcRetryLoggingInterceptor();
//     InterceptorRegistry.registerInterceptor("grpc", instance);
//     console.warn("[Interceptor] Auto-registered gRPC interceptor (fallback)");
//   }
// }

// // run immediately on import
// ensureGrpcInterceptorRegistered();
