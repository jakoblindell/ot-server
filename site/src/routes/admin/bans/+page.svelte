<script lang="ts">
	let { data, form } = $props();
	const when = (at: number) => new Date(at).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
	const until = (at: number) => (at ? when(at) : 'permanent');
</script>

<svelte:head>
	<title>Bans · Admin · {data.serverName}</title>
</svelte:head>

<div class="page-head">
	<div>
		<h1>Bans</h1>
		<p>Current bans and namelocks. Punish players from <a href="/admin/players">Players &amp; accounts</a>.</p>
	</div>
</div>

{#if form?.message}<p class="flash" role="status">{form.message}</p>{/if}
{#if form?.error}<p class="flash error" role="alert">{form.error}</p>{/if}

<section class="panel">
	<div class="panel-head"><h2>Banned accounts</h2><span class="pill">{data.accounts.length}</span></div>
	<div class="scroll">
		<table>
			<thead><tr><th>Account</th><th>Characters</th><th>Reason</th><th>By</th><th>Since</th><th>Until</th><th></th></tr></thead>
			<tbody>
				{#each data.accounts as ban (ban.account_id)}
					<tr>
						<td class="mono">{ban.account}</td>
						<td>{ban.characters ?? '–'}</td>
						<td>{ban.reason}</td>
						<td>{ban.by ?? '–'}</td>
						<td class="mono">{when(ban.banned_at)}</td>
						<td class="mono">{until(ban.expires_at)}</td>
						<td>
							<form method="POST" action="?/unbanAccount">
								<input type="hidden" name="account" value={ban.account_id} /><input type="hidden" name="label" value={ban.account} />
								<button class="btn">Lift</button>
							</form>
						</td>
					</tr>
				{:else}
					<tr><td colspan="7" class="muted">No banned accounts.</td></tr>
				{/each}
			</tbody>
		</table>
	</div>
</section>

<section class="panel">
	<div class="panel-head"><h2>Banned addresses</h2><span class="pill">{data.ips.length}</span></div>
	<div class="scroll">
		<table>
			<thead><tr><th>Address</th><th>Reason</th><th>By</th><th>Since</th><th>Until</th><th></th></tr></thead>
			<tbody>
				{#each data.ips as ban (ban.ip)}
					<tr>
						<td class="mono"><a href="/admin/players?q={ban.address}">{ban.address}</a></td>
						<td>{ban.reason}</td>
						<td>{ban.by ?? '–'}</td>
						<td class="mono">{when(ban.banned_at)}</td>
						<td class="mono">{until(ban.expires_at)}</td>
						<td>
							{#if data.staff.can.punishHard}
								<form method="POST" action="?/unbanIp">
									<input type="hidden" name="ip" value={ban.ip} /><input type="hidden" name="label" value={ban.address} />
									<button class="btn">Lift</button>
								</form>
							{/if}
						</td>
					</tr>
				{:else}
					<tr><td colspan="6" class="muted">No banned addresses.</td></tr>
				{/each}
			</tbody>
		</table>
	</div>
</section>

<section class="panel">
	<div class="panel-head"><h2>Namelocks</h2><span class="pill">{data.namelocks.length}</span></div>
	<div class="scroll">
		<table>
			<thead><tr><th>Character</th><th>Reason</th><th>By</th><th>Since</th><th></th></tr></thead>
			<tbody>
				{#each data.namelocks as lock (lock.player_id)}
					<tr>
						<td><a href="/admin/players?player={encodeURIComponent(lock.name)}">{lock.name}</a></td>
						<td>{lock.reason}</td>
						<td>{lock.by ?? '–'}</td>
						<td class="mono">{when(lock.namelocked_at)}</td>
						<td>
							<form method="POST" action="?/unlock">
								<input type="hidden" name="player" value={lock.player_id} /><input type="hidden" name="label" value={lock.name} />
								<button class="btn">Remove</button>
							</form>
						</td>
					</tr>
				{:else}
					<tr><td colspan="5" class="muted">No namelocks.</td></tr>
				{/each}
			</tbody>
		</table>
	</div>
</section>
