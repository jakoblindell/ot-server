<script lang="ts">
	let { data, form } = $props();
</script>

<svelte:head>
	<title>Two-step login · {data.serverName}</title>
</svelte:head>

<section class="card" aria-labelledby="ts-h">
	<div class="card-head"><h1 id="ts-h">Two-step login</h1></div>
	<div class="card-body body">
		{#if form?.message}<p class="notice" role="status">{form.message}</p>{/if}
		{#if form?.error}<p class="notice error" role="alert">{form.error}</p>{/if}
		{#if data.staffAsked && !data.enabled}
			<p class="notice">Staff accounts need two-step login for the admin pages. Turn it on below.</p>
		{/if}

		{#if data.enabled}
			<p>
				Two-step login is <strong>on</strong>: after your password the website asks for a code from your authenticator app.
				It does not affect logging in to the game.
			</p>
			<form class="form narrow" method="POST" action="?/disable">
				<h2>Turn it off</h2>
				<label class="field">Password <input name="password" type="password" autocomplete="current-password" required /></label>
				<label class="field">Code from the app <input name="code" inputmode="numeric" autocomplete="one-time-code" required /></label>
				<div><button class="button ghost" type="submit">Turn off two-step login</button></div>
			</form>
		{:else}
			<p>
				Protect your account with a second step: after your password, the website asks for a 6-digit code from an
				authenticator app on your phone (for example Google Authenticator, Microsoft Authenticator, Aegis or 2FAS).
			</p>
			<ol class="steps">
				<li>Open the app and add an account by scanning this code:</li>
			</ol>
			<div class="qr">{@html data.qr}</div>
			<p class="secret">Or enter this key by hand: <span class="pixel">{data.secret}</span></p>
			<form class="form narrow" method="POST" action="?/enable">
				<label class="field"
					>Then enter the code the app shows
					<input name="code" inputmode="numeric" autocomplete="one-time-code" maxlength="7" required />
				</label>
				<div><button class="button" type="submit">Turn on two-step login</button></div>
			</form>
		{/if}
	</div>
</section>

<style>
	.body {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.body p {
		margin: 0;
	}

	.body h2 {
		font-size: 22px;
	}

	.narrow {
		max-width: 420px;
	}

	.steps {
		margin: 0;
		padding-left: 20px;
	}

	.qr {
		width: 200px;
		height: 200px;
		background: var(--input-bg);
		border: 2px solid var(--paper-muted);
		border-radius: 4px;
		padding: 8px;
	}

	.qr :global(svg) {
		width: 100%;
		height: 100%;
	}

	.secret .pixel {
		font-size: 18px;
		letter-spacing: 0.05em;
		overflow-wrap: anywhere;
	}
</style>
