<script lang="ts">
    import { authorize, setActivity } from "./lib/discord";

    let output = "";

    async function main() {
        const auth = await authorize();
        output += `auth: ${JSON.stringify(auth)}\n`;
        if (!auth) return (output += `failed to authenticate :'c`);

        const activity = await setActivity();
        output += `activity: ${JSON.stringify(activity)}\n`;
    }

    main();
</script>

<main>
    <p>garf 2: eletric boogaloo</p>
    <tt>{output}</tt>
</main>
