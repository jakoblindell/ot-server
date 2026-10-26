<script lang="ts">
	let { data, form } = $props();
	const when = (at: number) => new Date(at).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
</script>

<svelte:head>
	<title>Reports · Admin · {data.serverName}</title>
</svelte:head>

<div class="page-head">
	<div>
		<h1>Reports</h1>
		<p>Characters and news comments reported by players on the website.</p>
	</div>
	<nav class="row">
		<a class="btn" class:primary={data.status === 'open'} href="?status=open">Open</a>
		<a class="btn" class:primary={data.status === 'closed'} href="?status=closed">Closed</a>
	</nav>
</div>

{#if form?.message}<p class="flash" role="status">{form.message}</p>{/if}
{#if form?.error}<p class="flash error" role="alert">{form.error}</p>{/if}

<section class="panel">
	<div class="scroll">
		<table>
			<thead><tr><th>Reported</th><th>About</th><th>Reason</th><th>Details</th><th>By</th><th>{data.status === 'open' ? 'Handle' : 'Outcome'}</th></tr></thead>
			<tbody>
				{#each data.reports as report (report.id)}
					<tr>
						<td class="mono">{when(report.created_at)}</td>
						<td>
							<a href="/admin/players?player={encodeURIComponent(report.target_player)}">{report.target_player}</a>
							{#if report.kind === 'comment'}<br /><span class="muted">comment</span>
								{#if report.news_id}<a href="/news/{report.news_id}#comments">view</a>{/if}
							{/if}
						</td>
						<td><span class="pill warn">{report.reason}</span></td>
						<td>
							{report.text || ''}
							{#if report.comment}<blockquote>“{report.comment}”</blockquote>{/if}
						</td>
						<td class="mono">{report.reporter}</td>
						<td>
							{#if data.status === 'open'}
								<form method="POST" action="?/close" class="row">
									<input type="hidden" name="id" value={report.id} /><input type="hidden" name="player" value={report.target_player} />
									<input name="outcome" placeholder="What was done" maxlength="255" />
									<button class="btn">Close</button>
								</form>
							{:else}
								{report.outcome} <span class="muted">· {report.handled_by}, {when(report.handled_at)}</span>
							{/if}
						</td>
					</tr>
				{:else}
					<tr><td colspan="6" class="muted">No {data.status} reports.</td></tr>
				{/each}
			</tbody>
		</table>
	</div>
</section>

<style>
	blockquote {
		margin: 6px 0 0;
		padding-left: 10px;
		border-left: 2px solid var(--a-line);
		color: var(--a-soft);
	}
</style>
