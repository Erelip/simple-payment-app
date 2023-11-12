import type { IEnvironment } from "../types";

function required(key: string): string {
    if (typeof process.env[key] === "undefined") {
        throw new Error(`Environment variable ${key} is not set.`);
    }

    return process.env[key] as string;
}

class Environment {
    private static env: IEnvironment;

    static getVariables = (): IEnvironment => {
        if (this.env == null)
            this.env = {
                node: process.env.NODE_ENV || "development",
                isProduction: process.env.NODE_ENV === "production",
                isTest: process.env.NODE_ENV === "test",
                isDevelopment: process.env.NODE_ENV === "development",
                app: {
                    host: required("API_HOST"),
                    routePrefix: required("API_ROUTE_PREFIX"),
                },
                jwt: {
                    secret: required("JWT_SECRET"),
                    name: required("JWT_NAME"),
                },
            };
        return this.env;
    };
}

export default Environment.getVariables();