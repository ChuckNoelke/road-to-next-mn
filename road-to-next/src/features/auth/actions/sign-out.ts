"use server";

import {getAuth} from "@/features/auth/actions/queries/get-auth";
import {redirect} from "next/navigation";
import {signInPath} from "@/paths";
import {lucia} from "@/lib/lucia";
import {cookies} from "next/headers";

export const signOut=async ()=>{
    const {session}= await getAuth();
    if(!session){
        redirect(signInPath());
    }
    await lucia.invalidateSession(session.id);

    const sessionCookie= lucia.createBlankSessionCookie();
    const myCookie =await cookies();
    myCookie.set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
    );
    redirect(signInPath());

}