<script lang="ts">
	let { data } = $props();
	const guide = $derived(data.guide);
	const stars = (n: number) => '★'.repeat(n) + '☆'.repeat(Math.max(0, 5 - n));
	const levels = (from: number, to: number | null) => (to === null || to >= 999 ? `${from}+` : `${from}–${to}`);
	const times = (n: number) => `${n}×`;
	const title = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);
</script>

<svelte:head>
	<title>Daily hunts · {data.serverName}</title>
	<meta name="description" content="How daily hunts work: pick up a hunt at a taskmaster, build a streak, earn experience and surprise boxes." />
</svelte:head>

<main class="wrap page">
	<section class="card" aria-labelledby="dh-h">
		<div class="card-head"><h1 id="dh-h">Daily hunts</h1><span class="note">One hunt a day, a present every time</span></div>
		<div class="card-body prose">
			<p>
				Every day a taskmaster has a hunt for you: a creature that fits your level, somewhere you may never have hunted.
				Finish it and you get experience and a surprise box. Finish one every day and the rewards grow.
			</p>

			<h2>How it works</h2>
			<ol class="steps">
				<li><span class="pixel num">1</span> Greet a taskmaster and say <kbd>task</kbd> to get your hunt (from level {guide.minLevel}).</li>
				<li><span class="pixel num">2</span> Kill the creatures. Any blow you land counts: you need not strike the last one, so hunting together counts for everyone.</li>
				<li><span class="pixel num">3</span> Return and say <kbd>reward</kbd> for your experience and present.</li>
				<li><span class="pixel num">4</span> Say <kbd>progress</kbd> at any time to see your count and the time left.</li>
				<li><span class="pixel num">5</span> Say <kbd>cancel</kbd> to give a hunt up. Your streak ends and you wait for the next one.</li>
			</ol>

			<h2>When</h2>
			<ul>
				<li>A new hunt comes with each server save, and at least {guide.cooldownHours} hours after your last one ended. Finish at 08:00 with the save at 09:00, and the next one is ready at {(8 + guide.cooldownHours).toString().padStart(2, '0')}:00.</li>
				<li>Once you pick a hunt up you have <strong>{guide.expiryHours} hours</strong> to hand it in. After that it fails and your streak ends.</li>
				<li>A hunt like “orcs” counts every kind of orc.</li>
			</ul>

			<h2>Streak</h2>
			<p>Finish a hunt on days in a row and your experience grows. Miss a day, cancel or run out of time and it starts over.</p>
			<div class="scroll">
				<table class="table streak">
					<thead><tr><th>Day</th>{#each guide.streak as _, i (i)}<th>{i + 1}{i === guide.streak.length - 1 ? '+' : ''}</th>{/each}</tr></thead>
					<tbody><tr><th>Experience</th>{#each guide.streak as value, i (i)}<td>{times(value)}</td>{/each}</tr></tbody>
				</table>
			</div>
			<p>A longer streak also brings better presents.</p>

			<h2>Surprise boxes</h2>
			<p>
				Every box holds gold, and with luck something more: gems, rings, and in the best boxes rare equipment. Harder hunts, a higher
				level and a longer streak make a better box more likely. Anyone can find the best one; it just takes luck.
			</p>
			<ul class="boxes">
				{#each guide.boxes as box (box.name)}
					<li><img src="/item/3218.png" alt="" class="box" /><strong>{title(box.name)}</strong><span>about {box.gold.toLocaleString('en-GB')} gold</span><em>{box.rarity}</em></li>
				{/each}
			</ul>
		</div>
	</section>

	{#each guide.groups as group (group.name)}
		<section class="card" aria-labelledby="g-{group.name}">
			<div class="card-head"><h2 id="g-{group.name}">{group.name}</h2><span class="note">Levels {levels(group.from, group.to)}</span></div>
			<div class="card-body">
				<ul class="hunts">
					{#each group.hunts as hunt (hunt.name)}
						<li>
							<div class="hunt-head">
								<strong>{title(hunt.name)}</strong>
								<span class="lv">Levels {levels(hunt.from, hunt.to)}</span>
								<span class="stars" title="Difficulty: harder hunts give better presents" aria-label="Difficulty {hunt.difficulty} of 5">{stars(hunt.difficulty)}</span>
							</div>
							<div class="monsters">
								{#each hunt.monsters as monster (monster.name)}
									{#if monster.slug}
										<a href="/library/creatures/{monster.slug}">{#if monster.image}<img src={monster.image} alt="" loading="lazy" />{/if}{monster.name}</a>
									{:else}
										<span>{monster.name}</span>
									{/if}
								{/each}
							</div>
						</li>
					{/each}
				</ul>
			</div>
		</section>
	{/each}
</main>

<style>
	.page {
		width: 100%;
		max-width: 1000px;
		padding-top: 32px;
		padding-bottom: 72px;
		display: flex;
		flex-direction: column;
		gap: 28px;
	}
	.note {
		color: var(--hero-soft);
		font-size: 15px;
	}
	.prose h2 {
		margin: 24px 0 8px;
	}
	.steps {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.num {
		display: inline-block;
		min-width: 22px;
		margin-right: 6px;
		color: var(--head);
	}
	kbd {
		font-family: inherit;
		font-weight: 700;
		padding: 0 6px;
		border: 1px solid var(--paper-muted);
		border-radius: 3px;
		background: var(--paper-rule);
	}
	.streak th,
	.streak td {
		text-align: center;
	}
	.boxes,
	.hunts {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.boxes li {
		display: grid;
		grid-template-columns: 36px 1fr auto;
		grid-template-rows: auto auto;
		column-gap: 12px;
		align-items: center;
		padding: 6px 0;
		border-bottom: 1px dashed var(--paper-rule);
	}
	.boxes .box {
		grid-row: span 2;
		width: 32px;
		height: 32px;
		image-rendering: pixelated;
	}
	.boxes span {
		grid-column: 2;
		font-size: 15px;
	}
	.boxes em {
		grid-column: 3;
		grid-row: 1 / span 2;
		font-size: 15px;
	}
	.hunts li {
		padding: 10px 0;
		border-bottom: 1px dashed var(--paper-rule);
	}
	.hunt-head {
		display: flex;
		flex-wrap: wrap;
		gap: 4px 14px;
		align-items: baseline;
	}
	.lv {
		font-size: 15px;
		color: var(--paper-muted);
	}
	.stars {
		margin-left: auto;
		color: var(--head);
		letter-spacing: 2px;
	}
	.monsters {
		display: flex;
		flex-wrap: wrap;
		gap: 6px 14px;
		margin-top: 6px;
	}
	.monsters a,
	.monsters span {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		font-size: 15px;
	}
	.monsters img {
		width: 32px;
		height: 32px;
		image-rendering: pixelated;
	}
</style>
