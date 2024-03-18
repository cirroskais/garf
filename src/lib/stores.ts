import { writable, type Writable } from "svelte/store";

interface AuthenticatedUser {
    username: string;
    discriminator: string;
    id: string;
    public_flags: number;
    avatar?: string | null | undefined;
    global_name?: string | null | undefined;
}

export const user: Writable<AuthenticatedUser> = writable();
