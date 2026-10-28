<script lang="ts">
	let { data, form } = $props();
</script>

<svelte:head>
	<title>Library · Admin · {data.serverName}</title>
</svelte:head>

<div class="page-head">
	<div>
		<h1>Library</h1>
		<p>What players may see on the website's library and in the client's item cards. Exact drop chances are never shown to players.</p>
	</div>
</div>

{#if form?.message}<p class="flash" role="status">{form.message}</p>{/if}
{#if form?.error}<p class="flash error" role="alert">{form.error}</p>{/if}

<section class="panel">
	<div class="panel-head"><h2>Rare loot</h2></div>
	<div class="panel-body">
		<form method="post" action="?/lootVisibility" class="row">
			<label>
				Players see loot up to
				<select name="tier">
					{#each data.rarities as name, tier (name)}
						<option value={tier} selected={tier === data.lootShownUpTo}>{tier === data.rarities.length - 1 ? `${name} (all)` : name}</option>
					{/each}
				</select>
			</label>
			<button class="btn small-btn">Save</button>
		</form>
		<p class="muted">Rarer drops show as “Unknown” on a creature's page. Single drops can be hidden in the <a href="/admin/monsters">monster editor</a> (“Players see”).</p>
	</div>
</section>

<section class="panel">
	<div class="panel-head"><h2>Hidden items</h2></div>
	<div class="panel-body">
		<p class="muted">Hidden items are not in the library or the client's item data, and show as “Unknown” in creatures' loot.</p>
		<datalist id="all-items">
			{#each data.items as [id, name] (id)}<option value={name}>{id}</option>{/each}
		</datalist>
		<form method="post" action="?/hide" class="row">
			<label>Item (name or id) <input name="item" list="all-items" required autocomplete="off" /></label>
			<button class="btn small-btn">Hide</button>
		</form>
		{#if data.hidden.length}
			<table>
				<tbody>
					{#each data.hidden as item (item.id)}
						<tr>
							<td><img src="/item/{item.id}.png" alt="" class="pic" /></td>
							<td>{item.name}</td>
							<td class="muted">{item.id}</td>
							<td>
								<form method="post" action="?/show"><input type="hidden" name="id" value={item.id} /><button class="btn small-btn">Show again</button></form>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{:else}
			<p class="muted">No item is hidden.</p>
		{/if}
	</div>
</section>

<style>
	.row {
		display: flex;
		gap: 8px;
		align-items: flex-end;
		flex-wrap: wrap;
		margin-bottom: 10px;
	}
	.pic {
		width: 32px;
		height: 32px;
		image-rendering: pixelated;
	}
	.panel {
		margin-bottom: 16px;
	}
</style>
