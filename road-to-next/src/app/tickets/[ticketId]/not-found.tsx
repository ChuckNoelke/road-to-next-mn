
import Link from "next/link";
import { Placeholder } from "@/components/Placeholder";
import { Button } from "@/components/ui/button";
import { ticketsPath } from "@/paths";


export default function notFound () {
    return (
        <Placeholder
            label="We could not find your ticket"
            button={
                <Button asChild variant="outline">
                    <Link href={ticketsPath()}>Go to Tickets</Link>
                </Button>
            }
        />
    );


}