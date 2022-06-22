import { Request, Response, NextFunction } from 'express';
import { asyncBlock, appError } from '../utils/helper';
import { products } from '../data/products';

exports.getProducts = asyncBlock(async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    res.status(200).json({
        status: "success",
        products
    })
});

exports.getProduct = asyncBlock(async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    const title = req.params.title;

    const product = products.find(el => el.name === title && el);

    res.status(200).json({
        status: "success",
        product
    });
});