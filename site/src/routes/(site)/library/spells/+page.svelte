<script lang="ts">
	let { data } = $props();
	const vocations = ['', 'Knight', 'Paladin', 'Sorcerer', 'Druid'];
	const groups = $derived([
		{ title: 'Instant spells', spells: data.spells.filter((spell) => spell.kind === 'instant') },
		{ title: 'Conjuring spells', spells: data.spells.filter((spell) => spell.kind === 'conjure') },
		{ title: 'Runes', spells: data.spells.filter((spell) => spell.kind === 'rune') }
	]);
	const short = (names: string[]) =>
		names
			.filter((name) => !/^(Master|Elder|Royal|Elite) /.test(name))
			.join(', ') || '–';
</script>

<svelte:head>
	<title>Spells · Library · {data.serverName}</title>
</svelte:head>

<main class="wrap page">
	<nav class="crumbs" aria-label="Breadcrumbs"><a href="/library">Library</a> › <span>Spells</span></nav>
	<nav class="kinds" aria-label="Vocation">
		{#each vocations as vocation (vocation)}
			<a href="?vocation={vocation}" aria-current={data.vocation === vocation ? 'true' : undefined}>{vocation ? `${vocation}s` : 'All vocations'}</a>
		{/each}
	</nav>
	{#each groups as group (group.title)}
		{#if group.spells.length}
			<section class="card">
				<div class="card-head"><h2>{group.title}</h2></div>
				<div class="scroll">
					<table class="table">
						<thead><tr><th>Name</th><th>Words</th><th class="num">Magic level</th><th class="num">Mana</th><th>Vocations</th><th>Premium</th></tr></thead>
						<tbody>
							{#each group.spells as spell, i (i)}
								<tr id={encodeURIComponent(spell.name)}>
									<td>
										{#if spell.runeId}<img class="rune" src="/item/{spell.runeId}.png" alt="" loading="lazy" />{/if}
										<strong>{spell.name}</strong>
										{#if spell.itemName && spell.kind === 'conjure'}<span class="muted"> → {spell.conjureCount > 1 ? `${spell.conjureCount}× ` : ''}{spell.itemName}</span>{/if}
									</td>
									<td class="pixel">{spell.words}</td>
									<td class="num pixel">{spell.magicLevel}</td>
									<td class="num pixel">{spell.mana || '–'}</td>
									<td>{short(spell.vocations)}</td>
									<td>{spell.premium ? 'Yes' : ''}</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</section>
		{/if}
	{/each}
</main>

<style>
	.page {
		width: 100%;
		padding-top: 28px;
		padding-bottom: 72px;
		display: flex;
		flex-direction: column;
		gap: 24px;
	}

	.crumbs {
		color: var(--text-muted);
	}

	.crumbs a {
		color: var(--text-soft);
	}

	.kinds {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	.kinds a {
		padding: 6px 12px;
		border-radius: 999px;
		border: 1px solid var(--border-strong);
		color: var(--text-soft);
		text-decoration: none;
	}

	.kinds a[aria-current] {
		background: var(--head);
		border-color: var(--head);
		color: var(--head-text);
	}

	.scroll {
		overflow-x: auto;
		padding: 8px 12px 12px;
	}

	.table {
		min-width: 680px;
	}

	tr:target td {
		background: var(--input-bg);
	}

	.num {
		text-align: right;
	}

	.rune {
		width: 24px;
		height: 24px;
		vertical-align: middle;
		image-rendering: pixelated;
		margin-right: 6px;
	}

	.muted {
		color: var(--paper-muted);
		font-size: 14px;
	}
</style>
