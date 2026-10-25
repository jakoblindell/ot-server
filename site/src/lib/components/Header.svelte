<script lang="ts">
	import { page } from '$app/state';
	import Logo from './Logo.svelte';

	let {
		serverName,
		online,
		playersOnline,
		loggedIn
	}: { serverName: string; online: boolean; playersOnline: number; loggedIn: boolean } = $props();

	const links = [
		{ href: '/', label: 'News' },
		{ href: '/download', label: 'Download' },
		{ href: '/rules', label: 'Rules' }
	];
</script>

<header>
	<div class="wrap bar">
		<a class="brand" href="/">
			<Logo />
			<span class="names">
				<span class="name">{serverName}</span>
				<span class="tagline">Classic 7.92 world</span>
			</span>
		</a>
		<nav aria-label="Main">
			{#each links as link (link.href)}
				<a href={link.href} aria-current={page.url.pathname === link.href ? 'page' : undefined}>{link.label}</a>
			{/each}
		</nav>
		<div class="actions">
			<span class="badge pixel" class:off={!online}>
				<span class="dot" class:off={!online}></span>
				{online ? `${playersOnline} online` : 'Offline'}
			</span>
			{#if loggedIn}
				<a class="outline" href="/account">My account</a>
			{:else}
				<a class="outline" href="/login">Log in</a>
			{/if}
			<a class="play" href="/play/">Play now</a>
		</div>
	</div>
</header>

<style>
	header {
		background: var(--surface);
		border-bottom: 1px solid var(--border);
	}

	.bar {
		padding-top: 14px;
		padding-bottom: 14px;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 16px 32px;
	}

	.brand {
		display: flex;
		align-items: center;
		gap: 12px;
		text-decoration: none;
	}

	.names {
		display: flex;
		flex-direction: column;
		line-height: 1.05;
	}

	.name {
		font-family: 'IM Fell English SC', serif;
		font-size: 30px;
		color: var(--accent);
	}

	.tagline {
		font-size: 12px;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--text-muted);
	}

	nav {
		display: flex;
		flex-wrap: wrap;
		gap: 4px 22px;
		flex: 1 1 360px;
		font-weight: 500;
		font-size: 16px;
	}

	nav a {
		color: var(--text);
		text-decoration: none;
		padding: 10px 0;
	}

	nav a:hover,
	nav a[aria-current='page'] {
		color: var(--accent);
	}

	.actions {
		display: flex;
		align-items: center;
		gap: 12px;
		flex-wrap: wrap;
	}

	.badge {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		font-size: 14px;
		color: var(--online-text);
		background: var(--online-bg);
		border: 1px solid var(--online-border);
		padding: 6px 12px;
		border-radius: 4px;
	}

	.badge.off {
		color: var(--text-muted);
		background: transparent;
		border-color: var(--border-strong);
	}

	.badge .dot {
		width: 8px;
		height: 8px;
	}

	.outline {
		color: var(--text);
		text-decoration: none;
		padding: 10px 14px;
		border: 1px solid var(--border-strong);
		border-radius: 4px;
		font-weight: 500;
	}

	.outline:hover {
		color: var(--text-bright);
		border-color: var(--paper-muted);
	}

	.play {
		color: var(--accent-text);
		background: var(--accent);
		text-decoration: none;
		padding: 10px 18px;
		border-radius: 4px;
		font-weight: 800;
		box-shadow:
			inset 0 -3px 0 rgba(0, 0, 0, 0.25),
			inset 0 1px 0 rgba(255, 255, 255, 0.35);
	}

	.play:hover {
		color: var(--accent-text);
		filter: brightness(1.06);
	}
</style>
