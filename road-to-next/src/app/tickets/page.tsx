

import {Suspense} from "react";
import {ErrorBoundary} from "react-error-boundary";
import {CardCompact} from "@/components/card-compact";
import {Heading} from "@/components/heading";
import {Placeholder} from "@/components/placeholder";
import {Spinner} from "@/components/spinner";
import {TicketList} from "@/features/ticket/components/ticket-list";
import {TicketUpsertForm} from "@/features/ticket/components/ticket-upsert-form";
import getAuthOrRedirect from "@/features/auth/actions/queries/get-auth-or-redirect";





const TicketsPage = async () => {

    const {user}= await getAuthOrRedirect();

    return (

            <div className="flex-1 flex flex-col gap-y-8">

                <Heading title="Tickets" description={"All your tickets at one place"}/>

                <CardCompact title="Create Ticket" description="A new ticket will be created" content={<TicketUpsertForm />} className="w-full max-w-[420px] self-center"/>



                <ErrorBoundary fallback={<Placeholder label="this is an error" /> }>
                    <Suspense fallback={<Spinner/>}>
                    <TicketList userId={user?.id}/>
                    </Suspense>
                </ErrorBoundary>
            </div>


    );
};

export default TicketsPage;