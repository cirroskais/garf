const CLIENT_ID = "869016244613951539";
import { DiscordSDK, Events, type Types } from "@discord/embedded-app-sdk";
export const discordSdk = new DiscordSDK(CLIENT_ID);
import { participants as partz } from "./stores";

export const ACTIVITY_STARTED = Date.now();

export async function authorize() {
    await discordSdk.ready();

    const { code } = await discordSdk.commands.authorize({
        client_id: CLIENT_ID,
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

discordSdk.subscribe(Events.ACTIVITY_INSTANCE_PARTICIPANTS_UPDATE, (data) => {
    partz.set(data);

    discordSdk.commands.setActivity({
        activity: {
            type: 3,
            details: "garf",
            state: "garfmaxxing",
            assets: {
                large_image: "embedded_cover",
                large_text: "garf",
            },
            party: {
                size: [data.participants.length, 5],
            },
        },
    });
});
