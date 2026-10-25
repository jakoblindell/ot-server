<script lang="ts">
	let { data } = $props();

	const link = (changes: Record<string, string | number>) => {
		const params = new URLSearchParams({ category: data.category, vocation: data.vocation, page: String(data.page) });
		for (const [key, value] of Object.entries(changes)) params.set(key, String(value));
		if (!('page' in changes)) params.delete('page');
		return `?${params}`;
	};
	const experience = $derived(data.category === 'experience');
</script>

<svelte:head>
	<title>Highscores · {data.serverName}</title>
</svelte:head>

<main class="wrap columns">
	<aside class="filters">
		<nav class="panel" aria-label="Highscore lists">
			<h2>Highscores</h2>
			{#each data.categories as category (category.id)}
				<a href={link({ category: category.id })} aria-current={category.id === data.category ? 'page' : undefined}>{category.label}</a>
			{/each}
		</nav>
	</aside>

	<section class="card main" aria-labelledby="hs-h">
		<div class="card-head">
			<h1 id="hs-h">{data.categoryLabel}</h1>
			<form method="GET" class="vocation">
				<input type="hidden" name="category" value={data.category} />
				<label for="voc" class="visually-hidden">Vocation</label>
				<select id="voc" name="vocation" value={data.vocation} onchange={(event) => event.currentTarget.form?.requestSubmit()}>
					{#each data.vocations as vocation (vocation.id)}<option value={vocation.id}>{vocation.label}</option>{/each}
				</select>
				<noscript><button type="submit">Show</button></noscript>
			</form>
		</div>
		<div class="scroll">
			<table class="table">
				<thead>
					<tr>
						<th>Rank</th><th>Name</th><th>Vocation</th><th class="num">{experience ? 'Level' : 'Skill'}</th>
						{#if experience}<th class="num">Experience</th>{:else}<th class="num">Level</th>{/if}
					</tr>
				</thead>
				<tbody>
					{#each data.rows as row (row.rank)}
						<tr>
							<td class="pixel">{row.rank}</td>
							<td><a href="/characters/{encodeURIComponent(row.name)}">{row.name}</a></td>
							<td><span class="badge pixel" style:background={row.badge.color}>{row.badge.short}</span> {row.vocation}</td>
							<td class="num pixel">{row.value}</td>
							<td class="num pixel">{experience ? row.points.toLocaleString('en-GB') : row.level}</td>
						</tr>
					{:else}
						<tr><td colspan="5">Nobody here yet.</td></tr>
					{/each}
				</tbody>
			</table>
		</div>
		<nav class="pager" aria-label="Pages">
			{#if data.page > 1}<a href={link({ page: data.page - 1 })}>‹ Previous</a>{:else}<span></span>{/if}
			<span class="pixel">Page {data.page} of {data.pages}</span>
			{#if data.page < data.pages}<a href={link({ page: data.page + 1 })}>Next ›</a>{:else}<span></span>{/if}
		</nav>
	</section>
</main>

<style>
	.columns {
		width: 100%;
		padding-top: 32px;
		padding-bottom: 72px;
		display: flex;
		flex-wrap: wrap;
		gap: 28px;
		align-items: flex-start;
	}

	.filters {
		flex: 1 1 240px;
	}

	.filters .panel {
		display: flex;
		flex-direction: column;
		padding: 16px 8px;
	}

	.filters h2 {
		font-size: 24px;
		padding: 0 12px 8px;
	}

	.filters a {
		display: flex;
		align-items: center;
		min-height: 44px;
		padding: 0 14px;
		border-radius: 4px;
		color: var(--text-soft);
		text-decoration: none;
	}

	.filters a[aria-current='page'] {
		background: var(--head);
		color: var(--head-text);
		font-weight: 700;
	}

	.main {
		flex: 999 1 560px;
		min-width: 0;
	}

	.vocation select {
		min-height: 38px;
		border-radius: 4px;
		border: 1px solid var(--head-edge);
		background: var(--input-bg);
		color: var(--paper-text);
		font: inherit;
		padding: 0 8px;
	}

	.scroll {
		overflow-x: auto;
		padding: 8px 12px 0;
	}

	.table {
		min-width: 520px;
	}

	.table a {
		color: var(--paper-text);
		font-weight: 700;
	}

	.num {
		text-align: right;
	}

	.badge {
		font-size: 12px;
		color: #f6ecd4;
		padding: 2px 6px;
		border-radius: 3px;
	}

	.pager {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 14px 24px 20px;
		color: var(--paper-muted);
	}

	@media (max-width: 700px) {
		.filters .panel {
			flex-direction: row;
			overflow-x: auto;
			padding: 8px;
		}

		.filters h2 {
			display: none;
		}

		.filters a {
			white-space: nowrap;
		}
	}
</style>
