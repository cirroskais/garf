<script lang="ts">
    import { authorize, setActivity } from "./lib/discord";

    authorize().then(async (auth) => {
        // we now have our authenticated context.
        await setActivity();
    });
</script>

<main>
    <p>yo</p>
</main>
