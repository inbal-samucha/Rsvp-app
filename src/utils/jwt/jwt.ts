import jwt, { SignOptions } from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

export const signJwt = (payload: Object, options: SignOptions) => {

    const keyPath = path.join(path.resolve('./src/utils'), '/jwt/access_token_pr_key.pem');
    const privateKey = fs.readFileSync(keyPath, 'utf8');

    return jwt.sign(payload, privateKey, {...(options && options), algorithm: 'RS256' });
}

export const verifyToken = <T> (token: string) : T | null => {

    try{
        const keyPath = path.join(path.resolve('./src/utils'), '/jwt/access_token_pu_key.pem');
        const publicKey = fs.readFileSync(keyPath, 'utf8');

        const decoded = jwt.verify(token, publicKey) as T;

        return decoded;
    }catch(err){
        return null;
    }
}

