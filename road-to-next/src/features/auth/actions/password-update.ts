"use server";

import { hash } from "@node-rs/argon2";
import { Prisma } from "@prisma/client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import {
    ActionState,
    fromErrorToActionState,
    toActionState,
} from "@/components/form/utils/to-action-state";
import { prisma } from "@/lib/prisma";
import { accountProfilePath } from "@/paths";
import { getAuth } from "./queries/get-auth";
import {verify} from "@node-rs/argon2";
import { setCookieByKey } from "@/actions/cookies";

const signUpSchema = z
    .object({
        oldPassword: z.string().min(6).max(191),
        newPassword: z.string().min(6).max(191),
        confirmNewPassword: z.string().min(6).max(191),
    })
    .superRefine(({ oldPassword,newPassword, confirmNewPassword }, ctx) => {
        if (newPassword !== confirmNewPassword) {
            ctx.addIssue({
                code: "custom",
                message: "New Passwords do not match",
                path: ["confirmNewPassword"],
            });
        }
        if (oldPassword === newPassword) {
            ctx.addIssue({
                code: "custom",
                message: "New password cannot be the same as old password",
                });
        }
    });

export const passwordChange = async (_actionState: ActionState, formData: FormData) => {
    try {
        const { oldPassword, newPassword } = signUpSchema.parse(
            Object.fromEntries(formData)
        );

        const {user} = await getAuth();
        if (!user) {
            return toActionState("ERROR", "User not authenticated", formData);
        }

        const db_user=await prisma.user.findUnique(
            {where:{ id: user.id }}
        );
        if (!db_user) {
            return toActionState("ERROR", "User not found", formData);
        }
        const validPassword = await verify(db_user.passwordHash,oldPassword);

        if (!validPassword){
            return toActionState('ERROR','Incorrect password',formData);

        }

        const newPasswordHash = await hash(newPassword);
        await prisma.user.update({
            where: { id: user.id },
            data: { passwordHash: newPasswordHash },
        });

        await setCookieByKey("toast","Password updated successfully");
        
        
    } catch (error) {
        if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === "P2002"
        ) {
            return toActionState(
                "ERROR",
                "Could not update password, please try again",
                formData
            );
        }

        return fromErrorToActionState(error, formData);
    }

    redirect(accountProfilePath ());


};