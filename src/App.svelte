<script lang="ts">
    import { authorize, discordSdk } from "./lib/discord";

    let logs = [{ type: "Init", content: "Begin logs" }];

    async function main() {
        const auth = await authorize();
        logs = [...logs, { type: "Auth", content: JSON.stringify(auth.user, null, 4) }];

        const activity = await discordSdk.commands.setActivity({
            activity: {
                type: 3,
                details: "garf",
                state: "garfing rn",
                timestamps: {
                    start: Date.now(),
                },
                party: {
                    size: [4, 5],
                },
                assets: {
                    large_image: "embedded_cover",
                    large_text: "garf",
                    small_image: "embedded_cover",
                    small_text: "garf",
                },
            },
        });

        logs = [...logs, { type: "Activity", content: JSON.stringify(activity, null, 4) }];
    }

    main();
</script>

<main>
    <p>garf 2: eletric boogaloo</p>
    {#each logs as log}
        <p><strong>{log.type}</strong></p>
        <tt>{log.content}</tt>
        <br />
    {/each}
</main>
