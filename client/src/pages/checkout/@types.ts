export type Stage = "basket" | "address" | "payment";

export type Partial<T> = {
    [P in keyof T]?: T[P];
};

export interface Address {
    email_address: string,
    first_name: string,
    last_name: string,
    first_address: string,
    second_address?: string,
    company?: string,
    city: string,
    postcode: string
};

export interface Delivery {
    type: "standard" | "next day",
    cost: number
};

export interface BasketItem {
    id: string,
    name: string,
    quantity: number,
    price: number,
    imageUrl: string,
    category: string,
}

export type Order = {
    stage: Stage
    | {basket: BasketItem[]}
    | {delivery: Delivery}
    | {address: Address}
    | {total: number}
    | {user: string}
}

export type OrderDetails = {
    stage: Stage,
    basket: BasketItem[],
    delivery: Delivery,
    address: Address,
    total: number,
    user: string,
}

export interface StripeOptions {
    clientSecret: string,
    amount: number
}