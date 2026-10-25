<script lang="ts">
	let { data, form } = $props();

	const time = (at: number) => new Date(at).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
	const dateTime = (at: number) =>
		new Date(at).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
	const uptime = $derived.by(() => {
		const minutes = Math.floor(data.status.uptimeSeconds / 60);
		return `${Math.floor(minutes / 1440)}d ${String(Math.floor((minutes % 1440) / 60)).padStart(2, '0')}h ${String(minutes % 60).padStart(2, '0')}m`;
	});
	const peak = $derived(Math.max(1, ...data.chart.map((point) => point.players ?? 0)));
	let hover = $state(-1);
	const tip = $derived(
		hover >= 0
			? `${time(data.chart[hover].at)} · ${data.chart[hover].players ?? 'no data'}${data.chart[hover].players === null ? '' : ' players'}`
			: 'Highest count per hour'
	);
	const size = (bytes: number) => (bytes > 1e6 ? `${(bytes / 1e6).toFixed(1)} MB` : `${Math.round(bytes / 1e3)} kB`);
</script>

<svelte:head>
	<title>Dashboard · Admin · {data.serverName}</title>
</svelte:head>

<div class="page-head">
	<div>
		<h1>Dashboard</h1>
		<p>Staff area. Every action here is logged with your name.</p>
	</div>
</div>

{#if form?.message}<p class="flash" role="status">{form.message}</p>{/if}
{#if form?.error}<p class="flash error" role="alert">{form.error}</p>{/if}

<div class="tiles">
	<div class="tile">
		<div class="label">Game server</div>
		<div class="value">{#if data.status.online}<span class="pill ok">Online</span>{:else}<span class="pill bad">Offline</span>{/if}</div>
		<div class="sub">{data.status.online ? `up ${uptime}` : 'not answering'}</div>
	</div>
	<div class="tile">
		<div class="label">Players online</div>
		<div class="value">{data.status.playersOnline}</div>
		<div class="sub">record {data.status.playersPeak}</div>
	</div>
	<div class="tile">
		<div class="label">Next server save</div>
		<div class="value">{data.serverSave}</div>
		<div class="sub">the server restarts then</div>
	</div>
	<div class="tile">
		<div class="label">Last backup</div>
		<div class="value">{data.backup ? time(data.backup.at) : '–'}</div>
		<div class="sub">{data.backup ? `${dateTime(data.backup.at)} · ${size(data.backup.size)} · ${data.backup.count} kept` : 'no dumps found'}</div>
	</div>
</div>

<section class="panel">
	<div class="panel-head"><h2>Players online, last 24 hours</h2><span class="muted mono">{tip}</span></div>
	<div class="panel-body">
		<div class="chart" role="img" aria-label="Players online per hour over the last 24 hours">
			{#each data.chart as point, index (point.at)}
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div class="bar-slot" onmouseenter={() => (hover = index)} onmouseleave={() => (hover = -1)}>
					<div
						class="bar"
						class:hover={hover === index}
						class:empty={point.players === null}
						style:height={point.players === null ? '2px' : `${Math.max(2, (point.players / peak) * 100)}%`}
					></div>
				</div>
			{/each}
		</div>
		<div class="axis mono">
			<span>{time(data.chart[0].at)}</span><span>{time(data.chart[12].at)}</span><span>{time(data.chart[23].at)}</span>
		</div>
	</div>
</section>

<div class="grid">
	<section class="panel">
		<div class="panel-head"><h2>Server actions</h2></div>
		<div class="panel-body actions">
			{#if data.staff.can.server}
				<form method="POST" action="?/broadcast" class="row">
					<label class="stack grow">Broadcast to all players <input name="text" maxlength="255" required /></label>
					<button class="btn primary" type="submit">Send</button>
				</form>
				<div class="row">
					<form method="POST" action="?/save"><button class="btn" type="submit">Save now</button></form>
					<form method="POST" action="?/clean"><button class="btn" type="submit">Clean map</button></form>
				</div>
				<form method="POST" action="?/reload" class="row">
					<label class="stack"
						>Reload
						<select name="type">
							{#each data.reloadTypes as type (type)}<option value={type}>{type}</option>{/each}
						</select>
					</label>
					<button class="btn" type="submit">Reload</button>
				</form>
				<div class="danger-zone">
					<div class="mono">DANGER ZONE</div>
					<form
						method="POST"
						action="?/restart"
						class="row"
						onsubmit={(event) => {
							if (!confirm('Restart the game server? Everyone is logged out.')) event.preventDefault();
						}}
					>
						<label class="stack"
							>Restart
							<select name="minutes">
								<option value="5">in 5 minutes</option>
								<option value="15">in 15 minutes</option>
								<option value="0">now</option>
							</select>
						</label>
						<button class="btn danger" type="submit">Restart server</button>
					</form>
					<p class="muted note">Players get warnings; the server saves, stops and starts again.</p>
				</div>
			{:else}
				<p class="muted">Server actions are for gods.</p>
			{/if}
		</div>
	</section>

	<section class="panel">
		<div class="panel-head"><h2>Recent server commands</h2></div>
		<div class="scroll">
			<table>
				<thead><tr><th>When</th><th>Command</th><th>By</th><th>Result</th></tr></thead>
				<tbody>
					{#each data.commands as command (command.id)}
						<tr>
							<td class="mono">{dateTime(command.created_at)}</td>
							<td>{command.command}{command.target ? ` ${command.target}` : ''}</td>
							<td>{command.created_by}</td>
							<td>
								<span class="pill" class:ok={command.status === 'done'} class:bad={command.status === 'failed'} class:warn={command.status === 'pending'}
									>{command.status}</span
								>
								<span class="muted">{command.result}</span>
							</td>
						</tr>
					{:else}
						<tr><td colspan="4" class="muted">None yet.</td></tr>
					{/each}
				</tbody>
			</table>
		</div>
	</section>
</div>

<section class="panel">
	<div class="panel-head"><h2>Recent staff actions</h2><a href="/admin/audit">Audit log</a></div>
	<div class="scroll">
		<table>
			<thead><tr><th>When</th><th>Who</th><th>Action</th><th>Details</th></tr></thead>
			<tbody>
				{#each data.actions as action (action.id)}
					<tr>
						<td class="mono">{dateTime(action.created_at)}</td>
						<td>{action.actor}</td>
						<td class="mono">{action.action}</td>
						<td>{action.details}</td>
					</tr>
				{:else}
					<tr><td colspan="4" class="muted">None yet.</td></tr>
				{/each}
			</tbody>
		</table>
	</div>
</section>

<style>
	.chart {
		height: 160px;
		display: flex;
		align-items: flex-end;
		gap: 4px;
	}

	.bar-slot {
		flex: 1;
		height: 100%;
		display: flex;
		align-items: flex-end;
	}

	.bar {
		width: 100%;
		background: var(--a-blue);
		border-radius: 2px 2px 0 0;
	}

	.bar.hover {
		background: var(--a-link);
	}

	.bar.empty {
		background: var(--a-line);
	}

	.axis {
		display: flex;
		justify-content: space-between;
		font-size: 12px;
		color: var(--a-muted);
		margin-top: 6px;
	}

	.actions {
		display: flex;
		flex-direction: column;
		gap: 14px;
	}

	.grow {
		flex: 1 1 220px;
	}

	.grow input {
		width: 100%;
	}

	.note {
		margin: 8px 0 0;
		font-size: 13px;
	}
</style>
