import { InterceptorRegistry } from "@/transport/interceptor-registry";
import serviceClients from "../../client/client-registry";
import { CustomGrpcInterceptor } from "../../grpc-interceptor";
import { LoginRequest, LoginResponse, RegisterOrganizationRequest, RegisterUserRequest } from "../../stubs/exposed-auth";
import { CommonResponse } from "../../stubs/exposed-common";

const grpcInterceptor = InterceptorRegistry.getInstance().getInterceptor('grpc') as CustomGrpcInterceptor;

const login = (request: LoginRequest, retryTimes: number): Promise<LoginResponse> => {
	return grpcInterceptor.intercept({
		client: serviceClients.authServiceClient,
		method: (client) => client.login.bind(client),
		args: request,
		retries: retryTimes,
	});
};

const registerUser = (request: RegisterUserRequest, retryTimes: number): Promise<CommonResponse> => {
	return grpcInterceptor.intercept({
		client: serviceClients.authServiceClient,
		method: (client) => client.registerUser.bind(client),
		args: request,
		retries: retryTimes,
	});
};

const registerOrganization = (request: RegisterOrganizationRequest, retryTimes: number): Promise<CommonResponse> => {
	return grpcInterceptor.intercept({
		client: serviceClients.authServiceClient,
		method: (client) => client.registerOrganization.bind(client),
		args: request,
		retries: retryTimes,
	});
};

const authServiceRequests = {
  login,
  registerUser,
  registerOrganization,
};

export default authServiceRequests;


