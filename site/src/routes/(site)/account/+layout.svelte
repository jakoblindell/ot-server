<script lang="ts">
	import { page } from '$app/state';

	let { data, children } = $props();

	const links = [
		{ href: '/account', label: 'Overview' },
		{ href: '/account/characters/new', label: 'New character' },
		{ href: '/account/password', label: 'Password' },
		{ href: '/account/email', label: 'Email' },
		{ href: '/account/recovery-key', label: 'Recovery key' },
		{ href: '/account/two-step', label: 'Two-step login' },
		{ href: '/account/history', label: 'Login history' }
	];
</script>

<main class="wrap columns">
	<nav aria-label="Account">
		{#each links as link (link.href)}
			<a href={link.href} aria-current={page.url.pathname === link.href ? 'page' : undefined}>{link.label}</a>
		{/each}
		{#if data.me.staff}<a class="admin" href="/admin">Admin ›</a>{/if}
		<form method="POST" action="/logout"><button type="submit">Log out</button></form>
	</nav>
	<div class="main">
		{@render children()}
	</div>
</main>

<style>
	.columns {
		width: 100%;
		padding-top: 28px;
		padding-bottom: 72px;
		display: flex;
		flex-wrap: wrap;
		gap: 28px;
		align-items: flex-start;
	}

	nav {
		flex: 1 1 220px;
		display: flex;
		flex-direction: column;
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: 6px;
		padding: 8px;
	}

	nav a,
	nav button {
		display: flex;
		align-items: center;
		min-height: 44px;
		padding: 0 14px;
		border-radius: 4px;
		color: var(--text-soft);
		text-decoration: none;
		font: inherit;
		background: none;
		border: 0;
		width: 100%;
		cursor: pointer;
		text-align: left;
	}

	nav a:hover,
	nav button:hover {
		color: var(--text-bright);
	}

	nav a[aria-current='page'] {
		background: var(--head);
		color: var(--head-text);
		font-weight: 700;
	}

	nav .admin {
		color: var(--accent);
		font-weight: 700;
	}

	nav form {
		border-top: 1px solid var(--border);
		margin-top: 6px;
		padding-top: 6px;
	}

	/* Phones: the menu as a strip that scrolls sideways */
	@media (max-width: 700px) {
		nav {
			flex: 1 1 100%;
			flex-direction: row;
			overflow-x: auto;
			gap: 4px;
		}

		nav a,
		nav button {
			width: auto;
			white-space: nowrap;
		}

		nav .admin {
		color: var(--accent);
		font-weight: 700;
	}

	nav form {
			border-top: 0;
			margin-top: 0;
			padding-top: 0;
			border-left: 1px solid var(--border);
			margin-left: 4px;
			padding-left: 4px;
		}
	}

	.main {
		flex: 999 1 560px;
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: 28px;
	}
</style>
