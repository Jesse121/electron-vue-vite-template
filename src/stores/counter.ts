import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", {
	state: () => ({ count: 0 }),
	getters: {},
	actions: {
		increment() {
			this.count++;
		}
	}
});
