<script lang="ts">
	let { data, form } = $props();
</script>

<svelte:head>
	<title>Config & rates · Admin · {data.serverName}</title>
</svelte:head>

<div class="page-head">
	<div>
		<h1>Config &amp; rates</h1>
		<p>
			The game settings in config.lua. Network, database and the server name come from the deployment (.env).
			<a href="/admin/files?file=config.lua">Edit the whole file</a>
		</p>
	</div>
</div>

{#if form?.message}<p class="flash" role="status">{form.message}</p>{/if}
{#if form?.error}<p class="flash error" role="alert">{form.error}</p>{/if}

{#if !data.available}
	<p class="flash error">The game files are not set up yet: the server creates them on its first start.</p>
{:else}
	<form method="POST" class="panel">
		<div class="panel-body fields">
			{#each data.fields as field (field.key)}
				<label class="stack">
					<span>{field.label} <span class="mono key">{field.key}</span></span>
					{#if field.kind === 'choice'}
						<select name={field.key} value={data.values[field.key]}>
							{#each field.choices as choice (choice)}<option value={choice}>{choice}</option>{/each}
						</select>
					{:else if field.kind === 'boolean'}
						<input type="checkbox" name={field.key} checked={data.values[field.key] === 'true'} class="box" />
					{:else}
						<input name={field.key} value={data.values[field.key] ?? ''} inputmode="decimal" />
					{/if}
					{#if 'hint' in field && field.hint}<span class="hint">{field.hint}</span>{/if}
				</label>
			{/each}
		</div>
		<div class="panel-body row bar">
			<label class="check"><input type="checkbox" name="reload" /> Apply now (reload config)</label>
			<button class="btn primary" type="submit">Save</button>
		</div>
	</form>
	<p class="muted">Without "apply now", changes go live at the next server save. Some settings (world type, max players) only take full effect after a restart.</p>
{/if}

<style>
	.fields {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
		gap: 16px;
	}

	.key {
		font-size: 11px;
		color: var(--a-faint);
	}

	.hint {
		font-size: 12px;
		color: var(--a-faint);
	}

	.box {
		width: 20px;
		min-height: 20px;
	}

	.bar {
		border-top: 1px solid var(--a-line);
		justify-content: flex-end;
		align-items: center;
	}

	.check {
		display: flex;
		align-items: center;
		gap: 6px;
		font-size: 14px;
	}
</style>
