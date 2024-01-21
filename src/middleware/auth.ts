import { Response, Request, NextFunction } from "express";

import User from "../models/User.ts";
import { verifyToken } from "../utils/jwt/jwt.ts";
import ExeptionError, { HttpCode } from "../utils/errors/ExeptionError.ts";

export const authUser = async (req: Request, res: Response, next: NextFunction) => {
    let access_token;
    console.log(req.cookies);
    
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        access_token = req.headers.authorization.split('')[1];
    }else if(req.cookies.access_token){
        access_token = req.cookies.access_token;
    }

    if(!access_token){
        throw new ExeptionError({code: HttpCode.UNAUTHORIZED, message: "You are not logged in", logging: true});
    }

    const decoded = verifyToken<{ sub: string }>(access_token);
    if(!decoded){
        throw new ExeptionError({code: HttpCode.UNAUTHORIZED, message: "Invalid token or user doesn't exist", logging: true});
    }

    const user = await User.findById(decoded?.sub).select("-password"); 
    if(!user){
        throw new ExeptionError({code: HttpCode.UNAUTHORIZED, message: "Invalid token or session has expired", logging: true});
    }

    res.locals.user = user;

    next();
}

export const requireUser = async (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user;
    if(!user){
        throw new ExeptionError({code: HttpCode.UNAUTHORIZED, message: "Invalid token or user doesn't exist", logging: true});
    }

    next();
}