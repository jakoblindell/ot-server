<script lang="ts">
	import PasswordStrength from '$lib/components/PasswordStrength.svelte';

	let { data, form } = $props();
	let password = $state('');
</script>

<svelte:head>
	<title>Change password · {data.serverName}</title>
</svelte:head>

<section class="card" aria-labelledby="pw-h">
	<div class="card-head"><h1 id="pw-h">Change password</h1></div>
	<form class="form card-body narrow" method="POST">
		{#if form?.error}<p class="notice error" role="alert">{form.error}</p>{/if}
		{#if form?.done}<p class="notice" role="status">Your password was changed. Other browsers were logged out.</p>{/if}
		<label class="field">Current password <input name="current" type="password" autocomplete="current-password" required /></label>
		<label class="field"
			>New password
			<input name="password" type="password" autocomplete="new-password" required minlength="8" maxlength="40" bind:value={password} />
			<PasswordStrength {password} />
		</label>
		<label class="field">Repeat new password <input name="password2" type="password" autocomplete="new-password" required /></label>
		<div><button class="button" type="submit">Change password</button></div>
	</form>
</section>

<style>
	.narrow {
		max-width: 520px;
	}
</style>
