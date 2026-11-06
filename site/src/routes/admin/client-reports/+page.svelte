<script lang="ts">
	let { data } = $props();
	const when = (at: number) => new Date(at).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
</script>

<svelte:head>
	<title>Client reports · Admin · {data.serverName}</title>
</svelte:head>

<div class="page-head">
	<div>
		<h1>Client reports</h1>
		<p>Problems players sent from inside the game, with their device details, a screenshot and the client's log.</p>
	</div>
	<nav class="row">
		<a class="btn" class:primary={data.status === 'open'} href="?status=open">Open</a>
		<a class="btn" class:primary={data.status === 'closed'} href="?status=closed">Closed</a>
	</nav>
</div>

<section class="panel">
	<div class="scroll">
		<table>
			<thead><tr><th>Sent</th><th>Character</th><th>Problem</th><th>Device</th><th>{data.status === 'open' ? '' : 'Outcome'}</th></tr></thead>
			<tbody>
				{#each data.reports as report (report.id)}
					<tr>
						<td class="mono"><a href="/admin/client-reports/{report.id}">{when(report.created_at)}</a></td>
						<td><a href="/admin/players?player={encodeURIComponent(report.player)}">{report.player}</a></td>
						<td>{report.text || '—'}{#if report.screenshot} <span class="pill">screenshot</span>{/if}</td>
						<td class="muted">{report.device}</td>
						<td>
							{#if data.status === 'open'}
								<a class="btn" href="/admin/client-reports/{report.id}">Open</a>
							{:else}
								{report.outcome} <span class="muted">· {report.handled_by}, {when(report.handled_at)}</span>
							{/if}
						</td>
					</tr>
				{:else}
					<tr><td colspan="5" class="muted">No {data.status} client reports.</td></tr>
				{/each}
			</tbody>
		</table>
	</div>
</section>
