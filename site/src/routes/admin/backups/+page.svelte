<script lang="ts">
	let { data, form } = $props();
	const when = (at: number) => new Date(at).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
	const size = (bytes: number) => (bytes > 1e6 ? `${(bytes / 1e6).toFixed(1)} MB` : `${Math.round(bytes / 1e3)} kB`);
</script>

<svelte:head>
	<title>Backups · Admin · {data.serverName}</title>
</svelte:head>

<div class="page-head">
	<div>
		<h1>Backups</h1>
		<p>Database dumps from the backup service (every 6 hours, kept 14 days by default). Copy them off the server regularly.</p>
	</div>
	<form method="POST" action="?/now"><button class="btn primary" disabled={data.requested}>{data.requested ? 'Backup requested…' : 'Back up now'}</button></form>
</div>

{#if form?.message}<p class="flash" role="status">{form.message}</p>{/if}
{#if form?.error}<p class="flash error" role="alert">{form.error}</p>{/if}

<section class="panel">
	<div class="scroll">
		<table>
			<thead><tr><th>Dump</th><th>Made</th><th>Size</th><th></th></tr></thead>
			<tbody>
				{#if data.backups === null}
					<tr><td colspan="4" class="muted">The backups folder is not available to the website.</td></tr>
				{:else}
					{#each data.backups as backup (backup.name)}
						<tr>
							<td class="mono">{backup.name}</td>
							<td>{when(backup.at)}</td>
							<td class="mono">{size(backup.size)}</td>
							<td><a class="btn" href="/admin/backups/{backup.name}" download>Download</a></td>
						</tr>
					{:else}
						<tr><td colspan="4" class="muted">No dumps yet.</td></tr>
					{/each}
				{/if}
			</tbody>
		</table>
	</div>
</section>

<section class="panel">
	<div class="panel-head"><h2>Restoring</h2></div>
	<div class="panel-body">
		<p>Restoring replaces every account, character and house with the dump's, so it is done on the server itself:</p>
		<pre class="mono">cd deploy
./restore.sh backups/{data.backups?.[0]?.name ?? 'sabrehaven-YYYYMMDD-HHMMSS.sql.gz'}</pre>
		<p class="muted">It stops the game server, backs up the current state first, restores and starts the server again.</p>
	</div>
</section>

<style>
	pre {
		background: var(--a-bg);
		border: 1px solid var(--a-line);
		border-radius: 6px;
		padding: 10px 12px;
		overflow: auto;
	}

	p {
		margin: 0 0 10px;
	}
</style>
