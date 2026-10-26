<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>NPCs · Library · {data.serverName}</title>
</svelte:head>

<main class="wrap page">
	<nav class="crumbs" aria-label="Breadcrumbs"><a href="/library">Library</a> › <span>NPCs</span></nav>
	<section class="card">
		<div class="card-head"><h1>NPCs</h1><span class="note">By the nearest town</span></div>
		<div class="card-body towns">
			{#each data.towns as group (group.town)}
				<div>
					<h2>{group.town}</h2>
					<ul>
						{#each group.npcs as npc, i (i)}
							<li id={npc.slug}>{npc.name}{#if npc.floor !== null && npc.floor !== 0}<span class="muted"> · {npc.floor > 0 ? `floor +${npc.floor}` : `underground ${-npc.floor}`}</span>{/if}</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	</section>
</main>

<style>
	.page {
		width: 100%;
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

	.note {
		color: var(--hero-soft);
		font-size: 14px;
	}

	.towns {
		columns: 3 260px;
		column-gap: 32px;
	}

	.towns > div {
		break-inside: avoid;
		margin-bottom: 20px;
	}

	h2 {
		font-size: 22px;
		border-bottom: 2px solid var(--paper-rule);
		margin-bottom: 6px;
	}

	ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	li {
		padding: 3px 0;
	}

	li:target {
		background: var(--input-bg);
		font-weight: 700;
	}

	.muted {
		color: var(--paper-muted);
		font-size: 14px;
	}
</style>
