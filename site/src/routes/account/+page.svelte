<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>My account · {data.serverName}</title>
</svelte:head>

<main class="wrap page">
	<section class="card" aria-labelledby="characters-h">
		<div class="card-head">
			<h1 id="characters-h">Characters</h1>
			<form method="POST" action="/logout"><button class="link" type="submit">Log out</button></form>
		</div>
		<div class="card-body">
			<p class="summary">
				Account <strong>{data.account.name}</strong> ·
				{data.account.premdays > 0 ? `Premium, ${data.account.premdays} days left` : 'Free account'}
			</p>
			{#if data.characters.length}
				<table class="table">
					<thead><tr><th>Name</th><th>Vocation</th><th>Level</th><th>Status</th></tr></thead>
					<tbody>
						{#each data.characters as character (character.name)}
							<tr>
								<td><strong>{character.name}</strong></td>
								<td>{character.vocation}</td>
								<td class="pixel">{character.level}</td>
								<td>{character.online ? 'Online' : 'Offline'}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			{:else}
				<p>This account has no characters yet.</p>
			{/if}
			<p class="play"><a class="button big" href="/play/">Play now</a></p>
		</div>
	</section>
</main>

<style>
	.page {
		width: 100%;
		padding-top: 40px;
		padding-bottom: 64px;
	}

	.summary {
		margin: 0 0 16px;
	}

	.link {
		background: none;
		border: 0;
		padding: 0;
		font: inherit;
		font-size: 15px;
		color: var(--hero-soft);
		text-decoration: underline;
		cursor: pointer;
	}

	.play {
		margin: 24px 0 0;
	}

	.table {
		display: block;
		overflow-x: auto;
	}
</style>
