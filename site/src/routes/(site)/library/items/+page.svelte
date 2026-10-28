<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>{data.category ? `${data.category.name} · ` : ''}Items · Library · {data.serverName}</title>
</svelte:head>

<main class="wrap page">
	<section class="card" aria-labelledby="items-h">
		<div class="card-head">
			<h1 id="items-h">{data.category ? data.category.name : 'Items'}</h1>
			<a class="note" href={data.category || data.query ? '/library/items' : '/library'}>{data.category || data.query ? '‹ All categories' : '‹ Library'}</a>
		</div>
		<div class="card-body">
			<form method="GET" class="search" role="search">
				<label class="field grow">Search items <input name="q" value={data.query} minlength="2" autocomplete="off" /></label>
				<button class="button" type="submit">Search</button>
				{#if data.query}<a class="button ghost" href="/library/items">Reset</a>{/if}
			</form>

			{#if data.category || data.query.length >= 2}
				{#if data.items.length}
					<ul class="list">
						{#each data.items as item (item.id)}
							<li>
								<img src="/item/{item.id}.png" alt="" loading="lazy" />
								<a href="/library/items/{item.id}">{item.name}</a>
								<span class="detail">{item.detail}</span>
							</li>
						{/each}
					</ul>
				{:else}
					<p class="empty">No item matches “{data.query}”.</p>
				{/if}
			{:else}
				{#each data.groups as group (group.name)}
					<section class="group" aria-label={group.name}>
						<h2>{group.name}</h2>
						<div class="grid">
							{#each group.categories as category (category.slug)}
								<a class="tile" href="?c={category.slug}">
									<img src="/item/{category.icon}.png" alt="" loading="lazy" />
									<span>{category.name}</span>
									<span class="count">{category.count}</span>
								</a>
							{/each}
						</div>
					</section>
				{/each}
			{/if}
		</div>
	</section>
</main>

<style>
	.page {
		width: 100%;
		max-width: 1000px;
		padding-top: 32px;
		padding-bottom: 72px;
	}
	.note {
		color: var(--hero-soft);
		font-size: 15px;
	}
	.search {
		display: flex;
		gap: 12px;
		align-items: flex-end;
		flex-wrap: wrap;
		margin-bottom: 20px;
	}
	.grow {
		flex: 1 1 260px;
	}
	.group h2 {
		margin: 18px 0 10px;
		padding: 6px 12px;
		background: var(--head);
		color: var(--head-text);
		border-radius: 4px;
		font-size: 18px;
	}
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
		gap: 8px;
	}
	.tile {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 4px;
		padding: 10px 6px;
		border-radius: 6px;
		text-decoration: none;
		color: var(--link, inherit);
		font-weight: bold;
		text-align: center;
	}
	.tile:hover {
		background: color-mix(in srgb, var(--paper-muted) 25%, transparent);
	}
	.tile img,
	.list img {
		width: 32px;
		height: 32px;
		image-rendering: pixelated;
	}
	.count {
		font-weight: normal;
		font-size: 13px;
		color: var(--paper-muted);
	}
	.list {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.list li {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 6px 0;
		border-bottom: 1px solid color-mix(in srgb, var(--paper-muted) 30%, transparent);
	}
	.detail {
		margin-left: auto;
		color: var(--paper-muted);
		font-size: 14px;
	}
	.empty {
		color: var(--paper-muted);
	}
</style>
