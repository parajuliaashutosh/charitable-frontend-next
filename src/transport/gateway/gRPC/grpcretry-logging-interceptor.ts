// /* eslint-disable @typescript-eslint/no-explicit-any */

// import { GrpcInterceptor, GrpcNext, GrpcRequest } from "../../types";

// export class GrpcRetryLoggingInterceptor implements GrpcInterceptor {
//   async intercept(request: GrpcRequest, next: GrpcNext) {
//     const start = Date.now();

//     // Log request (clean payload only)
//     console.log("[gRPC Request]", {
//       service: request.service?.constructor?.name,
//       method: request.method,
//       data: request.requestData,
//     });

//     try {
//       const response = await next(request);

//       const duration = Date.now() - start;

//       // Log response (clean data only)
//       console.log("[gRPC Response]", {
//         method: request.method,
//         duration: `${duration}ms`,
//         data: response?.response, // only show actual payload
//       });

//       // ✅ Return only the response payload, not full envelope
//       return response?.response;
//     } catch (error: any) {
//       console.error("[gRPC Error]", {
//         method: request?.method,
//         message: error?.message,
//         code: error?.code,
//       });
//       throw error;
//     }
//   }
// }
