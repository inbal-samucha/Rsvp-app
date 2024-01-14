import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/errors/CustomError.ts";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log('error handler ', err);
    if(err instanceof CustomError){
        const { statusCode, errors, logging} = err;
        if(logging){
            console.log(JSON.stringify({
                code: err.statusCode,
                errors: err.errors,
                stack: err.stack,
            }, null, 2));
        }

        return res.status(statusCode).send({ code: err.statusCode, errors });
    }
   
    console.error(JSON.stringify(err, null, 2));
    return res.status(500).send({ errors: [{ message: "Something went wrong" }] });
}