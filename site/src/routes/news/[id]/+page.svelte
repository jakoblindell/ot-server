<script lang="ts">
	import Prose from '$lib/components/Prose.svelte';

	let { data } = $props();
	const day = (time: number) => new Date(time).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
</script>

<svelte:head>
	<title>{data.article.title} · {data.serverName}</title>
</svelte:head>

<main class="wrap page">
	<nav class="crumbs" aria-label="Breadcrumbs"><a href="/">News</a> › <span>{day(data.article.publishedAt)}</span></nav>
	<article class="card">
		<div class="card-head"><h1>{data.article.title}</h1></div>
		<div class="card-body prose">
			<p class="meta pixel">{day(data.article.publishedAt)}</p>
			<Prose body={data.article.body} />
			{#if data.article.author}<p class="author">— {data.article.author}</p>{/if}
		</div>
	</article>
	<nav class="pager" aria-label="More news">
		{#if data.olderId}<a href="/news/{data.olderId}">‹ Older</a>{:else}<span></span>{/if}
		{#if data.newerId}<a href="/news/{data.newerId}">Newer ›</a>{/if}
	</nav>
</main>

<style>
	.page {
		width: 100%;
		max-width: 900px;
		padding-top: 28px;
		padding-bottom: 72px;
	}

	.crumbs {
		color: var(--text-muted);
		margin-bottom: 16px;
	}

	.crumbs a {
		color: var(--text-soft);
	}

	.meta {
		color: var(--paper-muted);
		margin-top: 0;
	}

	.prose :global(p) {
		margin: 0 0 14px;
	}

	.author {
		font-style: italic;
		color: var(--paper-muted);
	}

	.pager {
		display: flex;
		justify-content: space-between;
		margin-top: 20px;
	}

	.pager a {
		color: var(--accent);
	}
</style>
