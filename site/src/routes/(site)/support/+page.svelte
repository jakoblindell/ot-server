<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>Support · {data.serverName}</title>
</svelte:head>

<main class="wrap columns">
	<section class="card main">
		<div class="card-head"><h1>Support</h1></div>
		<div class="card-body text">
			<h2>In the game</h2>
			<p>Press <span class="pixel">Ctrl+R</span> or open the help channel to talk to a gamemaster. Report a player there or on their character page here.</p>
			<h2>Lost account</h2>
			<p>Use the <a href="/lost-account">lost account</a> page with your recovery key{data.supportEmail || data.discordUrl ? ', or contact us below' : ''}.</p>
			<h2>Bugs</h2>
			<p>Tell a gamemaster how to make the bug happen. Using a bug for your own gain is against the <a href="/rules">rules</a>.</p>
			{#if data.discordUrl || data.supportEmail}
				<h2>Contact</h2>
				<p class="contact">
					{#if data.discordUrl}<a class="button" href={data.discordUrl} rel="noopener">Join us on Discord</a>{/if}
					{#if data.supportEmail}<a class="button ghost" href="mailto:{data.supportEmail}">{data.supportEmail}</a>{/if}
				</p>
			{/if}
		</div>
	</section>
	<aside class="card side">
		<div class="card-head"><h2>Staff</h2></div>
		<div class="card-body">
			{#if data.staff.length}
				<ul>
					{#each data.staff as member (member.name)}
						<li><a href="/characters/{encodeURIComponent(member.name)}">{member.name}</a> <span class="muted">{member.role}</span> {#if member.online}<span class="online">Online</span>{/if}</li>
					{/each}
				</ul>
			{:else}
				<p>No staff characters yet.</p>
			{/if}
		</div>
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
		flex: 999 1 520px;
	}

	.side {
		flex: 1 1 280px;
	}

	.text h2 {
		font-size: 22px;
		margin: 18px 0 6px;
	}

	.text h2:first-child {
		margin-top: 0;
	}

	.text p {
		margin: 0;
	}

	.contact {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		margin-top: 8px !important;
	}

	ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	li {
		padding: 6px 0;
	}

	li a {
		color: var(--paper-text);
		font-weight: 700;
	}

	.muted {
		color: var(--paper-muted);
		font-size: 14px;
	}

	.online {
		color: var(--head);
		font-weight: 700;
		font-size: 14px;
	}
</style>
