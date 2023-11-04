import { NextFunction, Request, Response } from "express";
import { BadRequestException, UnauthorizedException } from "@exceptions";

class DefaultController {
    default = async (req: Request, res: Response, next: NextFunction) => {
        try {
            return res.status(200).json('');
        } catch (err) {
            next(err);
        }
    };
}

export default new DefaultController();
