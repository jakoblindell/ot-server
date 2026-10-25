import type { SessionAccount } from '$lib/server/sessions';

declare global {
	namespace App {
		interface Locals {
			account: SessionAccount | null;
			theme: string;
		}
	}
}

export {};
