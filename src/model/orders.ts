import mongoose from 'mongoose';

export type Address = {
    email_address: string,
    first_name: string,
    last_name: string,
    first_address: string,
    second_address?: string | undefined,
    company?: string | undefined,
    city: string,
    postcode: string,
}

export type BasketItem = {
    id: string,
    category: string,
    imageUrl: string,
    name: string,
    price: number,
    quantity: number,
}

export type Delivery = {
    type: "standard" | "next day",
    cost: number
}

export interface OrdersInput {
    user: string,
    email: string,
    status: string,
    stripe_client_secret: string,
    total: number,
    basket: BasketItem[],
    address: Address,
    delivery: Delivery,
}

export interface UserDocument extends OrdersInput, mongoose.Document {
    createdAt: Date,
};

const ordersSchema = new mongoose.Schema({
    user: {
        type: String
    },
    email: {
        type: String,
    },
    status: {
        type: String,
        enum: ["succeeded", "payment_failed", "processing", "created", "requires_action", "refund"],
        default: "created"
    },
    basket: {
        type: Array
    },
    address: {
        email_address: String,
        first_name: String,
        last_name: String,
        first_address: String,
        second_address: String,
        company: String,
        city: String,
        postcode: String,
    },
    delivery:{
        type: {
            type: String,
            enum: ["standard", "next day"]
        },
        cost: Number,
    },
    total: {
        type: Number
    },
    stripe_client_secret: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
});

export default mongoose.model<OrdersInput>('Orders', ordersSchema);
