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
		{:else if form?.mailed}
			<div class="card-body">
				<p class="notice" role="status">If the account name and email match, a link to set a new password is on its way. It works for an hour.</p>
			</div>
		{:else}
			<div class="card-body stack">
				{#if form?.error}<p class="notice error" role="alert">{form.error}</p>{/if}
				{#if data.mail}
					<form class="form" method="POST" action="?/email">
						<h2>By email</h2>
						<p>We send a link to set a new password to the account's email address.</p>
						<label class="field">Account name <input name="account" autocomplete="username" required value={form?.account ?? ''} /></label>
						<label class="field">Email <input name="email" type="email" autocomplete="email" required /></label>
						{#if data.turnstileSiteKey}<Turnstile siteKey={data.turnstileSiteKey} />{/if}
						<div><button class="button" type="submit">Email me a link</button></div>
					</form>
				{/if}
				<form class="form" method="POST" action="?/key">
					<h2>With your recovery key</h2>
					<p>Set a new password with your account name and the recovery key you created on your account page.</p>
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
				</form>
				<p class="hint">
					Neither works? Ask a gamemaster in the game or through the <a href="/support">support page</a>; they will need to check that the
					account is yours.
				</p>
			</div>
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

	.stack {
		display: flex;
		flex-direction: column;
		gap: 28px;
	}

	h2 {
		font-size: 22px;
	}

	.hint {
		font-size: 14px;
		color: var(--paper-muted);
	}
</style>
