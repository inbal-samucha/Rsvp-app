import { Response, Request, NextFunction } from "express";

import ExeptionError, { HttpCode } from "../utils/errors/ExeptionError.ts";

import User from "../models/User.ts";
import { signJwt } from "../utils/jwt/jwt.ts";
import { accessTokenCookieOptions, accessTokenExpiresIn } from "../config/jwt.ts";

const loginForm = async(req: Request, res: Response, next: NextFunction) => {

    res.render('login');
}

const signup = async(req: Request, res: Response, next: NextFunction) => {

        const payload = {
            ...req.body,
            email: req.body.email.toLowerCase(),
        }

        const user = await User.create(payload);
        res.send(user);
}

const login = async(req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const user: any = await User.findOne({email}).exec();
    
    if(!user || !(await User.comparePasswords(password, user.password))){
        throw new ExeptionError({code: HttpCode.BAD_REQUEST, message: "Invalid email or password", logging: true});
    }

    const access_token = signJwt( {sub: user._id}, {expiresIn: `${accessTokenExpiresIn}m`});

    res.cookie('access_token', access_token, accessTokenCookieOptions);
    res.cookie('logged_in', true, {...accessTokenCookieOptions, httpOnly: false}); //to make the frontend aware if the user is logged in

    res.send({message: 'Login success'});
}


const logout = (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie('access_token');
    res.clearCookie('logged_in');

    res.send({message: "success logout"});
}

export { signup, login, logout, loginForm };