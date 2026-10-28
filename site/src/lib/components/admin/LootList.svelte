<script lang="ts">
	import type { MonsterNode } from '$lib/monster';
	import LootList from './LootList.svelte';
	import { rarity } from '$lib/rarity';

	// <loot> (or a container's <inside>): one row per <item>, with its picture
	// and name. The comment after an item names it, as in the files; it is
	// rewritten when the item changes. Chances are out of 1000.
	let { node = $bindable(), names }: { node: MonsterNode; names: Map<number, string> } = $props();

	const get = (item: MonsterNode, key: string) => item.attrs.find(([name]) => name === key)?.[1] ?? '';
	const set = (item: MonsterNode, key: string, value: string) => {
		const pair = item.attrs.find(([name]) => name === key);
		if (pair) pair[1] = value;
		else item.attrs.push([key, value]);
	};
	const rows = $derived(node.children.map((child, index) => ({ child, index })).filter(({ child }) => child.tag === 'item'));

	const nameComment = (index: number) => {
		const item = node.children[index];
		const name = names.get(Number(get(item, 'id')));
		const next = node.children[index + 1];
		if (next?.tag === '#comment') {
			if (name) next.text = ` ${name} `;
			else node.children.splice(index + 1, 1);
		} else if (name) {
			node.children.splice(index + 1, 0, { tag: '#comment', attrs: [], children: [], text: ` ${name} ` });
		}
	};
	const remove = (index: number) => node.children.splice(index, node.children[index + 1]?.tag === '#comment' ? 2 : 1);
	const add = () => node.children.push({ tag: 'item', attrs: [['id', ''], ['countmax', '1'], ['chance', '100']], children: [] });
	const percent = (chance: string) => {
		const value = Number(chance);
		return Number.isFinite(value) && chance !== '' ? `${Math.min(100, value / 10).toFixed(value < 10 ? 1 : 0)}%` : '';
	};
	// what players see instead of the chance (before the loot rate)
	const tier = (chance: string) => (chance !== '' && Number.isFinite(Number(chance)) ? rarity(Math.min(100, Number(chance) / 10)) : '');
	// hidden="1": players see "Unknown" (the game server ignores the attribute)
	const setHidden = (item: MonsterNode, hidden: boolean) => {
		if (hidden) set(item, 'hidden', '1');
		else item.attrs = item.attrs.filter(([name]) => name !== 'hidden');
	};
</script>

<table class="loot">
	<thead>
		<tr><th></th><th>Item</th><th>Id</th><th>Max count</th><th>Chance (of 1000)</th><th>Players see</th><th></th></tr>
	</thead>
	<tbody>
		{#each rows as row (row.index)}
			{@const item = node.children[row.index]}
			{@const inside = item.children.find((child) => child.tag === 'inside')}
			<tr>
				<td class="icon">{#if get(item, 'id')}<img src="/item/{get(item, 'id')}.png" alt="" loading="lazy" />{/if}</td>
				<td>{names.get(Number(get(item, 'id'))) ?? '?'}</td>
				<td>
					<input class="num" list="item-names" value={get(item, 'id')} onchange={(event) => (set(item, 'id', event.currentTarget.value.trim()), nameComment(row.index))} />
				</td>
				<td><input class="num" value={get(item, 'countmax')} oninput={(event) => set(item, 'countmax', event.currentTarget.value)} /></td>
				<td>
					<input class="num" value={get(item, 'chance')} oninput={(event) => set(item, 'chance', event.currentTarget.value)} />
					<span class="muted">{percent(get(item, 'chance'))}</span>
				</td>
				<td>
					<label class="seen" title="Hidden: players see Unknown on the website and in the client">
						<input type="checkbox" checked={get(item, 'hidden') === '1'} onchange={(event) => setHidden(item, event.currentTarget.checked)} />
						{get(item, 'hidden') === '1' ? 'Unknown' : tier(get(item, 'chance'))}
					</label>
				</td>
				<td><button type="button" class="btn small-btn danger" onclick={() => remove(row.index)}>Remove</button></td>
			</tr>
			{#if inside}
				<tr class="inside">
					<td></td>
					<td colspan="6">
						<span class="muted">Inside:</span>
						<LootList bind:node={item.children[item.children.indexOf(inside)]} {names} />
					</td>
				</tr>
			{/if}
		{/each}
	</tbody>
</table>
<button type="button" class="btn small-btn" onclick={add}>Add item</button>

<style>
	.loot {
		margin-bottom: 8px;
	}
	.icon img {
		width: 32px;
		height: 32px;
		image-rendering: pixelated;
		display: block;
	}
	.num {
		width: 80px;
	}
	.seen {
		white-space: nowrap;
	}
	.inside td {
		padding-top: 0;
	}
</style>
