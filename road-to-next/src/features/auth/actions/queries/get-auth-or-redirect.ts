import { getAuth } from "./get-auth";
import { signInPath } from "@/paths";
import { redirect } from "next/navigation";

export default async function getAuthOrRedirect() {
    const auth= await getAuth();
    if (!auth.user) {
        redirect(signInPath());
    }
    return auth;
}