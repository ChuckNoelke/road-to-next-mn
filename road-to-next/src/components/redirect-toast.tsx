"use client";

import {usePathname} from "next/navigation";
import {useEffect} from "react";
import {toast} from "sonner";
import {consumeCookieByKey,deleteCookieByKey} from "@/actions/cookies";

const RedirectToast = () => {
    const pathname = usePathname();
    useEffect(()=>{

        const showCookieToast = async () => {
            const message = await consumeCookieByKey("toast");
            if (message) {
                toast.success(message);
                await deleteCookieByKey("toast");
            }
        }
        showCookieToast();
    },[pathname]);

    return null;
};

export {RedirectToast};