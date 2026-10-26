<script lang="ts">
	import Prose from '$lib/components/Prose.svelte';

	let { data, form } = $props();
	let reporting = $state<number | null>(null);
	const when = (time: number) => new Date(time).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
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
	<section class="card" aria-labelledby="comments-h" id="comments">
		<div class="card-head"><h2 id="comments-h">Comments</h2><span class="pixel count">{data.comments.length}</span></div>
		<div class="card-body">
			{#if form?.message}<p class="notice" role="status">{form.message}</p>{/if}
			{#if form?.error}<p class="notice error" role="alert">{form.error}</p>{/if}
			<ul class="comments">
				{#each data.comments as comment (comment.id)}
					<li class:staff={comment.staff} class:hidden={comment.hidden}>
						<div class="who">
							<a href="/characters/{encodeURIComponent(comment.name)}">{comment.name}</a>
							<span class="meta">{comment.meta}</span>
							{#if comment.staff}<span class="badge">Staff</span>{/if}
							<span class="meta when">{when(comment.at)}</span>
						</div>
						<p>{comment.text}</p>
						<div class="tools">
							{#if data.moderator}
								<form method="POST" action="?/hide">
									<input type="hidden" name="comment" value={comment.id} /><input type="hidden" name="show" value={comment.hidden ? '1' : '0'} />
									<button class="link">{comment.hidden ? 'Hidden · show again' : 'Hide'}</button>
								</form>
							{/if}
							{#if data.loggedIn && !comment.staff}
								<button class="link" type="button" onclick={() => (reporting = reporting === comment.id ? null : comment.id)}>Report</button>
							{/if}
						</div>
						{#if reporting === comment.id}
							<form method="POST" action="?/report" class="report">
								<input type="hidden" name="comment" value={comment.id} />
								<select name="reason" aria-label="Reason">{#each data.reasons as reason (reason)}<option>{reason}</option>{/each}</select>
								<input name="text" maxlength="500" placeholder="Anything staff should know (optional)" aria-label="Details" />
								<button class="button">Send report</button>
							</form>
						{/if}
					</li>
				{:else}
					<li class="empty">No comments yet.</li>
				{/each}
			</ul>

			{#if !data.loggedIn}
				<p class="hint"><a href="/login?next=/news/{data.article.id}">Log in</a> to comment.</p>
			{:else if data.characters.length}
				<form method="POST" action="?/comment" class="form write">
					<label class="field"
						>Post as
						<select name="character">{#each data.characters as character (character.id)}<option value={character.id}>{character.name}</option>{/each}</select>
					</label>
					<label class="field">Comment <textarea name="text" rows="4" maxlength="1000" required>{form?.text ?? ''}</textarea></label>
					<div><button class="button">Post comment</button></div>
				</form>
			{:else}
				<p class="hint">Characters need level {data.minLevel} to comment.</p>
			{/if}
		</div>
	</section>

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

	#comments {
		margin-top: 28px;
	}

	.count {
		color: var(--hero-soft);
	}

	.comments {
		list-style: none;
		margin: 0 0 20px;
		padding: 0;
	}

	.comments li {
		border-left: 3px solid var(--paper-rule);
		padding: 8px 14px;
		margin-bottom: 12px;
	}

	.comments li.staff {
		border-left-color: var(--accent);
		background: var(--input-bg);
	}

	.comments li.hidden {
		opacity: 0.5;
	}

	.comments p {
		margin: 4px 0;
		white-space: pre-line;
	}

	.who {
		display: flex;
		flex-wrap: wrap;
		gap: 4px 10px;
		align-items: baseline;
	}

	.who a {
		color: var(--paper-text);
		font-weight: 800;
	}

	.meta {
		font-size: 14px;
		color: var(--paper-muted);
	}

	.when {
		margin-left: auto;
	}

	.badge {
		font-size: 12px;
		background: var(--accent);
		color: var(--accent-text);
		padding: 1px 6px;
		border-radius: 3px;
		font-weight: 700;
	}

	.tools {
		display: flex;
		gap: 14px;
	}

	.link {
		background: none;
		border: 0;
		padding: 0;
		font: inherit;
		font-size: 14px;
		color: var(--paper-muted);
		text-decoration: underline;
		cursor: pointer;
	}

	.report {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin-top: 8px;
	}

	.report select,
	.report input {
		min-height: 40px;
		border: 2px solid var(--input-border);
		border-radius: 4px;
		background: var(--input-bg);
		font: inherit;
		padding: 0 8px;
	}

	.report input {
		flex: 1 1 200px;
	}

	.empty {
		border: 0 !important;
		padding-left: 0 !important;
	}

	.hint {
		margin: 0;
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
