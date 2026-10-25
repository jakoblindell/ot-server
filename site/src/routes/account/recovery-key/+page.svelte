<script lang="ts">
	let { data, form } = $props();
</script>

<svelte:head>
	<title>Recovery key · {data.serverName}</title>
</svelte:head>

<section class="card" aria-labelledby="rk-h">
	<div class="card-head"><h1 id="rk-h">Recovery key</h1></div>
	<div class="card-body body">
		{#if form?.key}
			<p class="notice" role="status">Write this key down and keep it somewhere safe. It is shown only now.</p>
			<p class="key pixel">{form.key}</p>
			<p>
				With your account name and this key you can set a new password on the
				<a href="/lost-account">lost account</a> page, even without your password or email.
			</p>
		{:else}
			<p>
				A recovery key lets you set a new password if you forget yours. Keep it offline, for example on paper; anyone with
				your account name and the key can take over the account.
			</p>
			{#if data.created}
				<p>
					This account has a key since {new Date(data.created).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}.
					A new key replaces it.
				</p>
			{/if}
			<form class="form narrow" method="POST">
				{#if form?.error}<p class="notice error" role="alert">{form.error}</p>{/if}
				<label class="field">Password <input name="current" type="password" autocomplete="current-password" required /></label>
				<div><button class="button" type="submit">{data.created ? 'Create a new key' : 'Create a key'}</button></div>
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

	.narrow {
		max-width: 520px;
	}

	.key {
		font-size: 26px;
		letter-spacing: 0.08em;
		background: var(--input-bg);
		border: 2px dashed var(--paper-muted);
		border-radius: 4px;
		padding: 16px;
		text-align: center;
		overflow-wrap: anywhere;
	}
</style>
