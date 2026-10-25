<script lang="ts">
	import { blocks } from '$lib/text';

	let { body }: { body: string } = $props();
</script>

{#each blocks(body) as block, index (index)}
	{#if block.kind === 'list'}
		<ul>
			{#each block.items as item, itemIndex (itemIndex)}<li>{item}</li>{/each}
		</ul>
	{:else}
		<p>{block.text}</p>
	{/if}
{/each}
