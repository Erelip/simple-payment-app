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
}