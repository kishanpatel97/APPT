import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export default function authenticate(req: Request, res: Response, next: NextFunction) {
    jwt.verify(
        req.cookies.usertoken,
        process.env.JWT_SECRET,

        (err, payload) => {
            if (err) {
                //not a valid token or cookie doesn't exist
                res.status(401).json({ verified: false });
            } else {
                next();
            }
        }
    );
}
