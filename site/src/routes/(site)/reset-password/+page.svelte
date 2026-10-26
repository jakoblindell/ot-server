<script lang="ts">
	let { data, form } = $props();
</script>

<svelte:head>
	<title>New password · {data.serverName}</title>
</svelte:head>

<main class="wrap page">
	<section class="card">
		<div class="card-head"><h1>Set a new password</h1></div>
		<div class="card-body">
			{#if form?.done}
				<p class="notice" role="status">Your new password is set. <a href="/login">Log in</a> with it.</p>
			{:else if !data.valid}
				<p class="notice error">This link is not valid any more. <a href="/lost-account">Ask for a new one</a>.</p>
			{:else}
				<form class="form" method="POST">
					{#if form?.error}<p class="notice error" role="alert">{form.error}</p>{/if}
					<label class="field">New password <input name="password" type="password" autocomplete="new-password" required minlength="8" maxlength="40" /></label>
					<label class="field">Repeat new password <input name="password2" type="password" autocomplete="new-password" required /></label>
					<div><button class="button">Set the new password</button></div>
				</form>
			{/if}
		</div>
	</section>
</main>

<style>
	.page {
		width: 100%;
		max-width: 560px;
		padding-top: 56px;
		padding-bottom: 72px;
	}

	p {
		margin: 0;
	}
</style>
