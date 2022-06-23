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

export interface Order {
    _id: string,
    createdAt: string,
    user: string,
    email: string,
    status: string,
    stripe_client_secret: string,
    total: number,
    basket: BasketItem[],
    address: Address,
    delivery: Delivery,
}