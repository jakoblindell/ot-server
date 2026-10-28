<script lang="ts">
	let { data } = $props();
	const c = $derived(data.creature);
	// More bars for commoner loot (the page only gets the rarity)
	const bars = (tier: number) => Math.max(1, 5 - tier);
	const title = (text: string) => text.replace(/^\w/, (letter) => letter.toUpperCase());
</script>

<svelte:head>
	<title>{c.name} · Library · {data.serverName}</title>
</svelte:head>

<main class="wrap columns">
	<nav class="crumbs" aria-label="Breadcrumbs"><a href="/library">Library</a> › <a href="/library/creatures">Creatures</a> › <span>{c.name}</span></nav>

	<div class="main">
		<section class="card" aria-labelledby="c-h">
			<div class="card-head"><h1 id="c-h">{c.name}</h1></div>
			<div class="card-body intro">
				<div class="figure">{#if data.image}<img src={data.image} alt="" />{/if}</div>
				<div class="about">
					{#if c.voices.length}<p class="voice">“{c.voices[0]}”</p>{/if}
					<p class="tags">
						{#if c.race}<span class="tag">{title(c.race)}</span>{/if}
						<span class="tag">Summonable: {c.summonCost !== null ? `${c.summonCost} mana` : 'No'}</span>
						<span class="tag">Convinceable: {c.convinceCost !== null ? `${c.convinceCost} mana` : 'No'}</span>
					</p>
					<div class="stats">
						<div><span class="label">Hit points</span><span class="pixel value">{c.health}</span></div>
						<div><span class="label">Experience</span><span class="pixel value">{c.experience}</span></div>
						<div><span class="label">Armor</span><span class="pixel value">{c.armor}</span></div>
						<div><span class="label">Speed</span><span class="pixel value">{c.speed}</span></div>
					</div>
				</div>
			</div>
		</section>

		<section class="card" aria-labelledby="l-h">
			<div class="card-head"><h2 id="l-h">Loot</h2></div>
			<div class="card-body">
				{#if c.loot.length}
					<table class="table loot">
						<tbody>
							{#each c.loot as item, i (i)}
								<tr>
									{#if item.id}
										<td class="icon"><img src="/item/{item.id}.png" alt="" loading="lazy" /></td>
										<td><a href="/library/items/{item.id}">{item.name}</a></td>
										<td class="pixel">{item.countMax > 1 ? `1–${item.countMax}` : '1'}</td>
										<td class="rarity">
											<span class="bars">{#each [1, 2, 3, 4, 5] as bar (bar)}<span class:on={bars(item.tier) >= bar}></span>{/each}</span>
											{item.rarity}
										</td>
									{:else}
										<td class="icon unknown" aria-hidden="true">?</td>
										<td colspan="3" class="muted"><em>Unknown</em>: some of what it carries is still a mystery.</td>
									{/if}
								</tr>
							{/each}
						</tbody>
					</table>
				{:else}
					<p class="none">Drops nothing.</p>
				{/if}
			</div>
		</section>
	</div>

	<aside class="side">
		<section class="card">
			<div class="card-head"><h2>Abilities</h2></div>
			<div class="card-body list">
				<ul>
					{#each c.attacks as attack, i (i)}<li>{attack}</li>{/each}
					{#each c.defenses as defense, i (i)}<li>{defense} <span class="muted">(defence)</span></li>{/each}
					{#if c.summons.length}<li>Summons {c.summons.join(', ')}</li>{/if}
				</ul>
				{#if c.immunities.length}
					<h3>Immune to</h3>
					<p class="tags">{#each c.immunities as immunity, i (i)}<span class="tag">{title(immunity)}</span>{/each}</p>
				{/if}
			</div>
		</section>
		<section class="card">
			<div class="card-head"><h2>Found</h2></div>
			<div class="card-body list">
				{#if c.spawns.length}
					<ul>{#each c.spawns as spawn (spawn.town)}<li>Around {spawn.town} <span class="muted">({spawn.count})</span></li>{/each}</ul>
				{:else}
					<p class="none">Not on the map (summoned or raids only).</p>
				{/if}
			</div>
		</section>
		<section class="card">
			<div class="card-head"><h2>Last 7 days</h2></div>
			<div class="card-body"><p class="none">Players killed: <span class="pixel">{data.killsThisWeek}</span></p></div>
		</section>
	</aside>
</main>

<style>
	.unknown {
		text-align: center;
		font-weight: bold;
		color: var(--muted, #888);
	}
	.columns {
		width: 100%;
		padding-top: 28px;
		padding-bottom: 72px;
		display: flex;
		flex-wrap: wrap;
		gap: 28px;
		align-items: flex-start;
	}

	.crumbs {
		flex: 1 1 100%;
		color: var(--text-muted);
	}

	.crumbs a {
		color: var(--text-soft);
	}

	.main {
		flex: 999 1 560px;
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: 28px;
	}

	.side {
		flex: 1 1 300px;
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: 28px;
	}

	.intro {
		display: flex;
		flex-wrap: wrap;
		gap: 24px;
	}

	.figure {
		flex: 0 0 128px;
		height: 128px;
		background: var(--paper-rule);
		border: 2px solid var(--paper-muted);
		border-radius: 3px;
	}

	.figure img {
		width: 100%;
		height: 100%;
		object-fit: contain;
		padding: 8px;
		image-rendering: pixelated;
	}

	.about {
		flex: 1 1 280px;
	}

	.voice {
		font-style: italic;
		margin: 0 0 10px;
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		margin: 0 0 12px;
	}

	.tag {
		font-size: 14px;
		padding: 2px 8px;
		border: 1px solid var(--paper-muted);
		border-radius: 3px;
	}

	.stats {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
		gap: 8px;
	}

	.stats div {
		background: var(--head);
		color: var(--head-text);
		border-radius: 4px;
		padding: 8px 12px;
		display: flex;
		flex-direction: column;
	}

	.stats .label {
		font-size: 12px;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		opacity: 0.8;
	}

	.stats .value {
		font-size: 20px;
	}

	.note {
		font-size: 14px;
		color: var(--hero-soft);
	}

	.loot a {
		color: var(--paper-text);
		font-weight: 700;
	}

	.icon {
		width: 44px;
		padding: 4px 8px;
	}

	.icon img {
		width: 32px;
		height: 32px;
		object-fit: contain;
		image-rendering: pixelated;
	}

	.rarity {
		white-space: nowrap;
		font-size: 14px;
	}

	.bars {
		display: inline-flex;
		gap: 2px;
		margin-right: 6px;
		vertical-align: middle;
	}

	.bars span {
		width: 6px;
		height: 12px;
		background: var(--paper-rule);
	}

	.bars span.on {
		background: var(--head);
	}

	.muted {
		color: var(--paper-muted);
	}

	.list ul {
		margin: 0;
		padding-left: 18px;
	}

	.list h3 {
		font-size: 18px;
		margin: 14px 0 8px;
	}

	.none {
		margin: 0;
	}
</style>
