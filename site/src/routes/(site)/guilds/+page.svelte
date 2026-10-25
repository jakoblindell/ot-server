<script lang="ts">
	let { data } = $props();
	const colors = ['#7a2418', '#2f4a2a', '#2b3f6b', '#6b4a1a', '#4a3f5c', '#3a5a5a'];
</script>

<svelte:head>
	<title>Guilds · {data.serverName}</title>
</svelte:head>

<main class="wrap page">
	<section class="card" aria-labelledby="g-h">
		<div class="card-head">
			<h1 id="g-h">Guilds</h1>
			<span class="count pixel">{data.guilds.length} {data.guilds.length === 1 ? 'guild' : 'guilds'}</span>
		</div>
		<div class="card-body">
			<p class="intro">Guilds are founded in the game. Sorted by members online.</p>
			{#if data.guilds.length}
				<ul class="guilds">
					{#each data.guilds as guild, index (guild.name)}
						<li>
							<span class="emblem" style:background={colors[index % colors.length]}>{guild.name[0]}</span>
							<span class="about">
								<a href="/guilds/{encodeURIComponent(guild.name)}">{guild.name}</a>
								{#if guild.motd}<span class="motd">{guild.motd}</span>{/if}
							</span>
							<span class="numbers pixel">
								{guild.members} members · {guild.online} online
								{#if guild.leader}<br /><span class="leader">Leader: {guild.leader}</span>{/if}
							</span>
						</li>
					{/each}
				</ul>
			{:else}
				<p>No guilds yet.</p>
			{/if}
		</div>
	</section>
</main>

<style>
	.page {
		width: 100%;
		max-width: 960px;
		padding-top: 32px;
		padding-bottom: 72px;
	}

	.count {
		color: var(--hero-soft);
	}

	.intro {
		margin-top: 0;
		color: var(--paper-muted);
	}

	.guilds {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.guilds li {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 12px 18px;
		padding: 14px 0;
		border-bottom: 1px dashed var(--paper-rule);
	}

	.emblem {
		flex: 0 0 48px;
		height: 48px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: 'IM Fell English SC', serif;
		font-size: 28px;
		color: #f6ecd4;
		border-radius: 4px;
	}

	.about {
		flex: 1 1 240px;
		display: flex;
		flex-direction: column;
	}

	.about a {
		color: var(--paper-text);
		font-weight: 800;
		font-size: 19px;
	}

	.motd,
	.leader {
		color: var(--paper-muted);
	}

	.numbers {
		font-size: 14px;
		text-align: right;
	}
</style>
