<script lang="ts">
	import { scrollRow } from '$lib/scrollrow';

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
			<div class="tabs scroll-row" data-scroll-x use:scrollRow={data.category}>
				{#each data.categories as category (category.id)}
					<a href={link({ category: category.id })} aria-current={category.id === data.category ? 'page' : undefined}>{category.label}</a>
				{/each}
			</div>
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
			<table class="table stack">
				<thead>
					<tr>
						<th class="rank">Rank</th><th class="main">Name</th><th class="more">Vocation</th><th class="num end">{experience ? 'Level' : 'Skill'}</th>
						{#if experience}<th class="num more">Experience</th>{:else}<th class="num more">Level</th>{/if}
					</tr>
				</thead>
				<tbody>
					{#each data.rows as row (row.rank)}
						<tr>
							<td class="pixel rank">{row.rank}</td>
							<td class="main"><a href="/characters/{encodeURIComponent(row.name)}">{row.name}</a></td>
							<td class="more"><span class="badge pixel" style:background={row.badge.color}>{row.badge.short}</span> {row.vocation}</td>
							<td class="num pixel end">{row.value}</td>
							<td class="num pixel more" data-label={experience ? 'Experience' : 'Level'}>{experience ? row.points.toLocaleString('en-GB') : row.level}</td>
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
		min-width: 0;
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

	.tabs {
		flex-direction: column;
		gap: 0;
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

	@media (min-width: 601px) {
		.table {
			min-width: 520px;
		}
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

	/* The card head's title and vocation list stack when there is no room */
	.card-head {
		flex-wrap: wrap;
	}

	.vocation {
		margin-left: auto;
	}

	@media (max-width: 600px) {
		.rank {
			flex: 0 0 44px;
			overflow-wrap: normal;
		}

		.scroll {
			padding: 4px 16px 0;
		}
	}

	/* Phones: the lists as one row of tabs that scrolls sideways */
	@media (max-width: 700px) {
		.filters .panel {
			padding: 8px;
		}

		.filters h2 {
			display: none;
		}

		.tabs {
			flex-direction: row;
			gap: 4px;
		}
	}
</style>
