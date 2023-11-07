declare module "express-serve-static-core" {
    interface Request {
        user: UserPayload;
    }
}

interface UserPayload {
    id: number;
    email: string;
}

export interface IEnvironment {
    node: string;
    isProduction: boolean;
    isTest: boolean;
    isDevelopment: boolean;
    app: {
        host: string;
        routePrefix: string;
    };
    jwt: {
        secret: string;
        name: string;
    };
    paypal: {
        clientId: string;
        clientSecret: string;
        sandbox_account: string;
        access_token: string;
    };

}

export interface ValidationSchema {
    [key: string]: ValidationChain | ValidationChain[];
}
