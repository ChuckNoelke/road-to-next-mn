

import {Suspense} from "react";
import {ErrorBoundary} from "react-error-boundary";
import {Heading} from "@/components/heading";
import {Placeholder} from "@/components/placeholder";
import {Spinner} from "@/components/spinner";
import {TicketList} from "@/features/ticket/components/ticket-list";


export const dynamic= "force-dynamic";

const TicketsPage = () => {




    return (
        <div className="flex-1 flex flex-col gap-y-8">

            <Heading title="Tickets" description={"All your tickets at one place"}/>
            <ErrorBoundary fallback={<Placeholder label="this is an error" /> }>
                <Suspense fallback={<Spinner/>}>
                <TicketList />
                </Suspense>
            </ErrorBoundary>
        </div>
    );
};

export default TicketsPage;