<script lang="ts">
	let { data, form } = $props();

	const date = (time: number) =>
		new Date(time).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
	const day = (time: number) => new Date(time).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
</script>

<svelte:head>
	<title>My account · {data.serverName}</title>
</svelte:head>

{#if data.welcome}
	<p class="banner" role="status">
		Welcome to {data.serverName}! Your account and first character are ready. Press <a href="/play/">Play now</a> and log in
		with your account name and password.
	</p>
{/if}
{#if form?.message}<p class="banner" role="status">{form.message}</p>{/if}
{#if !data.hasRecoveryKey}
	<p class="banner warning">
		Your account has no recovery key yet. Without one, a lost password cannot be reset.
		<a href="/account/recovery-key">Create a recovery key ›</a>
	</p>
{/if}

<section class="card" aria-labelledby="ch-h">
	<div class="card-head">
		<h2 id="ch-h">Characters</h2>
		<a class="new" href="/account/characters/new">+ New character</a>
	</div>
	<div class="scroll">
		<table class="table">
			<thead><tr><th>Name</th><th>Vocation</th><th>Level</th><th>Status</th><th class="right">Actions</th></tr></thead>
			<tbody>
				{#each data.characters as character (character.name)}
					<tr>
						<td><strong>{character.name}</strong></td>
						<td><span class="badge pixel" style:background={character.badge.color}>{character.badge.short}</span> {character.vocation}</td>
						<td class="pixel">{character.level}</td>
						<td>
							{#if character.deletesAt}
								<span class="deleting">Deleted on {day(character.deletesAt)}</span>
							{:else}
								<span class:online={character.online}>{character.online ? 'Online' : 'Offline'}</span>
							{/if}
						</td>
						<td class="right">
							{#if character.deletesAt}
								<form method="POST" action="?/cancelDeletion">
									<input type="hidden" name="name" value={character.name} />
									<button class="small" type="submit">Keep</button>
								</form>
							{:else}
								<form
									method="POST"
									action="?/delete"
									onsubmit={(event) => {
										if (!confirm(`Delete ${character.name}? It is removed after ${data.deletionDays} days; until then you can cancel.`))
											event.preventDefault();
									}}
								>
									<input type="hidden" name="name" value={character.name} />
									<button class="small danger" type="submit" disabled={character.online}>Delete</button>
								</form>
							{/if}
						</td>
					</tr>
				{:else}
					<tr><td colspan="5">No characters yet. <a href="/account/characters/new">Create one</a>.</td></tr>
				{/each}
			</tbody>
		</table>
	</div>
</section>

<form class="visibility" method="POST" action="?/visibility">
	<input type="hidden" name="show" value={data.showCharacters ? '0' : '1'} />
	<span>
		{data.showCharacters
			? 'Your characters list each other on their public pages.'
			: 'Your characters do not list each other on their public pages.'}
	</span>
	<button class="small" type="submit">{data.showCharacters ? 'Hide them' : 'Show them'}</button>
</form>

<div class="pair">
	<section class="card" aria-labelledby="acc-h">
		<div class="card-head"><h2 id="acc-h">Account</h2></div>
		<div class="card-body">
			<dl>
				<dt>Account name</dt>
				<dd>{data.me.name}</dd>
				<dt>Email</dt>
				<dd>{data.me.email || '–'} <a href="/account/email">Change</a></dd>
				<dt>Password</dt>
				<dd><a href="/account/password">Change</a></dd>
				<dt>Recovery key</dt>
				<dd>{data.hasRecoveryKey ? 'Set' : 'Not set'} <a href="/account/recovery-key">{data.hasRecoveryKey ? 'Replace' : 'Create'}</a></dd>
				{#if data.me.created}
					<dt>Created</dt>
					<dd>{day(data.me.created * 1000)}</dd>
				{/if}
			</dl>
		</div>
	</section>

	<section class="card" aria-labelledby="prem-h">
		<div class="card-head"><h2 id="prem-h">Premium</h2></div>
		<div class="card-body premium">
			<p class="status pixel">
				{#if data.me.premiumDays >= 65535}Premium forever{:else if data.me.premiumDays > 0}Premium · {data.me.premiumDays}
					{data.me.premiumDays === 1 ? 'day' : 'days'} left{:else}Free account{/if}
			</p>
			<p>Premium opens the whole world: more cities, hunting grounds, spells and outfits.</p>
			<form method="POST" action="?/premium">
				<button class="button" type="submit" disabled={!!data.freePremiumAt}>Get premium</button>
			</form>
			{#if data.freePremiumAt}
				<p class="hint">Your free day is used. Next one from {date(data.freePremiumAt)}.</p>
			{:else}
				<p class="hint">For now this adds one free day of premium, once a day.</p>
			{/if}
		</div>
	</section>
</div>

<section class="card" aria-labelledby="log-h">
	<div class="card-head"><h2 id="log-h">Recent logins</h2><a href="/account/history">All</a></div>
	<div class="scroll">
		<table class="table">
			<thead><tr><th>When</th><th>Address</th><th>Result</th></tr></thead>
			<tbody>
				{#each data.logins as login (login.at + login.ip)}
					<tr><td>{date(login.at)}</td><td class="pixel">{login.ip}</td><td>{login.success ? 'Logged in' : 'Wrong password'}</td></tr>
				{:else}
					<tr><td colspan="3">No website logins yet.</td></tr>
				{/each}
			</tbody>
		</table>
	</div>
</section>

<style>
	.banner {
		margin: 0;
		background: var(--surface);
		border: 1px solid var(--online-border);
		color: var(--online-text);
		border-radius: 6px;
		padding: 14px 18px;
	}

	.banner.warning {
		border-color: var(--accent-border);
		color: var(--accent);
	}

	.banner a {
		color: inherit;
		font-weight: 700;
	}

	.new {
		color: var(--accent-text) !important;
		background: var(--accent);
		text-decoration: none;
		padding: 8px 14px;
		border-radius: 4px;
		font-weight: 800;
	}

	.scroll {
		overflow-x: auto;
		padding: 8px 12px 12px;
	}

	.table {
		min-width: 560px;
	}

	.right {
		text-align: right;
	}

	.badge {
		font-size: 12px;
		color: #f6ecd4;
		padding: 2px 6px;
		border-radius: 3px;
	}

	.online {
		color: var(--head);
		font-weight: 700;
	}

	.deleting {
		color: var(--danger);
		font-weight: 700;
	}

	.small {
		font: inherit;
		font-size: 14px;
		font-weight: 700;
		padding: 6px 12px;
		border-radius: 4px;
		border: 2px solid var(--head);
		background: transparent;
		color: var(--head);
		cursor: pointer;
	}

	.small.danger {
		border-color: var(--danger);
		color: var(--danger);
	}

	.small:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}

	.visibility {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 12px;
		margin-top: -12px;
		color: var(--text-soft);
	}

	.visibility .small {
		border-color: var(--paper-muted);
		color: var(--text-bright);
	}

	.pair {
		display: flex;
		flex-wrap: wrap;
		gap: 28px;
	}

	.pair .card {
		flex: 1 1 300px;
	}

	dl {
		margin: 0;
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 8px 16px;
	}

	dt {
		font-weight: 700;
	}

	dd {
		margin: 0;
		overflow-wrap: anywhere;
	}

	.premium p {
		margin: 0 0 12px;
	}

	.premium .status {
		font-size: 20px;
	}

	.hint {
		font-size: 14px;
		color: var(--paper-muted);
		margin-top: 12px !important;
	}

	.button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
</style>
