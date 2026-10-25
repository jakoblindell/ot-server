<script lang="ts">
	// Cloudflare Turnstile widget: adds "cf-turnstile-response" to the form
	let { siteKey }: { siteKey: string } = $props();
</script>

<svelte:head>
	<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
</svelte:head>

<div class="cf-turnstile" data-sitekey={siteKey} data-theme="light"></div>
