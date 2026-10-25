<script lang="ts">
	let { name = '' }: { name?: string } = $props();
</script>

<form class="card search" method="GET" action="/characters" role="search">
	<div class="card-head"><h1>Characters</h1></div>
	<div class="row">
		<label class="field grow">Character name <input name="name" value={name} required maxlength="30" autocomplete="off" /></label>
		<button class="button" type="submit">Search</button>
	</div>
</form>

<style>
	.row {
		padding: 20px 24px 24px;
		display: flex;
		gap: 12px;
		align-items: flex-end;
		flex-wrap: wrap;
	}

	.grow {
		flex: 1 1 240px;
	}
</style>
