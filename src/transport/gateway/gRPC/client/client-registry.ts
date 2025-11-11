import { ensureGrpcInterceptorRegistered } from "@/src/transport/setup-interceptor";
import { GrpcWebFetchTransport } from "@protobuf-ts/grpcweb-transport";
import { AuthServiceClient } from "../stubs/exposed-auth.client";

const endpoint = process.env.NEXT_PUBLIC_GRPC_ENDPOINT!;

ensureGrpcInterceptorRegistered();

const fetchTransport = new GrpcWebFetchTransport({
	baseUrl: endpoint,
    // interceptors: [InterceptorRegistry.getInterceptor("grpc") as RpcInterceptor]
});

const authServiceClient: AuthServiceClient = new AuthServiceClient(fetchTransport);

const serviceClients = {
    authServiceClient
}

export default serviceClients;