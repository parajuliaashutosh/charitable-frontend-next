import { RpcInterceptor, RpcOptions, RpcOutputStream, RpcStatus } from "@protobuf-ts/runtime-rpc";
import { InterceptorRegistry } from "../../interceptor-registry";

// Protobuf-ts interceptors are objects, not classes
const grpcTsInterceptor: RpcInterceptor = {
    intercept<I, O>(
        inputStream: RpcOutputStream<I, O>,
        options: RpcOptions<I, O>
    ): RpcOutputStream<I, O> {
        console.log("Request to method:", options.method.name);

        // Create a new output stream that forwards the original
        const outputStream = inputStream;

        // Listen to responses
        outputStream.onNext((response: O) => {
            console.log("Received response:", response);
        });

        outputStream.onComplete((status: RpcStatus) => {
            console.log("RPC completed with status:", status.code, status.details);
        });

        return outputStream;
    }
};

// Register the interceptor (call static method on class)
InterceptorRegistry.registerInterceptor("grpc", grpcTsInterceptor);

console.log("gRPC-ts interceptor registered!");
