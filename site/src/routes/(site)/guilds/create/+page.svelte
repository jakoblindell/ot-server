<script lang="ts">
	let { data, form } = $props();
	const usable = $derived(data.characters.filter((character) => character.usable));
</script>

<svelte:head>
	<title>Found a guild · {data.serverName}</title>
</svelte:head>

<main class="wrap page">
	<nav class="crumbs" aria-label="Breadcrumbs"><a href="/guilds">Guilds</a> › <span>Found a guild</span></nav>
	<section class="card">
		<div class="card-head"><h1>Found a guild</h1></div>
		<form class="form card-body" method="POST">
			<p>The leader needs level {data.minLevel} and may not be in another guild. Members join by invitation.</p>
			{#if form?.error}<p class="notice error" role="alert">{form.error}</p>{/if}
			{#if usable.length}
				<label class="field"
					>Guild name <input name="name" required minlength="3" maxlength="30" value={form?.name ?? ''} autocomplete="off" />
					<span class="hint">Letters, spaces, apostrophes and hyphens.</span></label
				>
				<label class="field"
					>Leader
					<select name="leader">
						{#each usable as character (character.id)}<option value={character.id}>{character.name} (level {character.level})</option>{/each}
					</select>
				</label>
				<div><button class="button" type="submit">Found the guild</button></div>
			{:else}
				<p class="notice">None of your characters can lead a guild yet.</p>
			{/if}
			{#if data.characters.some((character) => !character.usable)}
				<p class="hint">Not available: {data.characters.filter((character) => !character.usable).map((character) => `${character.name} (${character.why})`).join(', ')}</p>
			{/if}
		</form>
	</section>
</main>

<style>
	.page {
		width: 100%;
		max-width: 640px;
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

	p {
		margin: 0;
	}

	.hint {
		font-size: 14px;
		color: var(--paper-muted);
	}
</style>
