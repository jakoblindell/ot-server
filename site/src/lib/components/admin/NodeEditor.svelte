<script lang="ts">
	import type { MonsterNode } from '$lib/monster';
	import AttrRows from './AttrRows.svelte';
	import NodeEditor from './NodeEditor.svelte';

	// Any element: its attributes and, one level per box, its child elements
	// (comments are kept but not shown). `template` is the element added by
	// "Add"; `entryLabel` names the entries.
	let {
		node = $bindable(),
		labels = {},
		choices = {},
		template = null,
		entryLabel = 'entry'
	}: {
		node: MonsterNode;
		labels?: Record<string, string>;
		choices?: Record<string, string[]>;
		template?: MonsterNode | null;
		entryLabel?: string;
	} = $props();

	const entries = $derived(node.children.map((child, index) => ({ child, index })).filter(({ child }) => child.tag !== '#comment'));

	const remove = (index: number) => {
		// a comment right after the entry describes it
		const next = node.children[index + 1];
		node.children.splice(index, next?.tag === '#comment' ? 2 : 1);
	};
</script>

<AttrRows bind:node {labels} {choices} />
{#if entries.length || template}
	<ol class="entries">
		{#each entries as entry (entry.index)}
			<li>
				<div class="entry-head">
					<span class="tag">&lt;{entry.child.tag}&gt;</span>
					<button type="button" class="btn small-btn danger" onclick={() => remove(entry.index)}>Remove</button>
				</div>
				<NodeEditor bind:node={node.children[entry.index]} {labels} {choices} />
			</li>
		{/each}
	</ol>
	{#if template}
		<button type="button" class="btn small-btn" onclick={() => node.children.push(structuredClone(template))}>Add {entryLabel}</button>
	{/if}
{/if}

<style>
	.entries {
		list-style: none;
		margin: 10px 0;
		padding: 0;
		display: grid;
		gap: 8px;
	}
	.entries li {
		border: 1px solid var(--admin-border, #2a313a);
		border-radius: 6px;
		padding: 8px 10px;
	}
	.entry-head {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 6px;
	}
	.tag {
		font-family: ui-monospace, monospace;
		font-size: 12px;
		opacity: 0.7;
	}
</style>
