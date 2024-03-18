<script lang="ts">
    import { authorize, setActivity } from "./lib/discord";
    import { logs } from "./lib/stores";

    async function main() {
        const auth = await authorize();
        $logs = [...$logs, { type: "Auth", content: JSON.stringify(auth.user) }];
    }

    main();
</script>

<main>
    <p>garf 2: eletric boogaloo</p>
    {#each $logs as log}
        <p><strong>{log.type}</strong></p>
        <tt>{log.content}</tt>
        <br />
    {/each}
</main>
