import { getUsers } from "@/server/users";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import { Pencil, Trash2 } from "lucide-react";
import UpdateUserBtn from "./crud_buttons/update-user-btn";
import DeleteUserBtn from "./crud_buttons/delete-user-btn";



export default async function UsersTable() {
    const users = await getUsers();
    return (<Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead className="w-[100px]">Email</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead className="text-right">Actions</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {users.map((user) => (
                <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.email}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.createdAt?.toLocaleString()}</TableCell>
                    <TableCell className="text-right flex justify-end">
                        <UpdateUserBtn user={user} />
                        <DeleteUserBtn userId={user.id} />
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>)
}