import Link from "next/link";
import {Heading} from "@/components/heading";
import { Spinner } from "@/components/spinner";
import { TicketList } from "@/features/ticket/components/ticket-list";
import { Suspense } from "react";
import { searchParamsCache} from "@/features/ticket/search-params";
import {SearchParams} from "nuqs/server";


type HomePageProps ={
    searchParams: SearchParams;
}
const HomePage = async ({searchParams}:HomePageProps) => {
    return (
        <div className="flex-1 flex flex-col gap-y-8">
            <Heading title="All Tickets" description="All tickets at one place" />

            <Suspense fallback={<Spinner/>}>
                    <TicketList searchParams={await searchParamsCache.parse(searchParams)}/>
                    </Suspense>
        </div>
    );
};

export default HomePage;