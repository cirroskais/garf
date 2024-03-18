const CLIENT_ID = "869016244613951539";

import { DiscordSDK } from "@discord/embedded-app-sdk";
export const discordSdk = new DiscordSDK(CLIENT_ID);

import { logs } from "./stores";

async function updateActivity() {
    const peers = await discordSdk.commands.getInstanceConnectedParticipants();
    logs.update((value) => {
        return [...value, { type: "Peers", content: JSON.stringify(peers) }];
    });
}

export async function authorize() {
    await discordSdk.ready();

    const { code } = await discordSdk.commands.authorize({
        client_id: CLIENT_ID,
        response_type: "code",
        state: "",
        prompt: "none",
        scope: ["identify", "guilds", "rpc.activities.write"],
    });

    const response = await fetch("/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
    });

    const { access_token } = await response.json();
    const auth = await discordSdk.commands.authenticate({ access_token });

    setInterval(updateActivity, 10 * 1000);

    return auth;
}

/**
 * @param {any} activity
 */
export async function setActivity(activity) {
    const result = await discordSdk.commands.setActivity({ activity });
    logs.update((value) => {
        return [...value, { type: "Activity", content: JSON.stringify(result) }];
    });

    return result;
}
