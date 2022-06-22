import { Request } from 'express';
import { UserDocument } from '../model/user'

export interface InjectUserToRequest extends Request {
    user: UserDocument // or any other type
}