"use client";

import { useActionState } from "react";
import { FieldError } from "@/components/form/field-error";
import { Form } from "@/components/form/form";
import { SubmitButton } from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Input } from "@/components/ui/input";
import { signUp } from "../actions/sign-up";
import { passwordChange } from "../actions/password-update";

const PasswordChangeForm = () => {
    const [actionState, action] = useActionState(passwordChange, EMPTY_ACTION_STATE);

    return (
        <Form action={action} actionState={actionState}>
            

            <Input type="password" name="oldPassword" placeholder="Old Password" defaultValue={(actionState.payload?.get("oldPassword") as string)}/>
            <FieldError actionState={actionState} name="oldPassword" />

            <Input type="password" name="newPassword" placeholder="New Password" defaultValue={(actionState.payload?.get("newPassword") as string)}/>
            <FieldError actionState={actionState} name="newPassword" />

            <Input
                type="password"
                name="confirmNewPassword"
                placeholder="Confirm New Password"
            />
            <FieldError actionState={actionState} name="confirmNewPassword" />

            <SubmitButton label="Change Password" />
        </Form>
    );
};

export { PasswordChangeForm };