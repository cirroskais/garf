import { writable } from "svelte/store";

export const user = writable({});

export const logs = writable([{ type: "Init", content: "Begin logs" }]);
