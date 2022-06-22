export interface Products{
    id: number,
    name: string,
    imageUrl: string,
    price: number,
    quantity: number,
    category: string
};

export const products: Products[] = [
    {
        id: 1,
        name: "toy mini",
        imageUrl: "https://bafkreigmva4gssu4tqn5jujdzgr66qtyap6q3ormu3rcmr3ucltwwnnbcq.ipfs.nftstorage.link",
        price: 15.80,
        quantity: 20,
        category: "toy, car",
    },
    {
        id: 2,
        name: "ceramic pot",
        imageUrl: "https://bafkreih3eju5xz5ti3wcsclr2tzhnk77lkwzyyczkbdu3uxfghljoutwr4.ipfs.nftstorage.link/",
        price: 49.99,
        quantity: 100,
        category: "pots, ceramic, white",
    },
    {
        id: 3,
        name: "vanilla candle",
        imageUrl: "https://bafkreifacf7z6eqvyfzkknhmuy3f7tziozps6z4jlq6ux6q6jfhsa32ozy.ipfs.nftstorage.link/",
        price: 10.99,
        quantity: 1000,
        category: "fragrance, candle, mood, calm",
    },
    {
        id: 4,
        name: "rock pots",
        imageUrl: "https://bafkreidnjpxe24nnkswc3ivoknithkfu7dv3vaan5wvcjpwdz6x4fwnnpq.ipfs.nftstorage.link/",
        price: 9.50,
        quantity: 100,
        category: "rocks, pots, bowls",
    },
    {
        id: 5,
        name: "ceramic vase",
        imageUrl: "https://bafkreibhyqbbl3kpqb2dct74kwgxhwbg7rrossdnnpzgvafnuqc5yig7ee.ipfs.nftstorage.link/",
        price: 20,
        quantity: 230,
        category: "ceramic, vase, house, decoration",
    },
    {
        id: 6,
        name: "orange paint",
        imageUrl: "https://bafkreibrurdci3kavt5tpdecqtlur4bvegwra6zxwz2kzllkvk4pitxx4e.ipfs.nftstorage.link/",
        price: 120.99,
        quantity: 50,
        category: "paint, art, artwork, orange, canvas",
    },
    {
        id: 7,
        name: "blue and red paint",
        imageUrl: "https://bafkreiasg3sfllory3wwqo5ep2vupmcdl6nzuujgjq4wpgetjtrvzm475u.ipfs.nftstorage.link/",
        price: 409.99,
        quantity: 20,
        category: "paint, art, blue, canvas",
    },
    {
        id: 8,
        name: "universe paint",
        imageUrl: "https://bafkreifh4phxsi3djx3uqlkxmffibr5jbqmfws6voy2zl7gsewmsyiyifu.ipfs.nftstorage.link/",
        price: 800,
        quantity: 5,
        category: "paint, art, dark, galaxy, canvas",
    }
]