// Counts attempts per key (an address, an account name) in a sliding window,
// in memory. Used for failed logins; Caddy limits requests per address too.
export class RateLimit {
	private hits = new Map<string, number[]>();

	constructor(private limit: number, private windowMs: number) {}

	/** Whether the key has used up its attempts */
	blocked(key: string) {
		return this.recent(key).length >= this.limit;
	}

	hit(key: string) {
		const recent = this.recent(key);
		recent.push(Date.now());
		this.hits.set(key, recent);
		if (this.hits.size > 10000) this.prune();
	}

	reset(key: string) {
		this.hits.delete(key);
	}

	private recent(key: string) {
		const since = Date.now() - this.windowMs;
		return (this.hits.get(key) ?? []).filter((time) => time > since);
	}

	private prune() {
		for (const key of this.hits.keys()) {
			if (!this.recent(key).length) this.hits.delete(key);
		}
	}
}
