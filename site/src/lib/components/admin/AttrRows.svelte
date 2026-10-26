<script lang="ts">
	import type { MonsterNode } from '$lib/monster';

	// The attributes of one element as key/value rows. Known keys get a label
	// and, where given, a list of choices; any other key can be added.
	let {
		node = $bindable(),
		labels = {},
		choices = {},
		fixed = false
	}: {
		node: MonsterNode;
		labels?: Record<string, string>;
		choices?: Record<string, string[]>;
		fixed?: boolean;
	} = $props();

	let newKey = $state('');
	const add = () => {
		const key = newKey.trim();
		if (key && !node.attrs.some(([name]) => name === key)) node.attrs.push([key, '']);
		newKey = '';
	};
</script>

<div class="attrs">
	{#each node.attrs as pair, index (index)}
		<label class="attr">
			<span class="key" title={pair[0]}>{labels[pair[0]] ?? pair[0]}</span>
			{#if choices[pair[0]]}
				<select bind:value={pair[1]}>
					{#if !choices[pair[0]].includes(pair[1])}<option value={pair[1]}>{pair[1]}</option>{/if}
					{#each choices[pair[0]] as choice (choice)}<option value={choice}>{choice}</option>{/each}
				</select>
			{:else}
				<input bind:value={pair[1]} class:num={/^-?\d+$/.test(pair[1])} />
			{/if}
			{#if !fixed}
				<button type="button" class="x" title="Remove {pair[0]}" onclick={() => node.attrs.splice(index, 1)}>×</button>
			{/if}
		</label>
	{/each}
	{#if !fixed}
		<span class="attr add">
			<input placeholder="new attribute" bind:value={newKey} onkeydown={(event) => event.key === 'Enter' && (event.preventDefault(), add())} />
			<button type="button" class="btn small-btn" onclick={add}>Add</button>
		</span>
	{/if}
</div>

<style>
	.attrs {
		display: flex;
		flex-wrap: wrap;
		gap: 6px 12px;
	}
	.attr {
		display: flex;
		align-items: center;
		gap: 6px;
	}
	.key {
		font-size: 12px;
		color: var(--admin-muted, #9aa3ad);
		min-width: 0;
		white-space: nowrap;
	}
	.attr input,
	.attr select {
		width: 130px;
	}
	.attr input.num {
		width: 80px;
	}
	.add input {
		width: 120px;
	}
	.x {
		background: none;
		border: 0;
		color: inherit;
		opacity: 0.5;
		cursor: pointer;
		font-size: 15px;
		padding: 0 2px;
	}
	.x:hover {
		opacity: 1;
	}
</style>
