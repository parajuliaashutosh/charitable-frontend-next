import serviceClients from "../../client/client-registry";
import { grpcInterceptor } from "../../grpc-interceptor-wrapper";
import { LoginRequest, LoginResponse } from "../../stubs/exposed-auth";

const login = (request: LoginRequest, retryTimes: number): Promise<LoginResponse> => {
	return grpcInterceptor.intercept({
		client: serviceClients.authServiceClient,
		method: (client) => client.login,
		args: request,
		retries: retryTimes,
	});
};

const authServiceRequests = {
  login,
};

export default authServiceRequests;


