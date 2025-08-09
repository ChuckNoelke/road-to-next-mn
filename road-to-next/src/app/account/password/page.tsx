import { CardCompact } from "@/components/card-compact";
import { Heading } from "@/components/heading";

import { AccountTabs } from "@/features/accounts/components/accountTabs";
import { PasswordChangeForm } from "@/features/auth/components/password-change-form";




const PasswordPage = () => {
    return (
        <div className="flex-1 flex flex-col gap-y-8 pl-4">
            <Heading title="Password" description="Keep your account secure" 
            tabs={
                <AccountTabs/>
            }
            />
            <CardCompact title="Create Ticket" description="A new ticket will be created" content={<PasswordChangeForm />} className="w-full max-w-[420px] self-center"/>
        </div>
    );
};

export default PasswordPage;