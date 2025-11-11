/* eslint-disable @typescript-eslint/no-explicit-any */

type Protocol = "grpc" | "rest";

export class InterceptorRegistry {
    
    private static instance: InterceptorRegistry;
    private static interceptors: Map<Protocol, any> = new Map();

    private constructor() {}

    public static getInstance(): InterceptorRegistry {
        if (this.instance == null) {
            this.instance = new InterceptorRegistry();
        }
        return this.instance;   
    }

    public static getInterceptor(protocol: Protocol): any {
        if (!this.interceptors.has(protocol)) {
            throw new Error(`No interceptor found for protocol: ${protocol}`);
        }
        return this.interceptors.get(protocol);
    }

    public static registerInterceptor(protocol: Protocol, interceptor: any) {
        this.interceptors.set(protocol, interceptor);
    }
}

export const interceptorRegistry = InterceptorRegistry.getInstance();


