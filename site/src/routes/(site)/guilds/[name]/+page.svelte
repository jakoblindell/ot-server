<script lang="ts">
	let { data } = $props();
	const day = (time: number) => new Date(time).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
</script>

<svelte:head>
	<title>{data.guild.name} · {data.serverName}</title>
</svelte:head>

<main class="wrap page">
	<nav class="crumbs" aria-label="Breadcrumbs"><a href="/guilds">Guilds</a> › <span>{data.guild.name}</span></nav>

	<section class="card" aria-labelledby="g-h">
		<div class="card-head"><h1 id="g-h">{data.guild.name}</h1></div>
		<div class="card-body about">
			{#if data.guild.motd}<p class="motd">{data.guild.motd}</p>{/if}
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

	{#if data.invites.length}
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

	.invites {
		margin: 0;
		padding-left: 20px;
	}
</style>
