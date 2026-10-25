<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>Who is online · {data.serverName}</title>
</svelte:head>

<main class="wrap page">
	<section class="card" aria-labelledby="on-h">
		<div class="card-head">
			<h1 id="on-h">Who is online</h1>
			<span class="count pixel">{data.players.length} {data.players.length === 1 ? 'player' : 'players'}</span>
		</div>
		<div class="scroll">
			<table class="table">
				<thead>
					<tr>
						<th><a href="?sort=name" aria-current={data.sort === 'name' ? 'true' : undefined}>Name</a></th>
						<th>Vocation</th>
						<th class="num"><a href="?sort=level" aria-current={data.sort === 'level' ? 'true' : undefined}>Level</a></th>
					</tr>
				</thead>
				<tbody>
					{#each data.players as player (player.name)}
						<tr>
							<td><a class="name" href="/characters/{encodeURIComponent(player.name)}">{player.name}</a></td>
							<td><span class="badge pixel" style:background={player.badge.color}>{player.badge.short}</span> {player.vocation}</td>
							<td class="num pixel">{player.level}</td>
						</tr>
					{:else}
						<tr><td colspan="3">Nobody is online right now.</td></tr>
					{/each}
				</tbody>
			</table>
		</div>
	</section>
</main>

<style>
	.page {
		width: 100%;
		max-width: 900px;
		padding-top: 32px;
		padding-bottom: 72px;
	}

	.count {
		color: var(--hero-soft);
	}

	.scroll {
		overflow-x: auto;
		padding: 8px 12px 12px;
	}

	th a {
		color: inherit;
	}

	th a[aria-current] {
		color: var(--paper-text);
	}

	.name {
		color: var(--paper-text);
		font-weight: 700;
	}

	.num {
		text-align: right;
	}

	.badge {
		font-size: 12px;
		color: #f6ecd4;
		padding: 2px 6px;
		border-radius: 3px;
	}
</style>
