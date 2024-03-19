import { DiscordSDK } from "@discord/embedded-app-sdk";
import type { Configuration } from "./api";
import { identity as identityStore, user } from "./stores";

export const ACTIVITY_STARTED = Date.now();
export let discordSdk: DiscordSDK | null = null;

export async function authorize(config: Configuration) {
    discordSdk = new DiscordSDK(config.DISCORD_CLIENT_ID);

    await discordSdk.ready();

    const { code } = await discordSdk.commands.authorize({
        client_id: config.DISCORD_CLIENT_ID,
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

    const { access_token, identity } = await response.json();
    const auth = await discordSdk.commands.authenticate({ access_token });

    user.set(auth.user);
    identityStore.set(identity);

    return auth;
}
