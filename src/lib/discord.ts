import { DiscordSDK } from "@discord/embedded-app-sdk";
export const discordSdk = new DiscordSDK(import.meta.env.VITE_DISCORD_CLIENT_ID);

export const ACTIVITY_STARTED = Date.now();

export async function authorize() {
    await discordSdk.ready();

    const { code } = await discordSdk.commands.authorize({
        client_id: import.meta.env.VITE_DISCORD_CLIENT_ID,
        response_type: "code",
        state: "",
        prompt: "none",
        scope: ["identify", "guilds", "rpc.activities.write", "guilds.members.read"],
    });

    const response = await fetch("/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
    });

    const { access_token } = await response.json();
    const auth = await discordSdk.commands.authenticate({ access_token });

    return auth;
}
