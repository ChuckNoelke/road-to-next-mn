"use server";

import {cookies} from "next/headers";

export const setCookieByKey = async (key: string, value: string)  => {
    const cookieStore= await cookies();
    cookieStore.set(key,value);
};


export const getCookieByKey = async (key:string): Promise<string|null> => {
    const cookieStore = await cookies();
    const cookie = cookieStore.get(key);

    if (!cookie) return null
    else return cookie.value;
}

export const deleteCookieByKey = async (key:string) => {
    const cookieStore = await cookies();
    cookieStore.delete(key);
}

export const consumeCookieByKey = async (key:string): Promise<string|null> => {
    const cookieStore = await cookies();
    const cookie = cookieStore.get(key);

    if (!cookie) return null;
    await deleteCookieByKey(key);
    return cookie.value;
}
