"use client";

import {useEffect} from "react";
import {toast} from "sonner";
import {consumeCookieByKey,deleteCookieByKey} from "@/actions/cookies";

const RedirectToast = () => {

    useEffect(()=>{

        const showCookieToast = async () => {
            const message = await consumeCookieByKey("toast");
            if (message) {
                toast.success(message);
                await deleteCookieByKey("toast");
            }
        }
        showCookieToast();
    },[]);

    return null;
};

export {RedirectToast};