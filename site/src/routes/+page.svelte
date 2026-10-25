<script lang="ts">
	let { data } = $props();

	const uptime = $derived.by(() => {
		const minutes = Math.floor(data.status.uptimeSeconds / 60);
		const days = Math.floor(minutes / 1440);
		const hours = Math.floor((minutes % 1440) / 60);
		return (days ? `${days}d ` : '') + `${hours}h ${String(minutes % 60).padStart(2, '0')}m`;
	});
	const zone = $derived(
		new Intl.DateTimeFormat('en-GB', { timeZone: data.serverSave.timeZone, timeZoneName: 'short' })
			.formatToParts(new Date())
			.find((part) => part.type === 'timeZoneName')?.value ?? ''
	);
	const rate = (value: number) => (value ? `x${value}` : '–');
</script>

<svelte:head>
	<title>{data.serverName} · Classic Tibia 7.92</title>
</svelte:head>

<section class="hero">
	<div class="sky" aria-hidden="true"></div>
	<div class="wrap intro">
		<span class="kicker pixel">Protocol 7.92 · Classic experience · No bots tolerated</span>
		<h1>The old world,<br /><span>as you remember it.</span></h1>
		<p>
			Rookgaard at dawn, a backpack full of worms, and a long walk to Thais. Our classic rules keep the server slow,
			social and fair.
		</p>
		<div class="ctas">
			{#if data.account}
				<a class="button big" href="/play/">Play now</a>
				<a class="button big ghost" href="/account">My account</a>
			{:else}
				<a class="button big" href="/create-account">Create account</a>
				<a class="button big ghost" href="/play/">Play in your browser</a>
			{/if}
		</div>
	</div>
	<div class="wrap strip">
		<div class="stats">
			<div class="stat">
				<span class="label">Server</span>
				<span class="value" style:color={data.status.online ? 'var(--online-text)' : 'var(--text-muted)'}>
					<span class="dot" class:off={!data.status.online}></span>{data.status.online ? 'Online' : 'Offline'}
				</span>
			</div>
			<div class="stat">
				<span class="label">Players online</span>
				<span class="value">{data.status.playersOnline} <small>/ record {data.status.playersPeak}</small></span>
			</div>
			<div class="stat">
				<span class="label">Uptime</span>
				<span class="value">{data.status.online ? uptime : '–'}</span>
			</div>
			<div class="stat">
				<span class="label">Next server save</span>
				<span class="value">{data.serverSave.time} <small>{zone}</small></span>
			</div>
			<div class="stat">
				<span class="label">Client</span>
				<span class="value">{data.status.clientVersion || '7.92'}</span>
			</div>
		</div>
	</div>
</section>

<main class="wrap columns">
	<div class="main">
		<section class="card" aria-labelledby="welcome">
			<div class="card-head"><h2 id="welcome">Welcome to {data.serverName}</h2></div>
			<div class="card-body text">
				<p>
					{data.serverName} is a classic Tibia 7.92 world. Everyone starts on Rookgaard; there are no shortcuts, just the world
					as it was.
				</p>
				<p>
					Play right here in your browser, on a computer or a phone, or install it as an app. Create an account, pick your
					first character and press <strong>Play now</strong>.
				</p>
			</div>
		</section>
	</div>

	<aside class="side">
		{#if !data.account}
			<section class="card" aria-labelledby="side-account">
				<div class="card-head"><h2 id="side-account">Account</h2></div>
				<div class="card-body">
					<form class="form" method="POST" action="/login">
						<label class="field">Account name <input name="account" autocomplete="username" required /></label>
						<label class="field"
							>Password <input name="password" type="password" autocomplete="current-password" required /></label
						>
						<button class="button wide" type="submit">Log in</button>
						<a href="/create-account">Create account</a>
					</form>
				</div>
			</section>
		{/if}
		<section class="card" aria-labelledby="rates">
			<div class="card-head"><h2 id="rates">Server rates</h2></div>
			<div class="card-body">
				<dl class="rates">
					<dt>Experience</dt>
					<dd class="pixel">stages</dd>
					<dt>Skills</dt>
					<dd class="pixel">{rate(data.status.rates.skill)}</dd>
					<dt>Magic level</dt>
					<dd class="pixel">{rate(data.status.rates.magic)}</dd>
					<dt>Loot</dt>
					<dd class="pixel">{rate(data.status.rates.loot)}</dd>
				</dl>
			</div>
		</section>
	</aside>
</main>

<style>
	.hero {
		position: relative;
		overflow: hidden;
		background: var(--sky);
	}

	.sky {
		position: absolute;
		inset: 0;
		background: url('/hero.svg') center bottom / cover no-repeat;
		image-rendering: pixelated;
	}

	.sky::after {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(180deg, transparent 45%, color-mix(in srgb, var(--bg) 85%, transparent) 85%, var(--bg) 100%);
	}

	.intro {
		position: relative;
		padding-top: 96px;
		padding-bottom: 56px;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 22px;
	}

	.kicker {
		font-size: 14px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--accent);
	}

	h1 {
		font-size: clamp(44px, 6vw, 84px);
		line-height: 1;
		color: var(--hero-text);
		text-shadow: 0 3px 0 rgba(0, 0, 0, 0.45);
	}

	h1 span {
		color: var(--accent);
	}

	.intro p {
		margin: 0;
		max-width: 620px;
		font-size: 20px;
		color: var(--hero-soft);
	}

	.ctas {
		display: flex;
		flex-wrap: wrap;
		gap: 14px;
		justify-content: center;
		margin-top: 8px;
	}

	.ctas .ghost {
		background: rgba(21, 17, 12, 0.55);
		color: var(--hero-text);
	}

	.strip {
		position: relative;
		padding-bottom: 40px;
	}

	.columns {
		padding-top: 24px;
		padding-bottom: 64px;
		display: flex;
		flex-wrap: wrap;
		gap: 28px;
		align-items: flex-start;
		width: 100%;
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
		display: flex;
		flex-direction: column;
		gap: 28px;
	}

	.text p {
		margin: 0 0 12px;
	}

	.rates {
		display: grid;
		grid-template-columns: 1fr auto;
		margin: 0;
		row-gap: 6px;
	}

	.rates dt {
		font-weight: 700;
	}

	.rates dd {
		margin: 0;
		text-align: right;
	}

	@media (max-width: 520px) {
		.intro {
			padding-top: 56px;
		}
	}
</style>
