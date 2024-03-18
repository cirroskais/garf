<script lang="ts">
    import { authorize, discordSdk } from "./lib/discord";

    let output = "";

    async function main() {
        const auth = await authorize().catch((e) => e);
        output = output + `auth: ${JSON.stringify(auth)}\n`;
        if (!auth) return (output += `failed to authenticate :'c`);

        const activity = await discordSdk.commands.setActivity({
            activity: {
                type: 0,
                details: "garf",
                state: "Playing",
            },
        });

        output = output + `activity: ${JSON.stringify(activity)}\n`;
    }

    main();
</script>

<main>
    <p>garf 2: eletric boogaloo</p>
    {#key output}
        <tt>{output}</tt>
    {/key}
</main>
