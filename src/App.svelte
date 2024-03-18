<script lang="ts">
    import { authorize } from "./lib/discord.js";
    import { user } from "./lib/stores.js";

    async function main() {
        const auth = await authorize();
        user.set(auth.user);
    }

    main();
</script>

<main>
    {#if $user}
        {#if $user.avatar}
            <img src={`https://cdn.discordapp.com/avatars/${$user?.id}/${$user?.avatar}.png?size=256`} alt="" />
        {:else}
            <img src={`https://cdn.discordapp.com/embed/avatars/${Math.abs(Number($user?.id) >> 22) % 6}.png`} alt="" />
        {/if}
        <p>Hello, <strong>{$user?.username}</strong></p>
    {:else}
        <p>garf is finding you...</p>
    {/if}
</main>
