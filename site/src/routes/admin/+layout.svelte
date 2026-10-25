<script lang="ts">
	import { page } from '$app/state';
	import './admin.css';

	let { data, children } = $props();

	const sections = $derived([
		{ title: 'Overview', links: [{ href: '/admin', label: 'Dashboard', show: true }] },
		{
			title: 'Server',
			links: [
				{ href: '/admin/log', label: 'Console', show: data.staff.can.server },
				{ href: '/admin/files', label: 'Server files', show: data.staff.can.files },
				{ href: '/admin/changes', label: 'Pending changes', show: data.staff.can.files },
				{ href: '/admin/config', label: 'Config & rates', show: data.staff.can.files },
				{ href: '/admin/backups', label: 'Backups', show: data.staff.can.server }
			]
		},
		{
			title: 'Players',
			links: [
				{ href: '/admin/players', label: 'Players & accounts', show: data.staff.can.players },
				{ href: '/admin/bans', label: 'Bans', show: data.staff.can.punish }
			]
		},
		{ title: 'Content', links: [{ href: '/admin/news', label: 'News posts', show: data.staff.can.news }] },
		{
			title: 'System',
			links: [
				{ href: '/admin/audit', label: 'Audit log', show: true },
				{ href: '/admin/staff', label: 'Staff & roles', show: data.staff.can.staff }
			]
		}
	]);
	const current = (href: string) => (href === '/admin' ? page.url.pathname === '/admin' : page.url.pathname.startsWith(href));
</script>

<div class="admin">
	<div class="stripe" aria-hidden="true"></div>
	<header class="top">
		<a class="brand" href="/admin">
			<span class="name">{data.serverName}</span>
			<span class="tag mono">ADMIN</span>
		</a>
		<form class="search" method="GET" action="/admin/players" role="search">
			<label for="admin-q" class="visually-hidden">Search players and accounts</label>
			<input id="admin-q" name="q" type="search" placeholder="Search characters, accounts, emails, IPs…" />
		</form>
		<div class="me">
			<a href="/">View site ↗</a>
			<span class="who"><span class="avatar mono">{data.staff.role === 'God' ? 'GD' : 'GM'}</span>{data.staff.name} <span class="muted">· {data.staff.role}</span></span>
		</div>
	</header>
	<div class="body">
		<nav class="side" aria-label="Admin">
			{#each sections as section (section.title)}
				{#if section.links.some((link) => link.show)}
					<div class="group">
						<span class="mono heading">{section.title.toUpperCase()}</span>
						{#each section.links.filter((link) => link.show) as link (link.href)}
							<a href={link.href} aria-current={current(link.href) ? 'page' : undefined}>{link.label}</a>
						{/each}
					</div>
				{/if}
			{/each}
		</nav>
		<main class="content">
			{@render children()}
		</main>
	</div>
</div>
