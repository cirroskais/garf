<script lang="ts">
    import { authorize, discordSdk } from "./lib/discord";

    let logs = [{ type: "Init", content: "Begin logs" }];

    async function main() {
        const auth = await authorize().catch((e) => e);
        if (!auth) return (logs = [...logs, { type: "Auth", content: `Failure | ${JSON.stringify(auth)}` }]);
        logs = [...logs, { type: "Auth", content: JSON.stringify(auth.user) }];

        const response = await discordSdk.commands.setActivity({
            activity: {
                type: 3,
                details: "garf",
                state: "garfing rn",
                timestamps: {
                    start: Date.now(),
                    end: 0,
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

        logs = [...logs, { type: "Activity", content: JSON.stringify(response) }];
    }

    main();
</script>

<main>
    <p>garf 2: eletric boogaloo</p>
    {#each logs as log}
        <h6>{log.type}</h6>
        <tt>{log.content}</tt>
        <br />
    {/each}
</main>
