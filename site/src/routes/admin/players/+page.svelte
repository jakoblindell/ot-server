<script lang="ts">
	let { data, form } = $props();

	const dateTime = (at: number) =>
		new Date(at).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
	const link = (player: string) => {
		const params = new URLSearchParams();
		if (data.q) params.set('q', data.q);
		if (data.filter !== 'all') params.set('filter', data.filter);
		params.set('player', player);
		return `?${params}`;
	};
	const filters = [
		{ id: 'all', label: 'All players' },
		{ id: 'online', label: 'Online' },
		{ id: 'flagged', label: 'With notes' },
		{ id: 'banned', label: 'Banned' }
	];
	const s = $derived(data.selected);
</script>

<svelte:head>
	<title>Players · Admin · {data.serverName}</title>
</svelte:head>

<div class="page-head">
	<div>
		<h1>Players &amp; accounts</h1>
		<p>{data.totals?.characters} characters on {data.totals?.accounts} accounts · {data.totals?.online} online</p>
	</div>
</div>

{#if form?.message}<p class="flash" role="status">{form.message}</p>{/if}
{#if form?.error}<p class="flash error" role="alert">{form.error}</p>{/if}

<form class="row" method="GET">
	<label class="stack grow">Filter by character, account, email or IP <input name="q" value={data.q} type="search" /></label>
	<label class="stack"
		>Status
		<select name="filter" value={data.filter}>
			{#each filters as filter (filter.id)}<option value={filter.id}>{filter.label}</option>{/each}
		</select>
	</label>
	<button class="btn primary" type="submit">Search</button>
</form>

<div class="split">
	<section class="panel list">
		<div class="scroll">
			<table>
				<thead><tr><th>Character</th><th>Account</th><th>Level</th><th>Last IP</th><th>Status</th></tr></thead>
				<tbody>
					{#each data.rows as row (row.name)}
						<tr class:selected={s?.name === row.name}>
							<td><span class="pill">{row.vocation.short}</span> <a href={link(row.name)}>{row.name}</a></td>
							<td class="mono">{row.account}</td>
							<td class="mono">{row.level}</td>
							<td class="mono">{row.ip || '–'}</td>
							<td>
								{#if row.online}<span class="pill ok">Online</span>{:else}<span class="muted">Offline</span>{/if}
								{#if row.banned}<span class="pill bad">Banned</span>{/if}
								{#if row.namelocked}<span class="pill warn">Namelock</span>{/if}
								{#if row.notes}<span class="pill warn">{row.notes} note{row.notes === 1 ? '' : 's'}</span>{/if}
							</td>
						</tr>
					{:else}
						<tr><td colspan="5" class="muted">No characters match.</td></tr>
					{/each}
				</tbody>
			</table>
		</div>
		{#if data.rows.length === 50}<p class="muted more">Showing the first 50. Narrow the search.</p>{/if}
	</section>

	{#if s}
		<section class="panel detail" aria-labelledby="sel-h">
			<div class="panel-head">
				<div>
					<span class="mono muted small">SELECTED CHARACTER</span>
					<h2 id="sel-h"><a href="/characters/{encodeURIComponent(s.name)}">{s.name}</a></h2>
					<span class="muted">{s.vocation} · Level {s.level} · {s.online ? 'Online' : 'Offline'} · position {s.position}</span>
				</div>
			</div>
			<div class="panel-body stack-gap">
				{#if s.ban}<p class="flash error">Account banned {s.ban.until ? `until ${dateTime(s.ban.until)}` : 'permanently'}: {s.ban.reason}</p>{/if}
				{#if s.namelocked}<p class="flash error">Namelocked: the owner must choose a new name on the website.</p>{/if}
				<dl class="facts">
					<dt>Account</dt>
					<dd class="mono">{s.account.name}</dd>
					<dt>Email</dt>
					<dd>{s.account.email || '–'}</dd>
					<dt>Created</dt>
					<dd>{s.account.created ? dateTime(s.account.created) : '–'}</dd>
					<dt>Characters</dt>
					<dd>
						{#each s.characters as character, index (character.name)}{index ? ', ' : ''}<a href={link(character.name)}>{character.name}</a> ({character.level}){/each}
					</dd>
					<dt>Last login</dt>
					<dd>{s.lastLogin ? dateTime(s.lastLogin) : 'never'}</dd>
					<dt>Last IP</dt>
					<dd class="mono">
						{s.ip || '–'}
						{#if s.ip}· <a href="?q={s.ip}">{s.sameIpAccounts} other account{s.sameIpAccounts === 1 ? '' : 's'}</a>{/if}
					</dd>
				</dl>

				{#if s.staff}
					<p class="muted">This is a staff account; punishments are not available here.</p>
				{/if}

				<div>
					<h3 class="mono small muted">ACTIONS</h3>
					<div class="row">
						<form method="POST" action="?/temple"><input type="hidden" name="player" value={s.name} /><button class="btn" disabled={!s.online}>Teleport to temple</button></form>
						<form method="POST" action="?/kick"><input type="hidden" name="player" value={s.name} /><button class="btn" disabled={!s.online}>Kick</button></form>
					</div>
					<form method="POST" action="?/message" class="row top-gap">
						<input type="hidden" name="player" value={s.name} />
						<label class="stack grow">Message (shown in the game) <input name="text" maxlength="255" required /></label>
						<button class="btn" disabled={!s.online}>Send</button>
					</form>
					<form method="POST" action="?/note" class="row top-gap">
						<input type="hidden" name="player" value={s.name} />
						<label class="stack grow">Staff note (only staff see it) <input name="text" maxlength="1000" required /></label>
						<button class="btn">Add note</button>
					</form>
				</div>

				{#if data.staff.can.punish && !s.staff}
					<form
						method="POST"
						action="?/punish"
						class="danger-zone stack-gap"
						onsubmit={(event) => {
							if (!confirm(`Punish ${s.name}?`)) event.preventDefault();
						}}
					>
						<span class="mono">PUNISH</span>
						<input type="hidden" name="player" value={s.name} />
						<div class="row">
							<label class="stack"
								>Type
								<select name="kind">
									<option value="mute">Mute (online only)</option>
									<option value="ban">Ban account</option>
									<option value="namelock">Namelock</option>
									{#if data.staff.can.punishHard}
										<option value="ipban">Ban IP address</option>
										<option value="delete">Delete character</option>
									{/if}
								</select>
							</label>
							<label class="stack"
								>Duration
								<select name="days">
									<option value="1">24 hours</option>
									<option value="7">7 days</option>
									<option value="30">30 days</option>
									{#if data.staff.can.punishHard}<option value="0">Permanent</option>{/if}
								</select>
							</label>
						</div>
						<label class="stack">Reason (shown to the player) <input name="reason" maxlength="255" required /></label>
						<div><button class="btn danger">Apply punishment</button></div>
					</form>
				{/if}

				<div>
					<h3 class="mono small muted">HISTORY</h3>
					{#if s.notes.length || s.history.length}
						<ul class="history">
							{#each s.notes as note (note.id)}
								<li><span class="pill warn">note</span> {note.text} <span class="muted">· {note.by} · {dateTime(note.at)}{note.player ? ` · on ${note.player}` : ''}</span></li>
							{/each}
							{#each s.history as entry (entry.id)}
								<li><span class="pill">{entry.action}</span> {entry.details} <span class="muted">· {entry.by} · {dateTime(entry.at)}</span></li>
							{/each}
						</ul>
					{:else}
						<p class="muted">Nothing recorded.</p>
					{/if}
				</div>
			</div>
		</section>
	{/if}
</div>

<style>
	.grow {
		flex: 1 1 260px;
	}

	.grow input {
		width: 100%;
	}

	.split {
		display: flex;
		flex-wrap: wrap;
		gap: 20px;
		align-items: flex-start;
	}

	.list {
		flex: 3 1 560px;
		min-width: 0;
	}

	.detail {
		flex: 2 1 380px;
		min-width: 0;
	}

	.more {
		padding: 0 12px 12px;
		margin: 0;
	}

	.small {
		font-size: 12px;
		letter-spacing: 0.08em;
	}

	.detail h2 {
		font-size: 20px;
	}

	.detail h2 a {
		color: var(--a-text);
		text-decoration: none;
	}

	.detail h3 {
		margin-bottom: 8px;
		font-weight: 500;
	}

	.stack-gap {
		display: flex;
		flex-direction: column;
		gap: 14px;
	}

	.top-gap {
		margin-top: 10px;
	}

	.history {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 8px;
		font-size: 14px;
	}
</style>
