<script lang="ts">
	import { onMount } from 'svelte';

	let { data } = $props();
	let lines = $state<string[] | null>([]);
	let follow = $state(true);
	let filter = $state('');
	let box: HTMLElement | undefined = $state();

	async function refresh() {
		const response = await fetch('/admin/log/lines');
		if (!response.ok) return;
		lines = (await response.json()).lines;
		if (follow && box) requestAnimationFrame(() => box && (box.scrollTop = box.scrollHeight));
	}

	onMount(() => {
		refresh();
		const timer = setInterval(refresh, 3000);
		return () => clearInterval(timer);
	});

	const shown = $derived((lines ?? []).filter((line) => !filter || line.toLowerCase().includes(filter.toLowerCase())));
	const level = (line: string) => (/error|warning|failed/i.test(line) ? 'bad' : /logged in|online/i.test(line) ? 'ok' : '');
</script>

<svelte:head>
	<title>Console · Admin · {data.serverName}</title>
</svelte:head>

<div class="page-head">
	<div>
		<h1>Console</h1>
		<p>The game server's output, refreshed every 3 seconds. Use the dashboard for server actions.</p>
	</div>
	<div class="row">
		<label class="stack">Filter <input type="search" bind:value={filter} /></label>
		<label class="check"><input type="checkbox" bind:checked={follow} /> Follow</label>
	</div>
</div>

<section class="panel">
	{#if lines === null}
		<div class="panel-body muted">No log yet: the server writes it from its next start on.</div>
	{:else}
		<pre class="log mono" bind:this={box}>{#each shown as line, index (index)}<span class={level(line)}>{line}{'\n'}</span>{/each}</pre>
	{/if}
</section>

<style>
	.log {
		margin: 0;
		padding: 12px 16px;
		height: 70vh;
		overflow: auto;
		font-size: 13px;
		line-height: 1.45;
		white-space: pre-wrap;
		overflow-wrap: anywhere;
	}

	.log .bad {
		color: var(--a-bad-soft);
	}

	.log .ok {
		color: var(--a-ok);
	}

	.check {
		display: flex;
		align-items: center;
		gap: 6px;
		font-size: 14px;
		min-height: 36px;
	}
</style>
