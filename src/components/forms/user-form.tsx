"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { createUser, updateUser } from "@/server/users"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { User } from "@/db/schema"

interface UserFormProps {
    user?: User
    onSuccess?: () => void
}

const formSchema = z.object({
    username: z.string().min(2).max(50),
    email: z.email(),
})

export default function UserForm({ user, onSuccess }: UserFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: user?.username || "",
            email: user?.email || "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setIsLoading(true)
            const userData = {
                ...values,
                password: "password123"
            }
            if (user) {
                await updateUser({ ...userData, id: user.id })
            } else {
                await createUser(userData)
            }
            form.reset()
            toast.success(`User ${user ? "updated" : "created"} successfully`)
            onSuccess?.()
        } catch (error) {
            toast.error(`Failed to ${user ? "update" : "create"} user`)
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="Faizan Naseer" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="faizan.naseer@gmail.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? (<Loader2 className="size-4 animate-spin" />) : (user ? "Update User" : "Create User")}
                    </Button>
                </form>
            </Form>
        </div>
    )
}
