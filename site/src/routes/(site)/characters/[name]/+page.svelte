<script lang="ts">
	import CharacterSearch from '../CharacterSearch.svelte';

	let { data, form } = $props();
	let reporting = $state(false);
	const c = $derived(data.character);
	const when = (time: number) =>
		new Date(time).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
</script>

<svelte:head>
	<title>{c.name} · {data.serverName}</title>
</svelte:head>

<main class="wrap columns">
	<div class="main">
		<section class="card" aria-labelledby="info-h">
			<div class="card-head"><h1 id="info-h">Character information</h1></div>
			<div class="card-body info">
				<div class="figure">
					<img src={c.outfit} alt="" width="64" height="64" />
				</div>
				<div class="facts">
					<p class="status" class:online={c.online}><span class="dot" class:off={!c.online}></span>{c.online ? 'Online now' : 'Offline'}</p>
					<h2>{c.name}</h2>
					{#if c.comment}<p class="comment">“{c.comment}”</p>{/if}
					<dl>
						{#each c.info as row (row.label)}
							<dt>{row.label}</dt>
							<dd>{row.date ? when(row.date) : row.value}</dd>
						{/each}
						{#if data.guild}
							<dt>Guild</dt>
							<dd>{data.guild.rank} of <a href="/guilds/{encodeURIComponent(data.guild.guild)}">{data.guild.guild}</a>{data.guild.nick ? ` (${data.guild.nick})` : ''}</dd>
						{/if}
					</dl>
				</div>
			</div>
		</section>

		<section class="card" aria-labelledby="deaths-h">
			<div class="card-head"><h2 id="deaths-h">Character deaths</h2></div>
			<div class="card-body">
				{#if data.deaths.length}
					<ul class="deaths">
						{#each data.deaths as death (death.at)}
							<li>
								<span class="pixel when">{when(death.at)}</span>
								<span>
									Died at level <strong>{death.level}</strong> by
									{#if death.killer.player}<a href="/characters/{encodeURIComponent(death.killer.name)}">{death.killer.name}</a>{:else}{death.killer.name}{/if}{#if death.assist}{' and '}{#if death.assist.player}<a
												href="/characters/{encodeURIComponent(death.assist.name)}">{death.assist.name}</a
											>{:else}{death.assist.name}{/if}{/if}.
								</span>
							</li>
						{/each}
					</ul>
				{:else}
					<p class="empty">No deaths yet.</p>
				{/if}
			</div>
		</section>

		{#if data.others.length}
			<section class="card" aria-labelledby="others-h">
				<div class="card-head"><h2 id="others-h">Other characters</h2></div>
				<div class="card-body">
					<ul class="others">
						{#each data.others as other (other.name)}
							<li>
								<span class="badge pixel" style:background={other.badge.color}>{other.badge.short}</span>
								<a href="/characters/{encodeURIComponent(other.name)}">{other.name}</a>
								<span class="pixel">Lv {other.level}</span>
								{#if other.online}<span class="online">Online</span>{/if}
							</li>
						{/each}
					</ul>
				</div>
			</section>
		{/if}
	</div>

	<aside class="side">
		<section class="card" aria-labelledby="skills-h">
			<div class="card-head"><h2 id="skills-h">Skills</h2></div>
			<div class="card-body">
				<dl class="skills">
					{#each c.skills as skill (skill.label)}
						<dt>{skill.label}</dt>
						<dd class="pixel">{skill.value}</dd>
					{/each}
				</dl>
			</div>
		</section>
		<CharacterSearch />
		{#if data.loggedIn}
			<section class="card">
				<div class="card-head"><h2>Report</h2></div>
				<div class="card-body">
					{#if form?.message}<p class="notice" role="status">{form.message}</p>
					{:else if reporting}
						<form method="POST" action="?/report" class="form">
							{#if form?.error}<p class="notice error">{form.error}</p>{/if}
							<label class="field">Reason <select name="reason">{#each data.reasons as reason (reason)}<option>{reason}</option>{/each}</select></label>
							<label class="field">What happened <textarea name="text" rows="3" maxlength="1000"></textarea></label>
							<div><button class="button">Send to staff</button></div>
						</form>
					{:else}
						<button class="button ghost" type="button" onclick={() => (reporting = true)}>Report {c.name}</button>
					{/if}
				</div>
			</section>
		{/if}
	</aside>
</main>

<style>
	.columns {
		width: 100%;
		padding-top: 32px;
		padding-bottom: 72px;
		display: flex;
		flex-wrap: wrap;
		gap: 28px;
		align-items: flex-start;
	}

	.main {
		flex: 999 1 560px;
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: 28px;
	}

	.side {
		flex: 1 1 300px;
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: 28px;
	}

	.side :global(h1) {
		font-size: 22px !important;
	}

	.info {
		display: flex;
		flex-wrap: wrap;
		gap: 24px;
		align-items: flex-start;
	}

	.figure {
		flex: 0 0 128px;
		height: 128px;
		background: var(--paper-rule);
		border: 2px solid var(--paper-muted);
		border-radius: 3px;
		overflow: hidden;
	}

	.figure img {
		width: 128px;
		height: 128px;
		object-fit: contain;
		padding: 8px;
		image-rendering: pixelated;
	}

	.facts {
		flex: 1 1 280px;
		min-width: 0;
	}

	.facts h2 {
		font-size: 34px;
		margin: 2px 0 6px;
	}

	.status {
		margin: 0;
		display: flex;
		align-items: center;
		gap: 8px;
		color: var(--paper-muted);
		font-weight: 700;
	}

	.status.online,
	.online {
		color: var(--head);
		font-weight: 700;
	}

	.comment {
		font-style: italic;
		color: var(--paper-muted);
		margin: 0 0 12px;
	}

	dl {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 6px 18px;
		margin: 8px 0 0;
	}

	dt {
		font-weight: 700;
	}

	dd {
		margin: 0;
	}

	dd a,
	.deaths a,
	.others a {
		color: var(--paper-text);
		font-weight: 700;
	}

	.skills dd {
		text-align: right;
	}

	.deaths,
	.others {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.deaths li {
		display: flex;
		flex-wrap: wrap;
		gap: 4px 16px;
		padding: 10px 0;
		border-bottom: 1px dashed var(--paper-rule);
	}

	.deaths li:last-child {
		border-bottom: 0;
	}

	.when {
		font-size: 14px;
		color: var(--paper-muted);
		min-width: 150px;
	}

	.others li {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 6px 0;
	}

	.badge {
		font-size: 12px;
		color: #f6ecd4;
		padding: 2px 6px;
		border-radius: 3px;
	}

	.empty {
		margin: 0;
	}
</style>
