"use client"

import { Button } from "../ui/button";
import { UserPlus } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react";
import UserForm from "../forms/user-form";

export default function AddUserBtn() {
    const [isOpen, setIsOpen] = useState(false)

    const handleSuccess = () => {
        setIsOpen(false)
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="flex items-center gap-2 cursor-pointer">
                    Add User <UserPlus className="size-4" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add User</DialogTitle>
                    <DialogDescription>
                        Add a new user to the database.
                    </DialogDescription>
                    <UserForm onSuccess={handleSuccess} />
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
