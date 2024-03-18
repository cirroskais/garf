export interface Configuration {
    DISCORD_CLIENT_ID: string;
}

export async function fetchConfiguration() {
    const response = await fetch("/api");
    const body: Promise<Configuration> = await response.json();

    return body;
}
