<script>
    // @ts-nocheck
    export let user;
</script>

<div class="flex">
    {#if user.avatar}
        <img
            class="w-16 h-16 rounded-full"
            src={`https://cdn.discordapp.com/avatars/${user?.id}/${user?.avatar}.png?size=256`}
            alt=""
        />
    {:else}
        <img
            class="w-16 h-16 rounded-full"
            src={`https://cdn.discordapp.com/embed/avatars/${Math.abs(Number(user?.id) >> 22) % 6}.png`}
            alt=""
        />
    {/if}
    <p class="text-2xl font-bold my-auto ml-2">{user?.username}</p>
</div>
