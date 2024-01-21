import { CookieOptions } from "express";


export const accessTokenExpiresIn: number = 60;

const cookiesOptions: CookieOptions = {
    httpOnly: true,
    sameSite: 'lax'
}

if (process.env.NODE_ENV === 'production') cookiesOptions.secure = true;

export const accessTokenCookieOptions: CookieOptions = {
    ...cookiesOptions,
    expires: new Date(Date.now() + accessTokenExpiresIn * 60 * 1000),
    maxAge: accessTokenExpiresIn * 60 * 1000
}

