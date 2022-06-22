import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { emailSignup, emailLogin } from '../email';
import { asyncBlock, appError } from '../utils/helper';
import { InjectUserToRequest } from './@types';

import User from '../model/user';

const createSecureToken = (id: string) => {

    const secret: any = process.env.JWT_SECRET;

    const expires: any = process.env.JWT_EXPIRES;

    const token = jwt.sign({ id }, secret, { expiresIn: `${expires}d` });

    const expireInNumber = Date.now() + (expires * 24 * 60 * 60 * 1000);

    const cookie = {
        token: `Bearer ${token}`,
        expires: expireInNumber,
    };

    return cookie;
};

exports.protect = asyncBlock(async(req: InjectUserToRequest, res: Response, next: NextFunction) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }

    if(!token) return next(new appError('Login to access these features', 401));

    const jwt_secret:any = process.env.JWT_SECRET;

    const decodedId:any = jwt.verify(token, jwt_secret);

    const existingUser = await User.findById(decodedId.id).select(['role']);

    if(!existingUser) return next(new appError('The user belonging to this token does not exist.', 401));

    req.user = existingUser;

    next();
});

exports.restrictTo = (...roles: string[]) => {
    return (req: any, res: Response, next: NextFunction) => {
        if(!roles.includes(req.user.role)){
            return next(new appError('You do not have permission to perform this action', 403))
        }
        next();
    }
};

exports.persist = asyncBlock(async (req: InjectUserToRequest, res: Response, next: NextFunction) => {

    const id = req.user.id;

    const user = await User.findById(id);

    if(!user) return next(new appError('please log back in for a new token', 401));

    res.status(201).json({
        status: "success",
        user
    });
});

exports.login = asyncBlock(async(req: Request, res: Response, next: NextFunction) => {
    const email = req.params.email;

    let user = await User.findOne({email});

    if(user){
        const {code, hashToken} = user.createVerifyToken();

        const confirmURL = `confirm/${`${code}-${hashToken}`}`;
    
        await emailLogin({
            email: user.email,
            url: confirmURL,
            code
        });
    };

    if(!user) {
        user = await User.create({ email, verified: false });

        const {code, hashToken} = user.createVerifyToken();

        const confirmURL = `confirm/${code}-${hashToken}`;
    
        await emailSignup({
            email: user.email,
            url: confirmURL,
            code
        });
    };

    res.status(200).json({
        status: "success",
        message: 'sent'
    });
});

exports.confirmWithEmail = asyncBlock(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.params.token;

    const [code, confirmation] = token.split("-");

    let user = await User.findOne({confirmation}).select('+code');

    if(!user) return next(new appError("User does not exist, signup again.", 401));
    
    const linkExpired = Date.now() > user.link_expiration_time;

    if(linkExpired) return next(new appError("This confirmation code no longer exist", 401));

    const correctUser = !user || await user.correctPassword(code, user.code);

    if (!correctUser) return next(new appError("User does not exist, signup again.", 401));

    user = await User.findOneAndUpdate({confirmation}, {$unset: {code: 1, confirmation: 1, verified: 1, link_expiration_time: 1}}, {new: true});

    if(!user) return next(new appError("User does not exist, signup again.", 401));

    const cookie = createSecureToken(user._id);

    res.status(200).json({
        status: "success",
        user,
        cookie
    });
});

exports.confirmWithCode = asyncBlock(async (req: Request, res: Response, next: NextFunction) => {
    const {code, email} = req.body;

    let user = await User.findOne({email}).select('+code');

    if(!user) return next(new appError("User does not exist, signup again", 401));

    const linkExpired = Date.now() > user.link_expiration_time;

    if(linkExpired) return next(new appError("This confirmation code no longer exist", 401));

    const correctUser = !user || await user.correctPassword(code, user.code);

    if (!correctUser) return next(new appError("Invalid code", 401));

    user = await User.findOneAndUpdate({email}, {$unset: {code: 1, confirmation: 1, verified: 1, link_expiration_time: 1}}, {new: true});
    
    if(!user) return next(new appError("Invalid code", 401));

    const cookie = createSecureToken(user._id);

    res.status(200).json({
        status: "success",
        user,
        cookie
    });
});