<script lang="ts">
	let { data, form } = $props();
</script>

<svelte:head>
	<title>Staff · Admin · {data.serverName}</title>
</svelte:head>

<div class="page-head">
	<div>
		<h1>Staff &amp; roles</h1>
		<p>Gamemasters look after players (notes, kicks, mutes, bans up to 30 days, namelocks, news). Gods can do everything.</p>
	</div>
</div>

{#if form?.message}<p class="flash" role="status">{form.message}</p>{/if}
{#if form?.error}<p class="flash error" role="alert">{form.error}</p>{/if}

<section class="panel">
	<div class="scroll">
		<table>
			<thead><tr><th>Account</th><th>Role</th><th>Characters</th><th>Two-step login</th></tr></thead>
			<tbody>
				{#each data.members as member (member.id)}
					<tr>
						<td class="mono">{member.name}</td>
						<td><span class="pill" class:warn={member.type >= 5}>{member.role}</span></td>
						<td>{member.characters ?? '–'}</td>
						<td>{#if member.totp}<span class="pill ok">on</span>{:else}<span class="pill bad">off</span>{/if}</td>
					</tr>
				{:else}
					<tr><td colspan="4" class="muted">No staff.</td></tr>
				{/each}
			</tbody>
		</table>
	</div>
</section>

<section class="panel">
	<div class="panel-head"><h2>Change a role</h2></div>
	<form class="panel-body row" method="POST" action="?/setRole">
		<label class="stack">Account name <input name="account" required /></label>
		<label class="stack"
			>Role
			<select name="type">
				{#each Object.entries(data.types) as [type, label] (type)}<option value={type}>{label}</option>{/each}
			</select>
		</label>
		<button class="btn primary" type="submit">Set role</button>
	</form>
	<p class="muted note">New staff need two-step login before the admin pages open for them. Characters move to the matching game group.</p>
</section>

<style>
	.note {
		margin: 0;
		padding: 0 16px 16px;
		font-size: 13px;
	}
</style>
