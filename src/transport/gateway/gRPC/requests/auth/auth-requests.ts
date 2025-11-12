import { InterceptorRegistry } from "@/src/transport/interceptor-registry";
import serviceClients from "../../client/client-registry";
import { GrpcInterceptorWrapper } from "../../grpc-interceptor-wrapper";
import { LoginRequest, LoginResponse } from "../../stubs/exposed-auth";

const grpcInterceptor = InterceptorRegistry.getInstance().getInterceptor('grpc') as GrpcInterceptorWrapper;

const login = (request: LoginRequest, retryTimes: number): Promise<LoginResponse> => {
	return grpcInterceptor.intercept({
		client: serviceClients.authServiceClient,
		method: (client) => client.login.bind(client),
		args: request,
		retries: retryTimes,
	});
};

const authServiceRequests = {
  login,
};

export default authServiceRequests;


