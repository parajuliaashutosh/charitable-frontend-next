import { GrpcWebFetchTransport } from "@protobuf-ts/grpcweb-transport";
import { grpcLoggerInterceptor } from "../grpc-logger";
import { AuthServiceClient } from "../stubs/exposed-auth.client";
import { DonationServiceClient } from "../stubs/exposed-donation.client";

const endpoint = process.env.NEXT_PUBLIC_GRPC_ENVOY_ENDPOINT!;


const fetchTransport = new GrpcWebFetchTransport({
	baseUrl: endpoint,
    interceptors: [grpcLoggerInterceptor]
});

const authServiceClient: AuthServiceClient = new AuthServiceClient(fetchTransport);
const donationServiceClient: DonationServiceClient = new DonationServiceClient(fetchTransport);


const serviceClients = {
    authServiceClient,
    donationServiceClient
}

export default serviceClients;