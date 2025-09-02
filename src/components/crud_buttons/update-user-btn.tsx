"use client"

import { Button } from "../ui/button";
import { Pencil } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react";
import { useRouter } from "next/navigation";
import UserForm from "../forms/user-form";
import { User } from "@/db/schema";

interface UpdateUserBtnProps {
    user: User;
}

export default function UpdateUserBtn({ user }: UpdateUserBtnProps) {
    const [isOpen, setIsOpen] = useState(false)

    const handleSuccess = () => {
        setIsOpen(false)
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" className="cursor-pointer">
                    <Pencil className="size-4" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update User</DialogTitle>
                    <DialogDescription>
                        Update the user details.
                    </DialogDescription>
                    <UserForm user={user} onSuccess={handleSuccess} />
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}