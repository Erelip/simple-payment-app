import { NextFunction, Request, Response } from "express";
import { BadRequestException, UnauthorizedException } from "@exceptions";
import { UserService } from "@services";
import { User } from "@prisma/client";
import { Bcrypt, Environment as env, Jwt } from "@providers";
import { UserPayload } from "@types";

class AuthController {
    connect = (user: User): Object & { access_token: string } => {
        const token = Jwt.sign(
            <UserPayload>{
                sub: user.id,
                id: user.id,
                email: user.email,
            },
            { expiresIn: "1d" }
        );
        const { password, ...data } = user;
        return { ...data, access_token: token };
    };

    signUp = async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body;
        try {

            const user = await UserService.create(
                email,
                await Bcrypt.hash(password),
            );

            const data = this.connect(user);

            res.cookie(env.jwt.name, data.access_token, {
                httpOnly: true,
                secure: env.isProduction,
                maxAge: 1000 * 60 * 60 * 24,
            });

            return res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    };

    signIn = async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body;
        try {

            const user = await UserService.getUserByEmail(email);
            if (
                user == null ||
                !(await Bcrypt.compare(req.body.password, user.password!))
            )
                throw new UnauthorizedException("Incorrect credentials");

            const data = this.connect(user);

            res.cookie(env.jwt.name, data.access_token, {
                httpOnly: true,
                secure: env.isProduction,
                maxAge: 1000 * 60 * 60 * 24,
            });

            return res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    };

    get = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await UserService.getUser();
            return res.status(200).json(user);
        } catch (err) {
            next(err);
        }
    };

    getById = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        try {
            const user = await UserService.getUserById(parseInt(id));
            return res.status(200).json(user);
        } catch (err) {
            next(err);
        }
    };
}

export default new AuthController();
