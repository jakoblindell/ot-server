<script lang="ts">
	let { data, form } = $props();
</script>

<svelte:head>
	<title>Two-step login · {data.serverName}</title>
</svelte:head>

<main class="wrap page">
	<section class="card" aria-labelledby="ts-h">
		<div class="card-head"><h1 id="ts-h">Two-step login</h1></div>
		<form class="form card-body" method="POST">
			<p>Enter the 6-digit code from your authenticator app.</p>
			{#if form?.error}<p class="notice error" role="alert">{form.error}</p>{/if}
			<label class="field"
				>Code
				<input name="code" inputmode="numeric" autocomplete="one-time-code" pattern="[0-9 ]*" maxlength="7" required />
			</label>
			<button class="button wide" type="submit">Log in</button>
			<p class="hint">Lost your phone? Ask the server owner to turn two-step login off for your account.</p>
		</form>
	</section>
</main>

<style>
	.page {
		width: 100%;
		max-width: 480px;
		padding-top: 56px;
		padding-bottom: 72px;
	}

	p {
		margin: 0;
	}

	.hint {
		font-size: 14px;
		color: var(--paper-muted);
	}
</style>
