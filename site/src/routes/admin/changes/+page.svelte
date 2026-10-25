<script lang="ts">
	let { data, form } = $props();
	const when = (at: number) => new Date(at).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
	const statusLabel: Record<string, string> = { M: 'changed', A: 'new', D: 'deleted', R: 'renamed' };
	let open = $state<Record<string, boolean>>({});
</script>

<svelte:head>
	<title>Pending changes · Admin · {data.serverName}</title>
</svelte:head>

<div class="page-head">
	<div>
		<h1>Pending changes</h1>
		<p>
			{#if data.available}
				Everything below goes live at the next server save ({data.serverSave}), when the server restarts. Files the server can
				reload can go live now.
			{/if}
		</p>
	</div>
</div>

{#if form?.message}<p class="flash" role="status">{form.message}</p>{/if}
{#if form?.error}<p class="flash error" role="alert">{form.error}</p>{/if}

{#if !data.available}
	<p class="flash error">The game files are not set up yet: the server creates them on its first start.</p>
{:else}
	{#if data.start.started}
		<section class="panel">
			<div class="panel-head"><h2>Last server start</h2><span class="mono muted">{data.start.started}</span></div>
			<div class="panel-body">
				{#if data.start.notes.length}
					<ul class="notes">{#each data.start.notes as note (note)}<li class:bad={note.startsWith('CONFLICT')}>{note}</li>{/each}</ul>
				{:else}
					<p class="muted">Nothing to apply.</p>
				{/if}
				{#if data.start.clashes.length}
					<p>New files from the server image clash with staff edits in: <span class="mono">{data.start.clashes.join(', ')}</span></p>
					<div class="row">
						<form method="POST" action="?/resolve"><input type="hidden" name="keep" value="ours" /><button class="btn">Keep our versions</button></form>
						<form method="POST" action="?/resolve"><input type="hidden" name="keep" value="image" /><button class="btn">Take the image's versions</button></form>
					</div>
					<p class="muted small">Where only one side changed a line, both are kept either way. The choice goes live at the next server save.</p>
				{/if}
			</div>
		</section>
	{/if}

	<section class="panel">
		<div class="panel-head"><h2>Files that will change</h2><span class="pill" class:warn={data.files.length > 0}>{data.files.length}</span></div>
		{#if data.files.length}
			<ul class="files">
				{#each data.files as file (file.path)}
					<li>
						<div class="row line">
							<span class="pill">{statusLabel[file.status] ?? file.status}</span>
							<a class="mono" href="/admin/files?file={encodeURIComponent(file.path)}">{file.path}</a>
							<span class="spacer"></span>
							<button class="btn small-btn" type="button" onclick={() => (open[file.path] = !open[file.path])}>{open[file.path] ? 'Hide' : 'Show'} diff</button>
							{#if file.reload}
								<form method="POST" action="?/apply"><input type="hidden" name="file" value={file.path} /><button class="btn small-btn primary">Apply now (reload {file.reload})</button></form>
							{:else}
								<span class="muted small">needs a restart</span>
							{/if}
							<form
								method="POST"
								action="?/discard"
								onsubmit={(event) => {
									if (!confirm(`Discard the change to ${file.path}?`)) event.preventDefault();
								}}
							>
								<input type="hidden" name="file" value={file.path} /><button class="btn small-btn danger">Discard</button>
							</form>
						</div>
						{#if open[file.path]}
							<pre class="diff mono">{#each file.diff.split('\n') as line, index (index)}<span
										class:add={line.startsWith('+') && !line.startsWith('+++')}
										class:del={line.startsWith('-') && !line.startsWith('---')}>{line}{'\n'}</span
									>{/each}</pre>
						{/if}
					</li>
				{/each}
			</ul>
		{:else}
			<div class="panel-body muted">Nothing pending: the server runs exactly what is staged.</div>
		{/if}
	</section>

	{#if data.commits.length}
		<section class="panel">
			<div class="panel-head"><h2>Edits since the last start</h2></div>
			<div class="scroll">
				<table>
					<thead><tr><th>When</th><th>Who</th><th>What</th></tr></thead>
					<tbody>
						{#each data.commits as commit (commit.hash)}
							<tr><td class="mono">{when(commit.at)}</td><td>{commit.by}</td><td>{commit.subject}</td></tr>
						{/each}
					</tbody>
				</table>
			</div>
		</section>
	{/if}
{/if}

<style>
	.notes {
		margin: 0 0 8px;
		padding-left: 18px;
	}

	.notes .bad {
		color: var(--a-bad-soft);
	}

	.small {
		font-size: 13px;
	}

	.files {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.files li {
		border-bottom: 1px solid var(--a-line-soft);
		padding: 10px 16px;
	}

	.line {
		align-items: center;
	}

	.spacer {
		flex: 1;
	}

	.small-btn {
		min-height: 30px;
		padding: 0 10px;
		font-size: 13px;
	}

	.diff {
		margin: 10px 0 0;
		padding: 10px 12px;
		font-size: 13px;
		overflow: auto;
		max-height: 50vh;
		background: var(--a-bg);
		border-radius: 6px;
	}

	.diff .add {
		color: var(--a-ok);
	}

	.diff .del {
		color: var(--a-bad-soft);
	}
</style>
