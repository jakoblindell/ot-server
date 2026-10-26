<script lang="ts">
	let { data } = $props();
	const kinds = [
		{ id: 'all', label: 'All' },
		{ id: 'creature', label: 'Creatures' },
		{ id: 'item', label: 'Items' },
		{ id: 'spell', label: 'Spells' },
		{ id: 'npc', label: 'NPCs' }
	];
	const labels: Record<string, string> = { creature: 'Creature', item: 'Item', spell: 'Spell', npc: 'NPC' };
	const colors: Record<string, string> = { creature: '#7a2418', item: '#6b4a1a', spell: '#2b3f6b', npc: '#2f4a2a' };
	const topics = [
		{ href: '/library/creatures', title: 'Creatures', text: 'Every creature: hit points, experience, loot and where it lives.' },
		{ href: '/library/spells', title: 'Spells & runes', text: 'Words, levels, mana and who can cast them.' },
		{ href: '/library/npcs', title: 'NPCs', text: 'Who is where, from Rookgaard to Port Hope.' },
		{ href: '/houses', title: 'Houses', text: 'Every house, its rent and its owner.' }
	];
</script>

<svelte:head>
	<title>Library · {data.serverName}</title>
</svelte:head>

<main class="wrap page">
	<section class="card" aria-labelledby="lib-h">
		<div class="card-head"><h1 id="lib-h">The Library</h1><span class="note">Everything the old manuals never told you</span></div>
		<div class="card-body">
			<form method="GET" class="search" role="search">
				<label class="field grow">Search creatures, items, spells and NPCs <input name="q" value={data.query} minlength="2" autocomplete="off" /></label>
				<input type="hidden" name="kind" value={data.kind} />
				<button class="button" type="submit">Search</button>
			</form>
			<nav class="kinds" aria-label="Kinds">
				{#each kinds as kind (kind.id)}
					<a href="?q={encodeURIComponent(data.query)}&kind={kind.id}" aria-current={data.kind === kind.id ? 'true' : undefined}>
						{kind.label}{kind.id !== 'all' ? ` (${data.counts[kind.id as keyof typeof data.counts]})` : ''}
					</a>
				{/each}
			</nav>

			{#if data.query.length >= 2}
				{#if data.results.length}
					<ul class="results">
						{#each data.results as result (result.kind + result.href + result.name)}
							<li>
								<span class="icon">{#if result.image}<img src={result.image} alt="" loading="lazy" />{/if}</span>
								<span class="text"><a href={result.href}>{result.name}</a><span class="detail">{result.detail}</span></span>
								<span class="tag pixel" style:background={colors[result.kind]}>{labels[result.kind]}</span>
							</li>
						{/each}
					</ul>
				{:else}
					<p class="empty"><strong>Nothing in the archives.</strong> No entry matches “{data.query}”. Check the spelling, or try a shorter word.</p>
				{/if}
			{/if}
		</div>
	</section>

	<div class="topics">
		{#each topics as topic (topic.href)}
			<a class="panel topic" href={topic.href}><h2>{topic.title}</h2><p>{topic.text}</p></a>
		{/each}
	</div>
</main>

<style>
	.page {
		width: 100%;
		max-width: 1000px;
		padding-top: 32px;
		padding-bottom: 72px;
		display: flex;
		flex-direction: column;
		gap: 28px;
	}

	.note {
		color: var(--hero-soft);
		font-size: 15px;
	}

	.search {
		display: flex;
		gap: 12px;
		align-items: flex-end;
		flex-wrap: wrap;
	}

	.grow {
		flex: 1 1 260px;
	}

	.kinds {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin: 16px 0;
	}

	.kinds a {
		padding: 6px 12px;
		border-radius: 999px;
		border: 1px solid var(--paper-muted);
		color: var(--paper-text);
		text-decoration: none;
		font-size: 15px;
	}

	.kinds a[aria-current] {
		background: var(--head);
		border-color: var(--head);
		color: var(--head-text);
	}

	.results {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.results li {
		display: flex;
		align-items: center;
		gap: 14px;
		padding: 8px 0;
		border-bottom: 1px dashed var(--paper-rule);
	}

	.icon {
		flex: 0 0 40px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--paper-rule);
		border-radius: 3px;
	}

	.icon img {
		max-width: 36px;
		max-height: 36px;
		image-rendering: pixelated;
	}

	.text {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.text a {
		color: var(--paper-text);
		font-weight: 700;
	}

	.detail {
		font-size: 14px;
		color: var(--paper-muted);
	}

	.tag {
		font-size: 12px;
		color: #f6ecd4;
		padding: 2px 8px;
		border-radius: 3px;
	}

	.empty {
		margin: 0;
	}

	.topics {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
		gap: 20px;
	}

	.topic {
		text-decoration: none;
		color: var(--text-soft);
	}

	.topic:hover {
		border-color: var(--accent);
		color: var(--text-soft);
	}

	.topic h2 {
		font-size: 24px;
	}

	.topic p {
		margin: 6px 0 0;
	}
</style>
