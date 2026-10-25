<script lang="ts">
	let { data, form } = $props();
	let sex = $state<'male' | 'female'>('male');
	$effect.pre(() => {
		if (form?.sex) sex = form.sex;
	});
</script>

<svelte:head>
	<title>New character · {data.serverName}</title>
</svelte:head>

<section class="card" aria-labelledby="nc-h">
	<div class="card-head"><h1 id="nc-h">New character</h1></div>
	{#if data.full}
		<div class="card-body"><p>This account already has {data.max} characters, the most it can have.</p></div>
	{:else}
		<form class="body" method="POST">
			<div class="outfit">
				<img src="/outfit/{sex === 'female' ? 136 : 128}-78-69-58-76.png" alt="" width="64" height="64" />
			</div>
			<div class="form fields">
				{#if form?.error}<p class="notice error" role="alert">{form.error}</p>{/if}
				<label class="field"
					>Character name
					<input name="character" required minlength="3" maxlength="20" autocomplete="off" value={form?.name ?? ''} />
					<span class="hint">3–20 letters, up to three words, each starting with a capital letter.</span>
				</label>
				<fieldset>
					<legend>Sex</legend>
					<label class="check"><input type="radio" name="sex" value="male" bind:group={sex} />Male</label>
					<label class="check"><input type="radio" name="sex" value="female" bind:group={sex} />Female</label>
				</fieldset>
				<p class="hint">The character starts on Rookgaard at level 1.</p>
				<div><button class="button" type="submit">Create character</button></div>
			</div>
		</form>
	{/if}
</section>

<style>
	.body {
		padding: 24px;
		display: flex;
		flex-wrap: wrap;
		gap: 24px;
		align-items: flex-start;
	}

	.outfit {
		flex: 0 0 128px;
		height: 128px;
		background: var(--paper-rule);
		border: 2px solid var(--paper-muted);
		border-radius: 3px;
		overflow: hidden;
	}

	.outfit img {
		width: 128px;
		height: 128px;
		object-fit: contain;
		padding: 8px;
		image-rendering: pixelated;
	}

	.fields {
		flex: 1 1 320px;
	}

	fieldset {
		border: 0;
		margin: 0;
		padding: 0;
		display: flex;
		gap: 24px;
	}

	legend {
		font-weight: 700;
		font-size: 15px;
	}

	.hint {
		margin: 0;
		font-size: 14px;
		color: var(--paper-muted);
		font-weight: 400;
	}
</style>
