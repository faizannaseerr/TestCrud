"use server";

import { db } from '../index';
import { eq } from 'drizzle-orm';
import { User, users } from '../db/schema';
import { revalidatePath } from 'next/cache';

export const getUsers = async () => {
    try {
        const allUsers = await db.select().from(users);
        return allUsers;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const createUser = async (user: Omit<User, "id" | "createdAt" | "updatedAt">) => {
    try {
        await db.insert(users).values(user);
        revalidatePath('/');
    } catch (error) {
        console.error(error);
        return { error: "Failed to create user" };
    }
};

export const updateUser = async (user: Omit<User, "createdAt" | "updatedAt">) => {
    try {
        await db.update(users).set(user).where(eq(users.id, user.id));
        revalidatePath('/');
    } catch (error) {
        console.error(error);
        return { error: "Failed to update user" };
    }
};

export const deleteUser = async (id: string) => {
    try {
        await db.delete(users).where(eq(users.id, id));
        revalidatePath('/');
    } catch (error) {
        console.error(error);
        return { error: "Failed to delete user" };
    }
};