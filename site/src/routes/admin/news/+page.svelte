<script lang="ts">
	let { data, form } = $props();
	const when = (at: number) => new Date(at).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
	const e = $derived(data.editing);
</script>

<svelte:head>
	<title>News · Admin · {data.serverName}</title>
</svelte:head>

<div class="page-head">
	<div>
		<h1>News posts</h1>
		<p>Articles show on the home page; ticker lines are the short one-liners above them.</p>
	</div>
</div>

{#if form?.message}<p class="flash" role="status">{form.message}</p>{/if}
{#if form?.error}<p class="flash error" role="alert">{form.error}</p>{/if}

<section class="panel">
	<div class="panel-head"><h2>{e ? `Edit “${e.title}”` : 'New post'}</h2>{#if e}<a href="/admin/news">New post instead</a>{/if}</div>
	<form class="panel-body editor" method="POST" action="?/save">
		{#key e?.id}
			<input type="hidden" name="id" value={e?.id ?? ''} />
			<div class="row">
				<label class="stack"
					>Kind
					<select name="kind" value={e?.kind ?? 'article'}>
						<option value="article">Article</option>
						<option value="ticker">Ticker line</option>
					</select>
				</label>
				<label class="stack grow">Title (the whole text for a ticker line) <input name="title" maxlength="120" value={e?.title ?? ''} /></label>
				<label class="stack">Signed <input name="author" maxlength="64" value={e?.author ?? ''} placeholder={data.staff.name} /></label>
			</div>
			<label class="stack"
				>Text
				<textarea name="body" rows="10">{e?.body ?? ''}</textarea>
				<span>Plain text. A blank line starts a new paragraph; lines starting with "- " become a list.</span>
			</label>
			<div class="row">
				<label class="stack"
					>Publish
					<select name="publish">
						{#if e?.published_at}<option value="keep">Keep the date ({when(e.published_at)})</option>{/if}
						<option value="now">Now</option>
						<option value="draft">As draft (not shown)</option>
					</select>
				</label>
				<button class="btn primary" type="submit">{e ? 'Save changes' : 'Publish'}</button>
			</div>
		{/key}
	</form>
</section>

<section class="panel">
	<div class="panel-head"><h2>All posts</h2></div>
	<div class="scroll">
		<table>
			<thead><tr><th>Kind</th><th>Title</th><th>Signed</th><th>Published</th><th></th></tr></thead>
			<tbody>
				{#each data.posts as post (post.id)}
					<tr>
						<td><span class="pill">{post.kind}</span></td>
						<td>{#if post.kind === 'article' && post.published_at}<a href="/news/{post.id}">{post.title}</a>{:else}{post.title}{/if}</td>
						<td>{post.author}</td>
						<td class="mono">{post.published_at ? when(post.published_at) : 'draft'}</td>
						<td class="actions">
							<a class="btn" href="?edit={post.id}">Edit</a>
							<form
								method="POST"
								action="?/delete"
								onsubmit={(event) => {
									if (!confirm(`Delete “${post.title}”?`)) event.preventDefault();
								}}
							>
								<input type="hidden" name="id" value={post.id} /><button class="btn danger">Delete</button>
							</form>
						</td>
					</tr>
				{:else}
					<tr><td colspan="5" class="muted">No posts yet.</td></tr>
				{/each}
			</tbody>
		</table>
	</div>
</section>

<style>
	.editor {
		display: flex;
		flex-direction: column;
		gap: 14px;
	}

	.grow {
		flex: 1 1 300px;
	}

	.grow input {
		width: 100%;
	}

	.actions {
		display: flex;
		gap: 6px;
	}
</style>
