<script lang="ts">
	let { data, form } = $props();
	const report = $derived(data.report);
	const when = (at: number) => new Date(at).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
</script>

<svelte:head>
	<title>Client report {report.id} · Admin · {data.serverName}</title>
</svelte:head>

<div class="page-head">
	<div>
		<h1>Client report {report.id}</h1>
		<p>
			<a href="/admin/players?player={encodeURIComponent(report.player)}">{report.player}</a>, {when(report.created_at)}
			{#if report.status === 'closed'}· closed by {report.handled_by}, {when(report.handled_at)}: {report.outcome}{/if}
		</p>
	</div>
	<nav class="row"><a class="btn" href="/admin/client-reports">All reports</a></nav>
</div>

{#if form?.message}<p class="flash" role="status">{form.message}</p>{/if}
{#if form?.error}<p class="flash error" role="alert">{form.error}</p>{/if}

<section class="panel">
	<h2>Problem</h2>
	<p class="text">{report.text || '(no text)'}</p>
	{#if report.status === 'open'}
		<form method="POST" action="?/close" class="row">
			<input name="outcome" placeholder="What was done" maxlength="255" />
			<button class="btn">Close</button>
		</form>
	{/if}
</section>

{#if report.screenshot}
	<section class="panel">
		<h2>Screenshot</h2>
		<a href="/admin/client-reports/{report.id}/screenshot" target="_blank" rel="noopener">
			<img src="/admin/client-reports/{report.id}/screenshot" alt="The player's screen when the report was sent" />
		</a>
	</section>
{/if}

<section class="panel">
	<h2>Device, client and UI</h2>
	<pre>{report.info}</pre>
</section>

<section class="panel">
	<h2>Client log</h2>
	<pre>{report.logs || '(empty)'}</pre>
</section>

<style>
	section {
		padding: 14px 16px;
	}
	h2 {
		margin: 0 0 10px;
	}
	.text {
		white-space: pre-wrap;
	}
	img {
		max-width: 100%;
		border: 1px solid var(--a-line);
	}
	pre {
		max-height: 480px;
		overflow: auto;
		font-size: 12px;
		white-space: pre-wrap;
		word-break: break-word;
	}
</style>
