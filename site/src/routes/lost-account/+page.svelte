<script lang="ts">
	import Turnstile from '$lib/components/Turnstile.svelte';

	let { data, form } = $props();
</script>

<svelte:head>
	<title>Lost account · {data.serverName}</title>
</svelte:head>

<main class="wrap page">
	<section class="card" aria-labelledby="lost-h">
		<div class="card-head"><h1 id="lost-h">Lost your account?</h1></div>
		{#if form?.done}
			<div class="card-body">
				<p class="notice" role="status">Your new password is set. <a href="/login">Log in</a> with it.</p>
			</div>
		{:else}
			<form class="form card-body" method="POST">
				<p>Set a new password with your account name and the recovery key you created on your account page.</p>
				{#if form?.error}<p class="notice error" role="alert">{form.error}</p>{/if}
				<label class="field">Account name <input name="account" autocomplete="username" required value={form?.account ?? ''} /></label>
				<label class="field"
					>Recovery key <input name="key" autocomplete="off" required placeholder="XXXX-XXXX-XXXX-XXXX-XXXX" /></label
				>
				<label class="field"
					>New password <input name="password" type="password" autocomplete="new-password" required minlength="8" maxlength="40" /></label
				>
				<label class="field">Repeat new password <input name="password2" type="password" autocomplete="new-password" required /></label>
				{#if data.turnstileSiteKey}<Turnstile siteKey={data.turnstileSiteKey} />{/if}
				<div><button class="button" type="submit">Set new password</button></div>
				<p class="hint">
					No recovery key? Ask a gamemaster in the game or on Discord; they will need to check that the account is yours.
				</p>
			</form>
		{/if}
	</section>
</main>

<style>
	.page {
		width: 100%;
		max-width: 640px;
		padding-top: 40px;
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
