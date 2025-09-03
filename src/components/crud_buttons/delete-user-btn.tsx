"use client"

import { Button } from "../ui/button";
import { Loader2, Trash2 } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { deleteUser } from "@/server/users";
import { useState } from "react";
import { toast } from "sonner";

interface DeleteUserBtnProps {
    userId: string;
}

export default function DeleteUserBtn({ userId }: DeleteUserBtnProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const handleDelete = async () => {
        try {
            setIsLoading(true)
            await deleteUser(userId)
            toast.success("User deleted successfully")
            setIsOpen(false)
        } catch (error) {
            console.error(error)
            toast.error("Failed to delete user")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" className="cursor-pointer">
                    <Trash2 className="size-4" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </DialogDescription>
                    <Button disabled={isLoading} variant="destructive" onClick={() => {
                        handleDelete()
                    }} className="w-1/2 mx-auto cursor-pointer">
                        {isLoading ? <Loader2 className="size-4 animate-spin" /> : "Delete"}
                    </Button>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
