import { identity } from "./stores";
import { get } from "svelte/store";

export interface Configuration {
    DISCORD_CLIENT_ID: string;
}

export async function fetchConfiguration() {
    const response = await fetch("/api");
    const body: Promise<Configuration> = await response.json();

    return body;
}

export async function connect() {
    const searchParams = new URLSearchParams();
    searchParams.set("id", get(identity).id);
    searchParams.set("iv", get(identity).iv);

    const socket = new WebSocket("/api/ws?" + searchParams.toString());
    socket.onmessage = (event) => {
        console.log(event);
    };
}
