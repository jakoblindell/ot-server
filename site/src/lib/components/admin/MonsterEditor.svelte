<script lang="ts">
	import type { MonsterDoc, MonsterNode } from '$lib/monster';
	import AttrRows from './AttrRows.svelte';
	import FlagList from './FlagList.svelte';
	import LootList from './LootList.svelte';
	import NodeEditor from './NodeEditor.svelte';

	let { doc, path, names }: { doc: MonsterDoc; path: string; names: Map<number, string> } = $props();

	// Edited in place and sent as JSON; the server writes the XML. The page
	// creates a new editor per monster, so the first value is the one wanted.
	// svelte-ignore state_referenced_locally
	let root = $state(structuredClone(doc.root));
	const original = $derived(JSON.stringify(doc.root));
	const json = $derived(JSON.stringify(root));
	const dirty = $derived(json !== original);

	const node = (attrs: [string, string][], tag: string, children: MonsterNode[] = []): MonsterNode => ({ tag, attrs, children });
	const SECTIONS: Record<string, { title: string; template?: MonsterNode; entryLabel?: string; hint?: string }> = {
		health: { title: 'Health' },
		look: { title: 'Look', hint: 'type: outfit; typeex: shown as an item instead; corpse: the item left behind' },
		targetchange: { title: 'Target change', hint: 'How often (ms) and how likely (%) it picks a new target' },
		targetstrategy: { title: 'Target strategy' },
		flags: { title: 'Flags' },
		attacks: {
			title: 'Attacks',
			hint: 'attack/skill on <attacks>: melee strength. Spells: interval (ms), chance (%), min/max (negative: damage)',
			template: node([['name', 'melee'], ['interval', '2000'], ['chance', '100'], ['min', '0'], ['max', '-10']], 'attack'),
			entryLabel: 'attack'
		},
		defenses: {
			title: 'Defenses',
			template: node([['name', 'healing'], ['interval', '2000'], ['chance', '15'], ['min', '10'], ['max', '30']], 'defense'),
			entryLabel: 'defense'
		},
		immunities: { title: 'Immunities' },
		elements: { title: 'Elements', hint: 'Percent of damage taken changed per element' },
		summons: { title: 'Summons', template: node([['name', ''], ['interval', '2000'], ['chance', '10']], 'summon'), entryLabel: 'summon' },
		voices: { title: 'Voices', template: node([['sentence', ''], ['yell', '0']], 'voice'), entryLabel: 'voice' },
		loot: { title: 'Loot' },
		script: { title: 'Scripts' }
	};
	const OPTIONAL = ['immunities', 'elements', 'summons', 'voices', 'loot'];
	const OPTIONAL_ATTRS: Record<string, [string, string][]> = {
		summons: [['maxSummons', '1']],
		voices: [['interval', '5000'], ['chance', '10']]
	};
	const FLAGS = ['summonable', 'attackable', 'hostile', 'illusionable', 'convinceable', 'pushable', 'canpushitems', 'canpushcreatures', 'hidehealth', 'targetdistance', 'runonhealth', 'staticattack', 'lightlevel', 'lightcolor'];
	const FLAG_BOOLEANS = ['summonable', 'attackable', 'hostile', 'illusionable', 'convinceable', 'pushable', 'canpushitems', 'canpushcreatures', 'hidehealth'];
	const IMMUNITIES = ['physical', 'energy', 'fire', 'poison', 'earth', 'drown', 'ice', 'holy', 'death', 'lifedrain', 'manadrain', 'paralyze', 'outfit', 'drunk', 'invisible', 'invisibility'];
	const ELEMENTS = ['physicalPercent', 'energyPercent', 'firePercent', 'poisonPercent', 'earthPercent', 'drownPercent', 'icePercent', 'holyPercent', 'deathPercent', 'lifedrainPercent', 'manadrainPercent'];

	const sections = $derived(root.children.map((child, index) => ({ child, index })).filter(({ child }) => child.tag !== '#comment'));
	const missing = $derived(OPTIONAL.filter((tag) => !root.children.some((child) => child.tag === tag)));
	const addSection = (tag: string) => {
		// before <script>, where the files keep them
		const at = root.children.findIndex((child) => child.tag === 'script');
		const section = node(OPTIONAL_ATTRS[tag] ?? [], tag);
		if (at < 0) root.children.push(section);
		else root.children.splice(at, 0, section);
	};

	const look = $derived(root.children.find((child) => child.tag === 'look'));
	const lookValue = (key: string) => Number(look?.attrs.find(([name]) => name === key)?.[1] ?? 0) || 0;
	const preview = $derived(
		lookValue('typeex')
			? `/item/${lookValue('typeex')}.png`
			: lookValue('type')
				? `/outfit/${['type', 'head', 'body', 'legs', 'feet'].map(lookValue).join('-')}.png`
				: null
	);
	const title = $derived(root.attrs.find(([key]) => key === 'name')?.[1] ?? path);
</script>

<form method="POST" action="?file={encodeURIComponent(path)}&/save" class="editor">
	<input type="hidden" name="file" value={path} />
	<input type="hidden" name="root" value={json} />

	<section class="panel">
		<div class="panel-head">
			<h2>{title}</h2>
			<a href="/admin/files?file={encodeURIComponent(path)}" class="muted">Edit the XML</a>
		</div>
		<div class="panel-body general">
			<div class="figure">{#if preview}<img src={preview} alt="" />{/if}</div>
			<AttrRows
				bind:node={root}
				labels={{ name: 'Name', nameDescription: 'Description', race: 'Race', experience: 'Experience', speed: 'Speed', manacost: 'Mana cost (summon/convince)' }}
				choices={{ race: ['blood', 'venom', 'undead', 'fire', 'energy'] }}
			/>
		</div>
	</section>

	{#each sections as section (section.index)}
		{@const tag = section.child.tag}
		{@const info = SECTIONS[tag] ?? { title: `<${tag}>` }}
		<section class="panel">
			<div class="panel-head">
				<h2>{info.title}</h2>
				{#if OPTIONAL.includes(tag)}
					<button type="button" class="btn small-btn danger" onclick={() => root.children.splice(section.index, 1)}>Remove section</button>
				{/if}
			</div>
			<div class="panel-body">
				{#if info.hint}<p class="muted hint">{info.hint}</p>{/if}
				{#if tag === 'flags'}
					<FlagList bind:node={root.children[section.index]} entryTag="flag" known={FLAGS} booleans={FLAG_BOOLEANS} />
				{:else if tag === 'immunities'}
					<FlagList bind:node={root.children[section.index]} entryTag="immunity" known={IMMUNITIES} booleans={IMMUNITIES} />
				{:else if tag === 'elements'}
					<FlagList bind:node={root.children[section.index]} entryTag="element" known={ELEMENTS} />
				{:else if tag === 'loot'}
					<LootList bind:node={root.children[section.index]} {names} />
				{:else if tag === 'health'}
					<AttrRows bind:node={root.children[section.index]} labels={{ now: 'At spawn', max: 'Maximum' }} />
				{:else}
					<NodeEditor bind:node={root.children[section.index]} template={info.template ?? null} entryLabel={info.entryLabel} />
				{/if}
			</div>
		</section>
	{/each}

	{#if missing.length}
		<p class="row add-sections">
			<span class="muted">Add:</span>
			{#each missing as tag (tag)}<button type="button" class="btn small-btn" onclick={() => addSection(tag)}>{SECTIONS[tag].title}</button>{/each}
		</p>
	{/if}

	<div class="row bar">
		<label class="stack grow">What changed (for the history) <input name="message" maxlength="200" /></label>
		<label class="check"><input type="checkbox" name="reload" /> Apply now (reload monsters)</label>
		<button class="btn primary" disabled={!dirty}>Save</button>
	</div>
	<p class="muted small">Saved changes go live at the next server save, or now with "Apply now". Monsters already on the map keep their old values until they respawn.</p>
</form>

<style>
	.editor {
		display: grid;
		gap: 12px;
	}
	.general {
		display: flex;
		gap: 16px;
		align-items: flex-start;
	}
	.figure {
		width: 64px;
		height: 64px;
		flex: none;
		display: grid;
		place-items: center;
		background: rgba(0, 0, 0, 0.25);
		border-radius: 6px;
	}
	.figure img {
		width: 64px;
		height: 64px;
		object-fit: contain;
		image-rendering: pixelated;
	}
	.hint {
		margin: 0 0 8px;
		font-size: 12px;
	}
	.bar {
		position: sticky;
		bottom: 0;
		padding: 10px 0;
		background: var(--admin-bg, #12161b);
		align-items: flex-end;
	}
	.grow {
		flex: 1;
	}
	.add-sections {
		gap: 6px;
	}
</style>
