<script lang="ts">
    import { authorize } from "./lib/discord.js";
    import { fetchConfiguration } from "./lib/api";
    import { user } from "./lib/stores.js";

    import UserCardShort from "./lib/components/UserCardShort.svelte";
    import UserCardShortScaffold from "./lib/components/scaffolds/UserCardShortScaffold.svelte";

    if (import.meta.env.DEV) {
        user.set({
            id: "223004006299992064",
            username: "cirroskais",
            discriminator: "",
            public_flags: 0,
        });
    }

    fetchConfiguration().then((config) => authorize(config));
</script>

{#if $user}
    <UserCardShort user={$user} />
{:else}
    <UserCardShortScaffold />
{/if}
