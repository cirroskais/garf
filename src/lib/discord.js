const CLIENT_ID = "869016244613951539";

import { DiscordSDK } from "@discord/embedded-app-sdk";
import { writable } from "svelte/store";
const discordSdk = new DiscordSDK(CLIENT_ID);

export let information = writable();

export async function authorize() {
    const { code } = await discordSdk.commands.authorize({
        client_id: CLIENT_ID,
        response_type: "code",
        state: "",
        prompt: "none",
        scope: ["identify", "rpc.activities.write"],
    });

    const response = await fetch("/api/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            code,
        }),
    });

    const { access_token } = await response.json();

    const auth = await discordSdk.commands.authenticate({ access_token });
    information.set(auth);

    return auth;
}

export async function setActivity() {
    return await discordSdk.commands.setActivity({
        activity: {
            type: 0,
            details: "garf",
            state: "Playing",
        },
    });
}
