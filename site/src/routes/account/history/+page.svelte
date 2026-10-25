<script lang="ts">
	let { data } = $props();
	const date = (time: number) =>
		new Date(time).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
</script>

<svelte:head>
	<title>Login history · {data.serverName}</title>
</svelte:head>

<section class="card" aria-labelledby="hi-h">
	<div class="card-head"><h1 id="hi-h">Login history</h1></div>
	<div class="scroll">
		<p>The last 50 logins on this website. Game logins are not listed here.</p>
		<table class="table">
			<thead><tr><th>When</th><th>Address</th><th>Browser</th><th>Result</th></tr></thead>
			<tbody>
				{#each data.logins as login (login.id)}
					<tr>
						<td>{date(login.at)}</td>
						<td class="pixel">{login.ip}</td>
						<td class="browser" title={login.browser}>{login.browser}</td>
						<td>{login.success ? 'Logged in' : 'Wrong password'}</td>
					</tr>
				{:else}
					<tr><td colspan="4">No logins yet.</td></tr>
				{/each}
			</tbody>
		</table>
	</div>
</section>

<style>
	.scroll {
		overflow-x: auto;
		padding: 16px 12px 12px;
	}

	.scroll p {
		margin: 0 12px 12px;
	}

	.table {
		min-width: 620px;
	}

	.browser {
		max-width: 280px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 14px;
	}
</style>
