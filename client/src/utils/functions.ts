const randomID = ():string => Math.random().toString(36).substring(7);

export const generateid = (times = 2): string => {
    const id = Array.from({length: times}, () => randomID()).join("");

    return id
}

export const shortenString = (word: string, length?: number): string => `${word.substring(0, length ? length : 20)}...`;

export const firstCapital = (word: string): string => word.split(" ").map((w: string) => w.substring(0, 1).toUpperCase() + w.substring(1)).join(" ");