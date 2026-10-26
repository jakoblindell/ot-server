<script lang="ts">
	import type { MonsterNode } from '$lib/monster';

	// Elements whose children are one-attribute entries: <flags> (<flag
	// summonable="1" />), <immunities> (<immunity fire="1" />), <elements>
	// (<element firePercent="20" />). Yes/no entries get a checkbox.
	let {
		node = $bindable(),
		entryTag,
		known,
		booleans = []
	}: { node: MonsterNode; entryTag: string; known: string[]; booleans?: string[] } = $props();

	const entries = $derived(
		node.children
			.map((child, index) => ({ child, index }))
			.filter(({ child }) => child.tag === entryTag && child.attrs.length > 0)
	);
	const used = $derived(new Set(entries.map(({ child }) => child.attrs[0][0])));
	let adding = $state('');
	const add = () => {
		const key = adding.trim();
		if (!key || used.has(key)) return;
		node.children.push({ tag: entryTag, attrs: [[key, booleans.includes(key) ? '1' : '0']], children: [] });
		adding = '';
	};
</script>

<div class="flags">
	{#each entries as entry (entry.index)}
		{@const pair = node.children[entry.index].attrs[0]}
		<div class="flag">
			{#if booleans.includes(pair[0])}
				<label><input type="checkbox" checked={pair[1] === '1'} onchange={(event) => (pair[1] = event.currentTarget.checked ? '1' : '0')} /> {pair[0]}</label>
			{:else}
				<label>{pair[0]} <input bind:value={pair[1]} class="num" /></label>
			{/if}
			<button type="button" class="x" title="Remove {pair[0]}" onclick={() => node.children.splice(entry.index, 1)}>×</button>
		</div>
	{/each}
</div>
<div class="row add">
	<input list="{entryTag}-names" placeholder="add {entryTag}" bind:value={adding} onkeydown={(event) => event.key === 'Enter' && (event.preventDefault(), add())} />
	<datalist id="{entryTag}-names">
		{#each known.filter((name) => !used.has(name)) as name (name)}<option value={name}></option>{/each}
	</datalist>
	<button type="button" class="btn small-btn" onclick={add}>Add</button>
</div>

<style>
	.flags {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
		gap: 6px 14px;
	}
	.flag {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 6px;
	}
	.flag label {
		display: flex;
		align-items: center;
		gap: 6px;
		font-size: 13px;
	}
	.num {
		width: 70px;
	}
	.add {
		margin-top: 8px;
	}
	.add input {
		width: 180px;
	}
	.x {
		background: none;
		border: 0;
		color: inherit;
		opacity: 0.5;
		cursor: pointer;
	}
	.x:hover {
		opacity: 1;
	}
</style>
