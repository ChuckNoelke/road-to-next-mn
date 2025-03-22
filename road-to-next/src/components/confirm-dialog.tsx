
import {cloneElement, useState} from "react";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

type UseConfirmDialogProps={
    title?: string,
    description?: string,
    action: () => Promise<void>,
        trigger: React.ReactElement,
}

const useConfirmDialog = ({title="Are you absolutely sure?",description ="This action cannot be undone.", action,trigger}: UseConfirmDialogProps) => {

    const [isOpen, setIsOpen]= useState(false);

    const dialogTrigger = cloneElement(trigger, {
        onClick: () => setIsOpen((state) => !state),
    } as React.DOMAttributes<HTMLElement>);



    const dialog =(<AlertDialog open={isOpen} onOpenChange={setIsOpen}>

        <AlertDialogContent >
            <AlertDialogHeader>
                <AlertDialogTitle>{title}</AlertDialogTitle>
                <AlertDialogDescription>
                    {description}
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction asChild>
                    <form action={action}>
                        <Button type="submit">Confirm</Button>
                    </form>
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>);

    return (
        [dialogTrigger,dialog]
    );
}


export {useConfirmDialog};