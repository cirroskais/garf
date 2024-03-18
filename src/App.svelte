<script lang="ts">
    import { authorize, setActivity } from "./lib/discord";

    let output = "";

    async function main() {
        const result = await authorize();

        output += `result: ${JSON.stringify(result)}\n`;
    }

    main();
</script>

<main>
    <p>garf 2: eletric boogaloo</p>
    <tt>{JSON.stringify(output, null, 4)}</tt>
</main>
