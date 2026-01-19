import { RpcOptions } from "@protobuf-ts/runtime-rpc";
import serviceClients from "../../client/client-registry";
import {
  LoginRequest,
  LoginResponse,
  MyInfoResponse,
  RefreshTokenRequest,
} from "../../stubs/exposed-auth";
import { EmptyRequest } from "../../stubs/exposed-common";


const endpoint = process.env.NEXT_PUBLIC_GRPC_ENVOY_ENDPOINT!;


const login = async (
  request: LoginRequest,
  retryTimes: number
): Promise<LoginResponse> => {
  const call = serviceClients.authServiceClient.login(request);
  return await call.response;
};

const myInfo = async (
  request: EmptyRequest,
  retryTimes: number,
  options?: RpcOptions
): Promise<MyInfoResponse> => {
  const call = serviceClients.authServiceClient.myInfo(request, options);
  return await call.response;
};

const refreshToken = async (
  request: RefreshTokenRequest,
  options?: RpcOptions
): Promise<LoginResponse> => {
  const call = serviceClients.authServiceClient.refreshToken(request, options);
  return await call.response;
};
const rawAuthServiceRequests = {
  login,
  myInfo,
  refreshToken
};

export default rawAuthServiceRequests;
