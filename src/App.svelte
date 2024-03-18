<script lang="ts">
    import { authorize } from "./lib/discord.js";
    import UserCardShort from "./lib/components/UserCardShort.svelte";
    import UserCardShortScaffold from "./lib/components/scaffolds/UserCardShortScaffold.svelte";
    import { user } from "./lib/stores.js";

    async function main() {
        if (import.meta.env.DEV) return;
        const auth = await authorize();
        user.set(auth.user);
    }

    if (import.meta.env.DEV) {
        user.set({
            id: "223004006299992064",
            username: "cirroskais",
            discriminator: "",
            public_flags: 0,
        });
    }

    main();
</script>

{#if $user}
    <UserCardShort user={$user} />
{:else}
    <UserCardShortScaffold />
{/if}
