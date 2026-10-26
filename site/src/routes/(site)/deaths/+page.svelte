<script lang="ts">
	let { data } = $props();
	const when = (time: number) => new Date(time).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
</script>

<svelte:head>
	<title>Latest deaths · {data.serverName}</title>
</svelte:head>

<main class="wrap page">
	<section class="card">
		<div class="card-head"><h1>Latest deaths</h1></div>
		<div class="card-body">
			<ul class="deaths">
				{#each data.deaths as death, index (index)}
					<li>
						<span class="pixel when">{when(death.at)}</span>
						<span>
							<span class="badge pixel" style:background={death.badge.color}>{death.badge.short}</span>
							<a href="/characters/{encodeURIComponent(death.name)}">{death.name}</a> died at level {death.level} by
							{#if death.killer.player}<a href="/characters/{encodeURIComponent(death.killer.name)}">{death.killer.name}</a>{:else}{death.killer.name}{/if}{#if death.assist}{' and '}{#if death.assist.player}<a
										href="/characters/{encodeURIComponent(death.assist.name)}">{death.assist.name}</a
									>{:else}{death.assist.name}{/if}{/if}.
							{#if death.murder}<span class="murder">Unjustified</span>{/if}
						</span>
					</li>
				{:else}
					<li>Nobody has died yet.</li>
				{/each}
			</ul>
		</div>
	</section>
</main>

<style>
	.page {
		width: 100%;
		max-width: 1000px;
		padding-top: 28px;
		padding-bottom: 72px;
	}

	.deaths {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.deaths li {
		display: flex;
		flex-wrap: wrap;
		gap: 4px 16px;
		padding: 9px 0;
		border-bottom: 1px dashed var(--paper-rule);
	}

	.when {
		font-size: 14px;
		color: var(--paper-muted);
		min-width: 130px;
	}

	.deaths a {
		color: var(--paper-text);
		font-weight: 700;
	}

	.badge {
		font-size: 12px;
		color: #f6ecd4;
		padding: 2px 6px;
		border-radius: 3px;
	}

	.murder {
		font-size: 13px;
		color: var(--danger);
		font-weight: 700;
		margin-left: 6px;
	}
</style>
