<script lang="ts">
    import { authorize, discordSdk } from "./lib/discord";

    let logs = [{ type: "Init", content: "Begin logs" }];

    async function main() {
        const auth = await authorize().catch((e) => e);
        if (!auth) return logs.push({ type: "Auth", content: `Failure | ${JSON.stringify(auth)}` });
        logs.push({ type: "Auth", content: JSON.stringify(auth) });

        const response = await discordSdk.commands.setActivity({
            activity: {
                type: 3,
                details: "garf",
                state: "Garf",
                timestamps: {
                    start: Date.now(),
                },
            },
        });

        logs.push({ type: "Activity", content: JSON.stringify(response) });
    }

    main();
</script>

<main>
    <p>garf 2: eletric boogaloo</p>
    {#each logs as log}
        <h1>{log.type}</h1>
        <tt>{log.content}</tt>
        <br />
    {/each}
</main>
