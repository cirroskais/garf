<script lang="ts">
    import { authorize, discordSdk } from "./lib/discord";

    let output = "";

    async function main() {
        const auth = await authorize().catch((e) => e);
        output = output + `auth: ${JSON.stringify(auth)}\n`;
        if (!auth) return (output += `failed to authenticate :'c`);

        const response = await discordSdk.commands.openExternalLink({
            url: "https://garf.madhouselabs.net",
        });

        output = output + `response: ${JSON.stringify(response)}\n`;
    }

    main();
</script>

<main>
    <p>garf 2: eletric boogaloo</p>
    {#key output}
        <tt>{output}</tt>
    {/key}
</main>
