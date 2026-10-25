<script lang="ts">
	let { size = 40 }: { size?: number } = $props();
</script>

<!-- Pixel shield from the design, in the scheme's colours -->
<svg width={size} height={size * 1.1} viewBox="0 0 10 11" shape-rendering="crispEdges" aria-hidden="true">
	<rect x="1" y="0" width="8" height="1" fill="var(--accent)" />
	<rect x="0" y="1" width="10" height="6" fill="var(--accent)" />
	<rect x="1" y="7" width="8" height="2" fill="var(--accent)" />
	<rect x="3" y="9" width="4" height="1" fill="var(--accent)" />
	<rect x="4" y="10" width="2" height="1" fill="var(--accent)" />
	<rect x="1" y="1" width="8" height="6" fill="var(--danger)" />
	<rect x="2" y="7" width="6" height="1" fill="var(--danger)" />
	<rect x="3" y="8" width="4" height="1" fill="var(--danger)" />
	<rect x="4" y="2" width="2" height="6" fill="var(--paper)" />
	<rect x="2" y="4" width="6" height="1" fill="var(--paper)" />
</svg>
