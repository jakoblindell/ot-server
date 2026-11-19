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
			<table class="table stack">
				<thead>
					<tr>
						<th class="icon"><span class="visually-hidden">Picture</span></th>
						<th class="main"><a href="?sort=name">Name</a></th>
						<th class="num end"><a href="?sort=health">Toughness</a></th>
						<th class="num more"><a href="?sort=experience">Experience</a></th>
					</tr>
				</thead>
				<tbody>
					{#each shown as creature (creature.slug)}
						<tr>
							<td class="icon">{#if creature.image}<img src={creature.image} alt="" loading="lazy" />{/if}</td>
							<td class="main"><a href="/library/creatures/{creature.slug}">{creature.name}</a></td>
							<td class="num end">{creature.health}</td>
							<td class="num more" data-label="Experience">{creature.experience}</td>
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
		flex: 1 1 180px;
		max-width: 320px;
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

	@media (max-width: 600px) {
		/* The picture beside both lines */
		tr {
			display: grid !important;
			grid-template-columns: 44px 1fr auto;
			align-items: baseline;
		}

		tr::before {
			display: none;
		}

		.icon {
			grid-row: span 2;
			align-self: center;
			padding: 0;
		}

		.more {
			grid-column: 2 / -1;
		}
	}

	.icon img {
		width: 36px;
		height: 36px;
		object-fit: contain;
		image-rendering: pixelated;
	}
</style>
