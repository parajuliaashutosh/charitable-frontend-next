import { GrpcWebFetchTransport } from "@protobuf-ts/grpcweb-transport";
import { grpcLoggerInterceptor } from "../grpc-logger";
import { AuthServiceClient } from "../stubs/exposed-auth.client";

const endpoint = process.env.NEXT_PUBLIC_GRPC_ENDPOINT!;


const fetchTransport = new GrpcWebFetchTransport({
	baseUrl: endpoint,
    interceptors: [grpcLoggerInterceptor]
});

const authServiceClient: AuthServiceClient = new AuthServiceClient(fetchTransport);

const serviceClients = {
    authServiceClient
}

export default serviceClients;