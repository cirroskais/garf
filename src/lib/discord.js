const CLIENT_ID = "869016244613951539";

import { DiscordSDK } from "@discord/embedded-app-sdk";
export const discordSdk = new DiscordSDK(CLIENT_ID);

export async function authorize() {
    await discordSdk.ready();

    const { code } = await discordSdk.commands.authorize({
        client_id: CLIENT_ID,
        response_type: "code",
        state: "",
        prompt: "none",
        scope: [
            // "applications.builds.upload",
            // "applications.builds.read",
            // "applications.store.update",
            // "applications.entitlements",
            // "bot",
            "identify",
            // "connections",
            // "email",
            // "gdm.join",
            "guilds",
            // "guilds.join",
            // "guilds.members.read",
            // "messages.read",
            // "relationships.read",
            "rpc.activities.write",
            // "rpc.notifications.read",
            // "rpc.voice.write",
            "rpc.voice.read",
            // "webhook.incoming",
        ],
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

    return auth;
}
