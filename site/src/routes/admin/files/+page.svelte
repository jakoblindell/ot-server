<script lang="ts">
	let { data, form } = $props();

	let filter = $state('');
	let content = $state('');
	let gutter: HTMLElement | undefined = $state();
	$effect.pre(() => {
		content = form && 'content' in form && typeof form.content === 'string' ? form.content : data.available && data.file ? data.file.content : '';
	});
	const original = $derived(data.available && data.file ? data.file.content : '');
	const dirty = $derived(content !== original);
	const lineCount = $derived(content.split('\n').length);
	const shown = $derived(
		data.available ? data.files.filter((file) => !filter || file.path.toLowerCase().includes(filter.toLowerCase())).slice(0, 400) : []
	);
	const language = (file: string) => (file.endsWith('.lua') ? 'Lua' : file.endsWith('.xml') ? 'XML' : 'Text');
	const when = (at: number) => new Date(at).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
	const fileLink = (file: string) => `?file=${encodeURIComponent(file)}`;
	// Form actions keep the open file in the address
	const action = (name: string) => `${fileLink(data.available ? data.selected : '')}&/${name}`;
</script>

<svelte:head>
	<title>Server files · Admin · {data.serverName}</title>
</svelte:head>

<div class="page-head">
	<div>
		<h1>Server files</h1>
		<p>
			Edits are versioned and go live at the next server save. Files the server can reload can go live at once. See
			<a href="/admin/changes">Pending changes</a>.
		</p>
	</div>
	{#if data.available}
		<form method="POST" action="?/create" class="row">
			<label class="stack">New file <input name="path" placeholder="data/talkactions/scripts/hello.lua" /></label>
			<button class="btn">Create</button>
		</form>
	{/if}
</div>

{#if form?.message}<p class="flash" role="status">{form.message}</p>{/if}
{#if form?.error}<p class="flash error" role="alert">{form.error}</p>{/if}

{#if !data.available}
	<p class="flash error">The game files are not set up yet: the server creates them on its first start (deploy/game-files.sh).</p>
{:else}
	<div class="split">
		<section class="panel tree">
			<div class="panel-head"><input type="search" placeholder="Filter files…" bind:value={filter} aria-label="Filter files" /></div>
			<ul>
				{#each shown as file (file.path)}
					<li>
						<a href={fileLink(file.path)} aria-current={file.path === data.selected ? 'true' : undefined} class:dim={!file.editable}>
							{file.path}
						</a>
						{#if file.pending}<span class="pill warn">pending</span>{/if}
					</li>
				{/each}
			</ul>
			{#if shown.length === 400}<p class="muted more">Showing 400; filter to find more.</p>{/if}
		</section>

		<section class="panel editor">
			<div class="panel-head">
				<div>
					<h2 class="mono">{data.selected}</h2>
					<span class="muted small">
						{language(data.selected)} · Latin-1 · LF
						{#if data.pending}· <span class="pill warn">changed, not live yet</span>{/if}
						{#if dirty}· <span class="pill">unsaved</span>{/if}
					</span>
				</div>
				{#if data.pending}
					<form method="POST" action={action('revert')}>
						<input type="hidden" name="file" value={data.selected} />
						<button class="btn">Revert to live</button>
					</form>
				{/if}
			</div>
			{#if !data.file}
				<div class="panel-body muted">No such file.</div>
			{:else if data.file.tooBig || !data.file.editable}
				<div class="panel-body muted">This file cannot be edited here.</div>
			{:else}
				<form method="POST" action={action('save')} class="edit">
					<input type="hidden" name="file" value={data.selected} />
					<div class="code">
						<div class="gutter mono" bind:this={gutter} aria-hidden="true">
							{#each { length: lineCount } as _, index (index)}<div>{index + 1}</div>{/each}
						</div>
						<textarea
							name="content"
							class="mono"
							spellcheck="false"
							bind:value={content}
							onscroll={(event) => gutter && (gutter.scrollTop = event.currentTarget.scrollTop)}
							aria-label="File content"
						></textarea>
					</div>
					<div class="row bar">
						<label class="stack grow">What changed (for the history) <input name="message" maxlength="200" /></label>
						{#if data.reload}
							<label class="check"><input type="checkbox" name="reload" /> Apply now (reload {data.reload})</label>
							{#if data.reload === 'monsters'}<span class="muted small">Creatures already on the map keep their old values until they respawn.</span>{/if}
						{:else}
							<span class="muted small">Goes live at the next server save (needs a restart).</span>
						{/if}
						<button class="btn primary" type="submit" disabled={!dirty}>Save</button>
					</div>
				</form>
			{/if}
		</section>

		<section class="panel history">
			<div class="panel-head"><h2>History</h2></div>
			<ul>
				{#each data.history as entry (entry.hash)}
					<li>
						<div>{entry.subject}</div>
						<div class="muted small">{entry.by} · {when(entry.at)} · <span class="mono">{entry.hash}</span></div>
						<div class="row">
							<a class="btn small-btn" href="{fileLink(data.selected)}&diff={entry.hash}">View diff</a>
							<form method="POST" action={action('restore')}>
								<input type="hidden" name="file" value={data.selected} /><input type="hidden" name="hash" value={entry.hash} />
								<button class="btn small-btn">Restore</button>
							</form>
						</div>
					</li>
				{:else}
					<li class="muted">No history.</li>
				{/each}
			</ul>
		</section>
	</div>

	{#if data.diff}
		<section class="panel">
			<div class="panel-head"><h2>Change <span class="mono">{data.diff.hash}</span></h2><a href={fileLink(data.selected)}>Close</a></div>
			<pre class="diff mono">{#each data.diff.text.split('\n') as line, index (index)}<span
						class:add={line.startsWith('+') && !line.startsWith('+++')}
						class:del={line.startsWith('-') && !line.startsWith('---')}>{line}{'\n'}</span
					>{/each}</pre>
		</section>
	{/if}
{/if}

<style>
	.split {
		display: grid;
		grid-template-columns: minmax(220px, 300px) minmax(0, 1fr) minmax(220px, 280px);
		gap: 16px;
		align-items: start;
	}

	@media (max-width: 1200px) {
		.split {
			grid-template-columns: minmax(0, 1fr);
		}
	}

	.tree ul,
	.history ul {
		list-style: none;
		margin: 0;
		padding: 6px;
		max-height: 70vh;
		overflow: auto;
	}

	.tree input {
		width: 100%;
	}

	.tree li {
		display: flex;
		align-items: center;
		gap: 6px;
	}

	.tree a {
		display: block;
		flex: 1;
		min-width: 0;
		padding: 4px 8px;
		border-radius: 4px;
		font-family: 'IBM Plex Mono', monospace;
		font-size: 13px;
		color: var(--a-soft);
		text-decoration: none;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.tree a[aria-current] {
		background: var(--a-hover);
		color: #fff;
	}

	.tree a.dim {
		color: var(--a-faint);
	}

	.more {
		margin: 0;
		padding: 0 12px 12px;
		font-size: 13px;
	}

	.editor h2 {
		font-size: 15px;
		overflow-wrap: anywhere;
	}

	.small {
		font-size: 13px;
	}

	.code {
		display: flex;
		height: 62vh;
		border-bottom: 1px solid var(--a-line);
	}

	.gutter {
		overflow: hidden;
		padding: 10px 8px;
		text-align: right;
		color: var(--a-faint);
		font-size: 13px;
		line-height: 20px;
		background: var(--a-raised);
		user-select: none;
		min-width: 48px;
	}

	textarea {
		flex: 1;
		height: 100%;
		border: 0;
		border-radius: 0;
		resize: none;
		font-size: 13px;
		line-height: 20px;
		padding: 10px 12px;
		white-space: pre;
		overflow: auto;
		tab-size: 4;
	}

	.bar {
		padding: 12px 16px;
		align-items: center;
	}

	.grow {
		flex: 1 1 240px;
	}

	.grow input {
		width: 100%;
	}

	.check {
		display: flex;
		align-items: center;
		gap: 6px;
		font-size: 14px;
	}

	.history li {
		padding: 8px;
		border-bottom: 1px solid var(--a-line-soft);
		display: flex;
		flex-direction: column;
		gap: 4px;
		font-size: 14px;
	}

	.small-btn {
		min-height: 28px;
		padding: 0 10px;
		font-size: 13px;
	}

	.diff {
		margin: 0;
		padding: 12px 16px;
		font-size: 13px;
		overflow: auto;
		max-height: 60vh;
	}

	.diff .add {
		color: var(--a-ok);
		background: #0f1f18;
	}

	.diff .del {
		color: var(--a-bad-soft);
		background: var(--a-bad-bg);
	}
</style>
