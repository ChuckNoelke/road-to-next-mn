import { Heading } from "@/components/heading";
import { AccountTabs } from "@/app/(authenticated)/account/_navigation/accountTabs";


const ProfilePage = () => {
    return (
        <div className="flex-1 flex flex-col gap-y-8 pl-4">
            <Heading title="Profile" description="All your profile information"
            tabs={
                <AccountTabs/>
            }
            
            />
        </div>
    );
};

export default ProfilePage;