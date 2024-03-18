<script lang="ts">
    import { authorize, setActivity } from "./lib/discord";

    let output = {};

    authorize().then(async (auth) => {
        // we now have our authenticated context.
        output = await setActivity();
    });
</script>

<main>
    <p>garf 2: eletric boogaloo</p>
    <tt>{JSON.stringify(output, null, 4)}</tt>
</main>
