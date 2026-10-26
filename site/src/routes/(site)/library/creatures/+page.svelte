<script lang="ts">
	let { data } = $props();
	let filter = $state('');
	const shown = $derived(data.creatures.filter((creature) => !filter || creature.name.toLowerCase().includes(filter.toLowerCase())));
</script>

<svelte:head>
	<title>Creatures · Library · {data.serverName}</title>
</svelte:head>

<main class="wrap page">
	<nav class="crumbs" aria-label="Breadcrumbs"><a href="/library">Library</a> › <span>Creatures</span></nav>
	<section class="card">
		<div class="card-head">
			<h1>Creatures</h1>
			<input class="filter" type="search" placeholder="Filter…" bind:value={filter} aria-label="Filter creatures" />
		</div>
		<div class="scroll">
			<table class="table">
				<thead>
					<tr>
						<th></th>
						<th><a href="?sort=name">Name</a></th>
						<th class="num"><a href="?sort=health">Hit points</a></th>
						<th class="num"><a href="?sort=experience">Experience</a></th>
						<th class="num">Spawns</th>
					</tr>
				</thead>
				<tbody>
					{#each shown as creature (creature.slug)}
						<tr>
							<td class="icon">{#if creature.image}<img src={creature.image} alt="" loading="lazy" />{/if}</td>
							<td><a href="/library/creatures/{creature.slug}">{creature.name}</a></td>
							<td class="num pixel">{creature.health}</td>
							<td class="num pixel">{creature.experience}</td>
							<td class="num pixel">{creature.spawns || '–'}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</section>
</main>

<style>
	.page {
		width: 100%;
		max-width: 1000px;
		padding-top: 28px;
		padding-bottom: 72px;
	}

	.crumbs {
		color: var(--text-muted);
		margin-bottom: 16px;
	}

	.crumbs a {
		color: var(--text-soft);
	}

	.filter {
		min-height: 36px;
		border-radius: 4px;
		border: 1px solid var(--head-edge);
		background: var(--input-bg);
		padding: 0 10px;
		font: inherit;
	}

	.scroll {
		overflow-x: auto;
		padding: 8px 12px 12px;
	}

	.table a {
		color: var(--paper-text);
		font-weight: 700;
	}

	th a {
		color: inherit !important;
		font-weight: inherit !important;
	}

	.num {
		text-align: right;
	}

	.icon {
		width: 44px;
		padding: 4px 8px;
	}

	.icon img {
		width: 36px;
		height: 36px;
		object-fit: contain;
		image-rendering: pixelated;
	}
</style>
