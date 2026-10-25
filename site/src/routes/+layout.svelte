<script lang="ts">
	import '../app.css';
	import { themeCss } from '$lib/themes';

	let { children } = $props();
	const css = themeCss();
</script>

<svelte:head>
	{@html `<style>${css}</style>`}
</svelte:head>

{@render children()}
