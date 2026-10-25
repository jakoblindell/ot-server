<script lang="ts">
	let { data } = $props();
	const when = (at: number) =>
		new Date(at).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' });
	const page = (n: number) => `?${new URLSearchParams({ ...(data.q ? { q: data.q } : {}), page: String(n) })}`;
</script>

<svelte:head>
	<title>Audit log · Admin · {data.serverName}</title>
</svelte:head>

<div class="page-head">
	<div>
		<h1>Audit log</h1>
		<p>Every staff action on the website, newest first.</p>
	</div>
	<form method="GET" class="row">
		<label class="stack">Filter by staff, character or action <input name="q" type="search" value={data.q} /></label>
		<button class="btn">Filter</button>
	</form>
</div>

<section class="panel">
	<div class="scroll">
		<table>
			<thead><tr><th>When</th><th>Who</th><th>Action</th><th>Details</th><th>Address</th></tr></thead>
			<tbody>
				{#each data.rows as row (row.id)}
					<tr>
						<td class="mono">{when(row.created_at)}</td>
						<td>{row.actor}</td>
						<td class="mono">{row.action}</td>
						<td>
							{row.details}
							{#if row.target_player}<a href="/admin/players?player={encodeURIComponent(row.target_player)}">({row.target_player})</a>{/if}
						</td>
						<td class="mono muted">{row.ip}</td>
					</tr>
				{:else}
					<tr><td colspan="5" class="muted">Nothing logged.</td></tr>
				{/each}
			</tbody>
		</table>
	</div>
</section>

<nav class="row" aria-label="Pages">
	{#if data.page > 1}<a class="btn" href={page(data.page - 1)}>‹ Newer</a>{/if}
	{#if data.more}<a class="btn" href={page(data.page + 1)}>Older ›</a>{/if}
</nav>
