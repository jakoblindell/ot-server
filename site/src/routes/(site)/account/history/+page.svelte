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
		<table class="table stack">
			<thead><tr><th class="main">When</th><th class="more">Address</th><th class="more">Browser</th><th class="end">Result</th></tr></thead>
			<tbody>
				{#each data.logins as login (login.id)}
					<tr>
						<td class="main">{date(login.at)}</td>
						<td class="pixel more" data-label="Address">{login.ip}</td>
						<td class="browser more" title={login.browser}>{login.browser}</td>
						<td class="end">{login.success ? 'Logged in' : 'Wrong password'}</td>
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

	@media (min-width: 601px) {
		.table {
			min-width: 620px;
		}
	}

	/* Phones: the browser on a line of its own, shortened */
	@media (max-width: 600px) {
		.browser {
			flex: 1 1 100%;
			max-width: none;
			overflow-wrap: normal;
		}
	}

	.browser {
		max-width: 280px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 14px;
	}
</style>
