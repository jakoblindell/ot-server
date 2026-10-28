<script lang="ts">
	let { data } = $props();
	const name = $derived(data.item.name.replace(/^(a|an|some|the) /, '').replace(/^\w/, (letter) => letter.toUpperCase()));
</script>

<svelte:head>
	<title>{name} · Library · {data.serverName}</title>
</svelte:head>

<main class="wrap page">
	<nav class="crumbs" aria-label="Breadcrumbs"><a href="/library">Library</a> › <span>Items</span> › <span>{name}</span></nav>
	<section class="card">
		<div class="card-head"><h1>{name}</h1></div>
		<div class="card-body intro">
			<div class="figure"><img src="/item/{data.item.id}.png" alt="" /></div>
			<div>
				{#if data.item.description}<p class="description">{data.item.description}</p>{/if}
				<dl>
					{#each data.item.attributes as attribute, i (i)}<dt>{attribute.label}</dt><dd class="pixel">{attribute.value}</dd>{/each}
				</dl>
				{#if data.spell}
					<p>{data.spell.kind === 'rune' ? 'Rune of' : 'Made with'} <a href="/library/spells#{encodeURIComponent(data.spell.name)}">{data.spell.name}</a>{data.spell.words ? ` (${data.spell.words})` : ''}.</p>
				{/if}
			</div>
		</div>
	</section>
	<section class="card">
		<div class="card-head"><h2>Dropped by</h2></div>
		<div class="card-body">
			{#if data.droppedBy.length}
				<ul class="drops">
					{#each data.droppedBy as drop (drop.slug)}
						<li><a href="/library/creatures/{drop.slug}">{drop.creature}</a> <span class="muted">{drop.rarity}</span></li>
					{/each}
				</ul>
			{:else}
				<p class="none">No creature drops it.</p>
			{/if}
		</div>
	</section>
</main>

<style>
	.page {
		width: 100%;
		max-width: 900px;
		padding-top: 28px;
		padding-bottom: 72px;
		display: flex;
		flex-direction: column;
		gap: 28px;
	}

	.crumbs {
		color: var(--text-muted);
	}

	.crumbs a {
		color: var(--text-soft);
	}

	.intro {
		display: flex;
		flex-wrap: wrap;
		gap: 24px;
	}

	.figure {
		flex: 0 0 96px;
		height: 96px;
		background: var(--paper-rule);
		border: 2px solid var(--paper-muted);
		border-radius: 3px;
	}

	.figure img {
		width: 100%;
		height: 100%;
		object-fit: contain;
		padding: 12px;
		image-rendering: pixelated;
	}

	.description {
		font-style: italic;
		margin-top: 0;
	}

	dl {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 4px 16px;
		margin: 0 0 12px;
	}

	dt {
		font-weight: 700;
	}

	dd {
		margin: 0;
	}

	.drops {
		columns: 2 220px;
		margin: 0;
		padding-left: 18px;
	}

	.drops a,
	p a {
		color: var(--paper-text);
		font-weight: 700;
	}

	.muted {
		color: var(--paper-muted);
	}

	.none {
		margin: 0;
	}
</style>
