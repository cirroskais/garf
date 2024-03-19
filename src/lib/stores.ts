import { writable, type Writable } from "svelte/store";

interface AuthenticatedUser {
    username: string;
    discriminator: string;
    id: string;
    public_flags: number;
    avatar?: string | null | undefined;
    global_name?: string | null | undefined;
}

interface Identity {
    id: string;
    iv: string;
}

export const user: Writable<AuthenticatedUser> = writable();
export const identity: Writable<Identity> = writable();
