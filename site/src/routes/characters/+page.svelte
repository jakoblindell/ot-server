<script lang="ts">
	import CharacterSearch from './CharacterSearch.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Characters · {data.serverName}</title>
</svelte:head>

<main class="wrap page">
	<CharacterSearch name={data.name} />
	{#if data.name}
		<section class="card">
			<div class="card-head"><h2>Characters starting with “{data.name}”</h2></div>
			<div class="card-body">
				{#if data.matches.length}
					<ul class="matches">
						{#each data.matches as match (match.name)}
							<li><a href="/characters/{encodeURIComponent(match.name)}">{match.name}</a> <span class="pixel">level {match.level}</span></li>
						{/each}
					</ul>
				{:else}
					<p>No character has that name.</p>
				{/if}
			</div>
		</section>
	{/if}
</main>

<style>
	.page {
		width: 100%;
		max-width: 900px;
		padding-top: 32px;
		padding-bottom: 72px;
		display: flex;
		flex-direction: column;
		gap: 28px;
	}

	.matches {
		margin: 0;
		padding-left: 20px;
	}

	.matches li {
		padding: 4px 0;
	}

	.matches a {
		color: var(--paper-text);
		font-weight: 700;
	}

	p {
		margin: 0;
	}
</style>
