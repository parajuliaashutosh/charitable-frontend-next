import { GrpcWebFetchTransport } from "@protobuf-ts/grpcweb-transport";
import { AuthServiceClient } from "../stubs/exposed-auth.client";

const endpoint = process.env.NEXT_PUBLIC_GRPC_ENDPOINT!;

const fetchTransport = new GrpcWebFetchTransport({
	baseUrl: endpoint,
});

const authServiceClient: AuthServiceClient = new AuthServiceClient(fetchTransport);

const serviceClient = {
    authServiceClient
}

export default serviceClient;