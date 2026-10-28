<script lang="ts">
	import MonsterEditor from '$lib/components/admin/MonsterEditor.svelte';

	let { data, form } = $props();

	let filter = $state('');
	const shown = $derived(
		data.available ? data.monsters.filter((monster) => !filter || monster.name.toLowerCase().includes(filter.toLowerCase())) : []
	);
	const names = $derived(new Map(data.available ? data.items : []));
</script>

<svelte:head>
	<title>Monsters · Admin · {data.serverName}</title>
</svelte:head>

<div class="page-head">
	<div>
		<h1>Monsters</h1>
		<p>
			The monster files as forms. Changes are versioned like other <a href="/admin/files">server files</a> and listed under
			<a href="/admin/changes">Pending changes</a>.
		</p>
	</div>
</div>

{#if form?.message}<p class="flash" role="status">{form.message}</p>{/if}
{#if form?.error}<p class="flash error" role="alert">{form.error}</p>{/if}

{#if !data.available}
	<p class="flash error">The game files are not set up yet: the server creates them on its first start.</p>
{:else}
	<datalist id="item-names">
		{#each data.items as [id, name] (id)}<option value={id}>{name}</option>{/each}
	</datalist>
	<div class="split">
		<section class="panel list">
			<div class="panel-head"><input type="search" placeholder="Find a monster…" bind:value={filter} aria-label="Find a monster" /></div>
			<ul>
				{#each shown as monster (monster.path + monster.name)}
					<li>
						<a href="?file={encodeURIComponent(monster.path)}" aria-current={data.editor?.path === monster.path ? 'true' : undefined}>
							<span class="pic">{#if monster.look}<img src={monster.look} alt="" loading="lazy" />{/if}</span>
							<span class="name">{monster.name}</span>
							<span class="meta muted">{monster.health} hp · {monster.experience} xp</span>
						</a>
						{#if monster.pending}<span class="pill warn">pending</span>{/if}
					</li>
				{/each}
			</ul>
		</section>
		<div>
			{#if data.editor?.doc}
				{#key data.editor.path}
					<MonsterEditor doc={data.editor.doc} path={data.editor.path} {names} />
				{/key}
			{:else if data.editor}
				<p class="flash error">This file could not be read as a monster: {data.editor.error}. <a href="/admin/files?file={encodeURIComponent(data.editor.path)}">Edit the XML</a>.</p>
			{:else}
				<section class="panel"><div class="panel-body muted">Pick a monster on the left. {data.monsters.length} monsters.</div></section>
			{/if}
		</div>
	</div>
{/if}

<style>
	.split {
		display: grid;
		grid-template-columns: 280px 1fr;
		gap: 16px;
		align-items: start;
	}
	.list ul {
		list-style: none;
		margin: 0;
		padding: 4px;
		max-height: 75vh;
		overflow: auto;
	}
	.list li {
		display: flex;
		align-items: center;
		gap: 6px;
	}
	.list a {
		flex: 1;
		display: grid;
		grid-template-columns: 34px 1fr;
		grid-template-rows: auto auto;
		column-gap: 8px;
		padding: 4px 6px;
		border-radius: 5px;
		text-decoration: none;
	}
	.list a[aria-current='true'] {
		background: rgba(255, 255, 255, 0.08);
	}
	.pic {
		grid-row: span 2;
		width: 32px;
		height: 32px;
	}
	.pic img {
		max-width: 32px;
		max-height: 32px;
		image-rendering: pixelated;
	}
	.meta {
		font-size: 12px;
	}
	@media (max-width: 900px) {
		.split {
			grid-template-columns: 1fr;
		}
	}
</style>
