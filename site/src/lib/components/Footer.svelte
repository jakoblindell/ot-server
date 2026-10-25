<script lang="ts">
	import { themes, THEME_COOKIE } from '$lib/themes';

	let { serverName, theme }: { serverName: string; theme: string } = $props();

	// Switches at once; the cookie keeps the choice for later visits (without
	// JavaScript the form reloads the page with ?theme=)
	function choose(event: Event) {
		const id = (event.currentTarget as HTMLSelectElement).value;
		document.documentElement.dataset.theme = id;
		document.cookie = `${THEME_COOKIE}=${id}; path=/; max-age=31536000; samesite=lax`;
	}
</script>

<footer>
	<div class="wrap row">
		<span>{serverName} · A fan-run server, not affiliated with CipSoft.</span>
		<form method="GET" class="themes">
			<label for="theme">Colours</label>
			<select id="theme" name="theme" value={theme} onchange={choose}>
				{#each themes as option (option.id)}
					<option value={option.id} title={option.description}>{option.name}</option>
				{/each}
			</select>
			<noscript><button type="submit">Use</button></noscript>
		</form>
	</div>
</footer>

<style>
	footer {
		border-top: 1px solid var(--border);
		background: var(--footer);
	}

	.row {
		padding-top: 24px;
		padding-bottom: 24px;
		display: flex;
		flex-wrap: wrap;
		gap: 12px 32px;
		justify-content: space-between;
		align-items: center;
		font-size: 15px;
		color: var(--text-muted);
	}

	.themes {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	select {
		min-height: 40px;
		background: var(--surface);
		color: var(--text);
		border: 1px solid var(--border-strong);
		border-radius: 4px;
		padding: 0 10px;
		font: inherit;
	}
</style>
