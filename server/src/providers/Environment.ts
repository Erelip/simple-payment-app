import type { IEnvironment } from "@types";
import { config } from "dotenv";
import { join } from "path";

config({
    path: join(
        process.cwd(),
        `.env${process.env.NODE_ENV === "test" ? ".test" : ""}`
    ),
});

function required(key: string): string {
    if (typeof process.env[key] === "undefined") {
        throw new Error(`Environment variable ${key} is not set.`);
    }

    return process.env[key] as string;
}

function optional(key: string): string | undefined {
    return process.env[key];
}

function toNumber(value: string): number {
    return parseInt(value, 10);
}

function toBool(value: string): boolean {
    return value === "true";
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
