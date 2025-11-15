/* eslint-disable @typescript-eslint/no-explicit-any */
import { RpcInterceptor, UnaryCall } from "@protobuf-ts/runtime-rpc";

export const grpcLoggerInterceptor: RpcInterceptor = {
  interceptUnary(next, method, input, options = {}) {
    // if (!browser || import.meta.env.PROD) {
    //   // Skip logging in production or non-browser
    //   return next(method, input, options);
    // }

    console.log(`[gRPC DEV LOGGER] Request: ${method.service.typeName}/${method.name}`, input);

    const call: UnaryCall<any, any> = next(method, input, options);

    call.response
      .then(res => {
        console.log(`[gRPC DEV LOGGER] Response: ${method.service.typeName}/${method.name}`, res);
      })
      .catch(err => {
        console.error(`[gRPC DEV LOGGER] Error: ${method.service.typeName}/${method.name}`, err);
      });

    return call;
  }
};
