<script lang="ts">
	let { data } = $props();
	const town = $derived(data.towns.find((entry) => entry.id === data.townId)?.name ?? '');
	const free = $derived(data.houses.filter((house) => !house.owner).length);
</script>

<svelte:head>
	<title>Houses · {data.serverName}</title>
</svelte:head>

<main class="wrap page">
	<nav class="kinds" aria-label="Towns">
		{#each data.towns as entry (entry.id)}
			<a href="?town={entry.id}" aria-current={entry.id === data.townId ? 'true' : undefined}>{entry.name}</a>
		{/each}
	</nav>
	<section class="card">
		<div class="card-head"><h1>Houses in {town}</h1><span class="note pixel">{free} of {data.houses.length} free</span></div>
		<div class="scroll">
			<table class="table">
				<thead><tr><th>House</th><th class="num">Size</th><th class="num">Beds</th><th class="num">Rent</th><th>Owner</th></tr></thead>
				<tbody>
					{#each data.houses as house (house.id)}
						<tr>
							<td><strong>{house.name}</strong></td>
							<td class="num pixel">{house.size} sqm</td>
							<td class="num pixel">{house.beds}</td>
							<td class="num pixel">{house.rent.toLocaleString('en-GB')} gp</td>
							<td>{#if house.owner}<a href="/characters/{encodeURIComponent(house.owner)}">{house.owner}</a>{:else}<span class="free">Free</span>{/if}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</section>
	<p class="hint">Houses are bought in the game: stand in the house and say <span class="pixel">!buyhouse</span>.</p>
</main>

<style>
	.page {
		width: 100%;
		max-width: 1000px;
		padding-top: 28px;
		padding-bottom: 72px;
		display: flex;
		flex-direction: column;
		gap: 20px;
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

	.note {
		color: var(--hero-soft);
	}

	.scroll {
		overflow-x: auto;
		padding: 8px 12px 12px;
	}

	.table {
		min-width: 560px;
	}

	.table a {
		color: var(--paper-text);
		font-weight: 700;
	}

	.num {
		text-align: right;
	}

	.free {
		color: var(--head);
		font-weight: 700;
	}

	.hint {
		color: var(--text-muted);
		margin: 0;
	}
</style>
