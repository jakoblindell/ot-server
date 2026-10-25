<script lang="ts">
	let { data, form } = $props();
</script>

<svelte:head>
	<title>Change email · {data.serverName}</title>
</svelte:head>

<section class="card" aria-labelledby="em-h">
	<div class="card-head"><h1 id="em-h">Change email</h1></div>
	<form class="form card-body narrow" method="POST">
		{#if form?.error}<p class="notice error" role="alert">{form.error}</p>{/if}
		{#if form?.done}<p class="notice" role="status">Your email address was changed.</p>{/if}
		<p>Current address: <strong>{form?.done ? form.email : data.me.email || 'none'}</strong></p>
		<label class="field">New email <input name="email" type="email" autocomplete="email" required value={form?.email ?? ''} /></label>
		<label class="field">Password <input name="current" type="password" autocomplete="current-password" required /></label>
		<div><button class="button" type="submit">Change email</button></div>
	</form>
</section>

<style>
	.narrow {
		max-width: 520px;
	}

	p {
		margin: 0;
	}
</style>
