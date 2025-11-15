import { InterceptorRegistry } from "@/transport/interceptor-registry";
import serviceClients from "../../client/client-registry";
import { CustomGrpcInterceptor } from "../../grpc-interceptor";
import { CommonResponse } from "../../stubs/exposed-common";
import { ClaimDonationRequest, GetDonationRequest, GetDonationResponse, GotDonationRequest, UserDonationRequest } from "../../stubs/exposed-donation";

const grpcInterceptor = InterceptorRegistry.getInstance().getInterceptor('grpc') as CustomGrpcInterceptor;

const donate = (request: UserDonationRequest, retryTimes: number): Promise<CommonResponse> => {
    return grpcInterceptor.intercept({
        client: serviceClients.donationServiceClient,
        method: (client) => client.donate.bind(client),
        args: request,
        retries: retryTimes,
    })
};

const getMyDonations = (request: GetDonationRequest, retryTimes: number = 2): Promise<GetDonationResponse> => {
    return grpcInterceptor.intercept({
        client: serviceClients.donationServiceClient,
        method: (client) => client.getMyDonations.bind(client),
        args: request,
        retries: retryTimes
    })
}

const getDonations = (request: GetDonationRequest, retryTimes: number = 2) : Promise<GetDonationResponse> => {
    return grpcInterceptor.intercept({
        client: serviceClients.donationServiceClient,
        method: (client) => client.getDonations.bind(client),
        args: request,
        retries: retryTimes
    })
}

const claimDonation = (request: ClaimDonationRequest, retryTimes: number = 2): Promise<CommonResponse> => {
    return grpcInterceptor.intercept({
        client: serviceClients.donationServiceClient,
        method: (client) => client.claimDonation.bind(client),
        args: request,
        retries: retryTimes
    })
}

const gotDonation = (request: GotDonationRequest, retryTimes: number = 2): Promise<CommonResponse> => {
    return grpcInterceptor.intercept({
        client: serviceClients.donationServiceClient,
        method: (client) => client.gotDonation.bind(client),
        args: request,
        retries: retryTimes
    })
}

export const donationServiceClient = {
    donate,
    getDonations,
    getMyDonations,
    claimDonation,
    gotDonation
}