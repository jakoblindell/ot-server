<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>Rules · {data.serverName}</title>
</svelte:head>

<main class="wrap columns">
	<nav class="panel contents" aria-label="Contents">
		<h2>Contents</h2>
		<ol>
			{#each data.ruleSections as section, index (section.id)}
				<li><a href="#{section.id}"><span class="pixel">{index + 1}</span> {section.title}</a></li>
			{/each}
			<li><a href="#punishments"><span class="pixel">{data.ruleSections.length + 1}</span> Punishments</a></li>
		</ol>
	</nav>

	<section class="card main" aria-labelledby="rules-h">
		<div class="card-head">
			<h1 id="rules-h">Rules of {data.serverName}</h1>
			<span class="updated">Last changed {new Date(data.rulesUpdated).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
		</div>
		<div class="card-body">
			<p class="intro">By playing you accept these rules. Gamemasters decide on anything not covered here.</p>
			{#each data.ruleSections as section, index (section.id)}
				<h2 id={section.id}><span class="pixel num">{index + 1}</span> {section.title}</h2>
				<ol class="rules">
					{#each section.rules as rule, ruleIndex (rule)}
						<li><span class="pixel num">{index + 1}.{ruleIndex + 1}</span> {rule}</li>
					{/each}
				</ol>
			{/each}
			<h2 id="punishments"><span class="pixel num">{data.ruleSections.length + 1}</span> Punishments</h2>
			<div class="scroll">
				<table class="table">
					<thead><tr><th>Offence</th><th>First time</th><th>Repeated</th></tr></thead>
					<tbody>
						{#each data.punishments as row (row.offence)}
							<tr><td><strong>{row.offence}</strong></td><td>{row.first}</td><td>{row.repeated}</td></tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</section>
</main>

<style>
	.columns {
		width: 100%;
		padding-top: 40px;
		padding-bottom: 72px;
		display: flex;
		flex-wrap: wrap;
		gap: 28px;
		align-items: flex-start;
	}

	.contents {
		flex: 1 1 240px;
	}

	.contents h2 {
		font-size: 24px;
		margin-bottom: 8px;
	}

	.contents ol {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.contents a {
		display: block;
		padding: 8px 0;
		color: var(--text-soft);
		text-decoration: none;
	}

	.contents a:hover {
		color: var(--accent);
	}

	.main {
		flex: 999 1 560px;
		min-width: 0;
	}

	.updated {
		font-size: 14px;
		color: var(--hero-soft);
	}

	.intro {
		margin-top: 0;
	}

	h2 {
		font-size: 24px;
		margin: 24px 0 8px;
		scroll-margin-top: 16px;
	}

	.rules {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.rules li {
		display: flex;
		gap: 12px;
		padding: 8px 0;
		border-bottom: 1px dashed var(--paper-rule);
	}

	.num {
		color: var(--paper-muted);
		min-width: 2.2em;
	}

	.contents .pixel {
		color: var(--accent);
	}

	.scroll {
		overflow-x: auto;
	}
</style>
