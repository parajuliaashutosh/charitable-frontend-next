import serviceClient from "../../client/client-registry";
import { LoginRequest, LoginResponse } from "../../stubs/exposed-auth";

const login = async (data: LoginRequest, retry: number): Promise<LoginResponse> => {
    return await serviceClient.authServiceClient.login(data)?.response;
};

const authServiceRequests = {
  login,
};

export default authServiceRequests;