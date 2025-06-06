import {cookies} from "next/headers";
import {lucia} from "@/lib/lucia";
import {cache} from "react";


export  const getAuth= cache(async ()=> {
    const myCookie= await cookies();
    const sessionId =myCookie.get(lucia.sessionCookieName)?.value ?? null;

    if (!sessionId){
        return{
            user: null,
            session: null,
        };
    }

    const result = await lucia.validateSession(sessionId);

    try {
        if (result.session && result.session.fresh) {
            const sessionCookie = lucia.createSessionCookie(result.session.id);
            (await cookies()).set(
                sessionCookie.name,
                sessionCookie.value,
                sessionCookie.attributes
            );
        }
        if (!result.session) {
            const sessionCookie = lucia.createBlankSessionCookie();
            (await cookies()).set(
                sessionCookie.name,
                sessionCookie.value,
                sessionCookie.attributes
            );
        }
    }
    catch{
        //do nothing
    }
    return result;
});