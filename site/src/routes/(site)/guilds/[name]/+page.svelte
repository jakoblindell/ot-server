<script lang="ts">
	let { data, form } = $props();
	const lead = $derived(data.standing >= 3);
	const manage = $derived(data.standing >= 2);
	const lowerRanked = $derived(data.members.filter((member) => member.rank !== data.ranks[0]?.name));
	const day = (time: number) => new Date(time).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
</script>

<svelte:head>
	<title>{data.guild.name} · {data.serverName}</title>
</svelte:head>

<main class="wrap page">
	<nav class="crumbs" aria-label="Breadcrumbs"><a href="/guilds">Guilds</a> › <span>{data.guild.name}</span></nav>

	{#if form?.message}<p class="banner" role="status">{form.message}</p>{/if}
	{#if form?.error}<p class="banner error" role="alert">{form.error}</p>{/if}

	<section class="card" aria-labelledby="g-h">
		<div class="card-head"><h1 id="g-h">{data.guild.name}</h1></div>
		<div class="card-body about">
			{#if data.guild.motd}<p class="motd">{data.guild.motd}</p>{/if}
			{#if data.description}{#each data.description.split(/\n\s*\n/) as paragraph, index (index)}<p>{paragraph}</p>{/each}{/if}
			<p>Founded {day(data.guild.created)}{#if data.guild.leader}, led by <a href="/characters/{encodeURIComponent(data.guild.leader)}">{data.guild.leader}</a>{/if}.</p>
		</div>
	</section>

	<div class="stats">
		<div class="stat"><span class="label">Members</span><span class="value">{data.stats.members}</span></div>
		<div class="stat"><span class="label">Online</span><span class="value">{data.stats.online}</span></div>
		<div class="stat"><span class="label">Average level</span><span class="value">{data.stats.average}</span></div>
		<div class="stat"><span class="label">Top level</span><span class="value">{data.stats.top}</span></div>
	</div>

	<section class="card" aria-labelledby="m-h">
		<div class="card-head"><h2 id="m-h">Members</h2></div>
		<div class="scroll">
			<table class="table">
				<thead><tr><th>Rank</th><th>Name</th><th>Vocation</th><th class="num">Level</th><th>Status</th></tr></thead>
				<tbody>
					{#each data.members as member, index (member.name)}
						<tr class:first={index === 0 || data.members[index - 1].rank !== member.rank}>
							<td class="rank">{index === 0 || data.members[index - 1].rank !== member.rank ? member.rank : ''}</td>
							<td>
								<a href="/characters/{encodeURIComponent(member.name)}">{member.name}</a>
								{#if member.nick}<span class="nick">({member.nick})</span>{/if}
							</td>
							<td><span class="badge pixel" style:background={member.badge.color}>{member.badge.short}</span> {member.vocation}</td>
							<td class="num pixel">{member.level}</td>
							<td class:online={member.online}>{member.online ? 'Online' : 'Offline'}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</section>

	{#if data.myInvited.length || data.myMembers.length}
		<section class="card" aria-labelledby="mine-h">
			<div class="card-head"><h2 id="mine-h">Your characters</h2></div>
			<div class="card-body stack">
				{#each data.myInvited as character (character.id)}
					<div class="row">
						<span><strong>{character.name}</strong> is invited.</span>
						<form method="POST" action="?/accept"><input type="hidden" name="character" value={character.id} /><button class="button">Join</button></form>
						<form method="POST" action="?/decline"><input type="hidden" name="character" value={character.id} /><button class="button ghost">Decline</button></form>
					</div>
				{/each}
				{#each data.myMembers as character (character.id)}
					<form
						method="POST"
						action="?/leave"
						class="row"
						onsubmit={(event) => {
							if (!confirm(`${character.name} leaves ${data.guild.name}?`)) event.preventDefault();
						}}
					>
						<span><strong>{character.name}</strong> is a member.</span>
						<input type="hidden" name="character" value={character.id} /><button class="button ghost">Leave the guild</button>
					</form>
				{/each}
				<p class="hint">Guild changes show in the game after the character's next login.</p>
			</div>
		</section>
	{/if}

	{#if manage}
		<section class="card" aria-labelledby="manage-h">
			<div class="card-head"><h2 id="manage-h">Manage the guild</h2></div>
			<div class="card-body stack">
				<form method="POST" action="?/invite" class="row">
					<label class="field grow">Invite a character <input name="player" required maxlength="30" /></label>
					<button class="button">Invite</button>
				</form>
				{#if data.invites.length}
					<div class="row">
						<span>Invited:</span>
						{#each data.invites as name (name)}
							<form method="POST" action="?/cancelInvite" class="chip">
								<input type="hidden" name="player" value={name} />{name}<button title="Withdraw the invitation for {name}">×</button>
							</form>
						{/each}
					</div>
				{/if}
				{#if lowerRanked.length}
					<form method="POST" action="?/setNick" class="row">
						<label class="field">Member
							<select name="player">{#each data.members as member (member.name)}<option>{member.name}</option>{/each}</select>
						</label>
						<label class="field grow">Title <input name="nick" maxlength="15" /></label>
						<button class="button ghost">Set title</button>
					</form>
					{#if lead}
						<form method="POST" action="?/setRank" class="row">
							<label class="field">Member
								<select name="player">{#each lowerRanked as member (member.name)}<option>{member.name}</option>{/each}</select>
							</label>
							<label class="field">Rank
								<select name="rank">{#each data.ranks.filter((rank) => rank.level < 3) as rank (rank.id)}<option value={rank.id}>{rank.name}</option>{/each}</select>
							</label>
							<button class="button ghost">Set rank</button>
						</form>
					{/if}
					<form
						method="POST"
						action="?/kick"
						class="row"
						onsubmit={(event) => {
							if (!confirm('Remove this member from the guild?')) event.preventDefault();
						}}
					>
						<label class="field">Member
							<select name="player">{#each lowerRanked as member (member.name)}<option>{member.name}</option>{/each}</select>
						</label>
						<button class="button ghost">Remove from the guild</button>
					</form>
				{/if}

				{#if lead}
					<form method="POST" action="?/texts" class="stack">
						<label class="field">Message of the day (shown in the game) <input name="motd" maxlength="255" value={data.guild.motd} /></label>
						<label class="field">About the guild (this page) <textarea name="description" rows="5" maxlength="4000">{data.description}</textarea></label>
						<div><button class="button ghost">Save the texts</button></div>
					</form>
					<form method="POST" action="?/renameRanks" class="row">
						{#each data.ranks as rank (rank.id)}<label class="field">Rank {rank.level}<input name="rank-{rank.id}" value={rank.name} maxlength="30" /></label>{/each}
						<button class="button ghost">Rename ranks</button>
					</form>
					{#if data.members.length > 1}
						<form
							method="POST"
							action="?/handOver"
							class="row"
							onsubmit={(event) => {
								if (!confirm('Hand the guild over? You become a vice-leader.')) event.preventDefault();
							}}
						>
							<label class="field">New leader
								<select name="player">{#each lowerRanked as member (member.name)}<option>{member.name}</option>{/each}</select>
							</label>
							<button class="button ghost">Hand over</button>
						</form>
					{/if}
					<form method="POST" action="?/disband" class="row danger">
						<label class="field grow">Disband: type “{data.guild.name}” to confirm <input name="confirm" autocomplete="off" /></label>
						<button class="button ghost">Disband the guild</button>
					</form>
				{/if}
			</div>
		</section>
	{/if}

	{#if data.invites.length && !manage}
		<section class="card" aria-labelledby="i-h">
			<div class="card-head"><h2 id="i-h">Invited</h2></div>
			<div class="card-body">
				<ul class="invites">
					{#each data.invites as name (name)}<li><a href="/characters/{encodeURIComponent(name)}">{name}</a></li>{/each}
				</ul>
			</div>
		</section>
	{/if}
</main>

<style>
	.page {
		width: 100%;
		max-width: 1000px;
		padding-top: 28px;
		padding-bottom: 72px;
		display: flex;
		flex-direction: column;
		gap: 28px;
	}

	.crumbs {
		color: var(--text-muted);
	}

	.crumbs a {
		color: var(--text-soft);
	}

	.about p {
		margin: 0 0 8px;
	}

	.motd {
		font-style: italic;
	}

	.about a,
	.table a,
	.invites a {
		color: var(--paper-text);
		font-weight: 700;
	}

	.scroll {
		overflow-x: auto;
		padding: 8px 12px 12px;
	}

	.table {
		min-width: 560px;
	}

	.rank {
		font-weight: 700;
		color: var(--danger);
	}

	.nick {
		color: var(--paper-muted);
	}

	.num {
		text-align: right;
	}

	.online {
		color: var(--head);
		font-weight: 700;
	}

	.badge {
		font-size: 12px;
		color: #f6ecd4;
		padding: 2px 6px;
		border-radius: 3px;
	}

	.banner {
		margin: 0;
		background: var(--surface);
		border: 1px solid var(--online-border);
		color: var(--online-text);
		border-radius: 6px;
		padding: 12px 16px;
	}

	.banner.error {
		border-color: var(--danger);
		color: var(--text-bright);
	}

	.stack {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.row {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		align-items: flex-end;
	}

	.grow {
		flex: 1 1 200px;
	}

	.hint {
		margin: 0;
		font-size: 14px;
		color: var(--paper-muted);
	}

	.chip {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		border: 1px solid var(--paper-muted);
		border-radius: 999px;
		padding: 2px 4px 2px 10px;
	}

	.chip button {
		border: 0;
		background: none;
		font: inherit;
		font-weight: 700;
		color: var(--danger);
		cursor: pointer;
	}

	.danger {
		border-top: 1px dashed var(--danger);
		padding-top: 14px;
	}

	.invites {
		margin: 0;
		padding-left: 20px;
	}
</style>
