<script lang="ts">
	// A rough strength meter: length and kinds of characters
	let { password }: { password: string } = $props();

	const score = $derived.by(() => {
		if (!password) return 0;
		let points = 0;
		if (password.length >= 8) points++;
		if (password.length >= 12) points++;
		if (/[a-z]/.test(password) && /[A-Z]/.test(password)) points++;
		if (/\d/.test(password)) points++;
		if (/[^A-Za-z0-9]/.test(password)) points++;
		return password.length < 8 ? Math.min(points, 1) : points;
	});
	const labels = ['', 'Too weak', 'Weak', 'Decent', 'Good', 'Strong'];
</script>

<span class="meter" aria-live="polite">
	{#each [1, 2, 3, 4, 5] as step (step)}
		<span class="bar" class:on={score >= step} class:low={score <= 2}></span>
	{/each}
	<span class="label">{labels[score]}</span>
</span>

<style>
	.meter {
		display: flex;
		align-items: center;
		gap: 4px;
		min-height: 20px;
		font-weight: 400;
		font-size: 14px;
		color: var(--paper-muted);
	}

	.bar {
		width: 28px;
		height: 6px;
		border-radius: 2px;
		background: var(--paper-rule);
	}

	.bar.on {
		background: var(--head);
	}

	.bar.on.low {
		background: var(--danger);
	}

	.label {
		margin-left: 8px;
	}
</style>
