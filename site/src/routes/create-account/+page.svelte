<script lang="ts">
	import PasswordStrength from '$lib/components/PasswordStrength.svelte';
	import Turnstile from '$lib/components/Turnstile.svelte';

	let { data, form } = $props();

	const values = $derived(form?.values);
	const errors: Record<string, string> = $derived(form?.errors ?? {});
	let password = $state('');
	let sex = $state<'male' | 'female'>('male');
	let character = $state('');
	$effect.pre(() => {
		// after a failed submit, keep what was entered
		if (form?.values) {
			sex = form.values.sex;
			character = form.values.character;
		}
	});

	// Live check of the character name, a moment after typing stops
	let nameStatus = $state<{ name: string; error: string | null } | null>(null);
	let timer: ReturnType<typeof setTimeout>;
	function checkName() {
		clearTimeout(timer);
		const name = character.trim();
		if (!name) {
			nameStatus = null;
			return;
		}
		timer = setTimeout(async () => {
			const response = await fetch(`/api/character-name?name=${encodeURIComponent(name)}`);
			if (response.ok && name === character.trim()) nameStatus = { name, error: (await response.json()).error };
		}, 400);
	}
</script>

<svelte:head>
	<title>Create account · {data.serverName}</title>
</svelte:head>

<main class="wrap columns">
	<form class="steps" method="POST" aria-label="Create account">
		{#if errors.form}<p class="notice error" role="alert">{errors.form}</p>{/if}

		<section class="card" aria-labelledby="s1">
			<div class="card-head step-head"><span class="pixel step">1</span><h2 id="s1">Account details</h2></div>
			<div class="grid">
				<label class="field"
					>Account name
					<input
						name="account"
						autocomplete="username"
						required
						minlength="3"
						maxlength="20"
						pattern="[A-Za-z0-9]+"
						value={values?.account ?? ''}
					/>
					{#if errors.account}<span class="error">{errors.account}</span>{:else}<span class="hint"
							>Letters and digits. Used to log in, never shown to other players.</span
						>{/if}
				</label>
				<label class="field"
					>Email
					<input name="email" type="email" autocomplete="email" required value={values?.email ?? ''} />
					{#if errors.email}<span class="error">{errors.email}</span>{:else}<span class="hint">For account recovery only.</span>{/if}
				</label>
				<label class="field"
					>Password
					<input
						name="password"
						type="password"
						autocomplete="new-password"
						required
						minlength="8"
						maxlength="40"
						bind:value={password}
					/>
					{#if errors.password}<span class="error">{errors.password}</span>{:else}<PasswordStrength {password} />{/if}
				</label>
				<label class="field"
					>Repeat password
					<input name="password2" type="password" autocomplete="new-password" required />
					{#if errors.password2}<span class="error">{errors.password2}</span>{/if}
				</label>
			</div>
		</section>

		<section class="card" aria-labelledby="s2">
			<div class="card-head step-head"><span class="pixel step">2</span><h2 id="s2">Your first character</h2></div>
			<div class="character">
				<div class="outfit">
					<img
						src="/outfits/{sex === 'female' ? 136 : 128}.png"
						alt="{sex === 'female' ? 'Female' : 'Male'} citizen outfit"
						width="64"
						height="64"
					/>
				</div>
				<div class="details">
					<label class="field"
						>Character name
						<input
							name="character"
							required
							minlength="3"
							maxlength="20"
							autocomplete="off"
							bind:value={character}
							oninput={checkName}
						/>
						{#if nameStatus?.error}
							<span class="error">{nameStatus.error}</span>
						{:else if nameStatus}
							<span class="ok">✓ This name is available.</span>
						{:else if errors.character}
							<span class="error">{errors.character}</span>
						{:else}
							<span class="hint">For example "Aldric" or "Mira Stoneheart".</span>
						{/if}
					</label>
					<fieldset>
						<legend>Sex</legend>
						<label class="check"><input type="radio" name="sex" value="male" bind:group={sex} />Male</label>
						<label class="check"><input type="radio" name="sex" value="female" bind:group={sex} />Female</label>
					</fieldset>
					<p class="note">
						Every character starts on Rookgaard. You choose knight, paladin, sorcerer or druid when you reach level 8. You
						pick your outfit's colours when you first log in.
					</p>
				</div>
			</div>
		</section>

		<section class="card" aria-labelledby="s3">
			<div class="card-head step-head"><span class="pixel step">3</span><h2 id="s3">Confirm</h2></div>
			<div class="confirm">
				<label class="check"
					><input type="checkbox" name="rules" checked={values?.rules} />I have read and agree to the
					<a href="/rules">server rules</a>.</label
				>
				{#if errors.rules}<span class="error">{errors.rules}</span>{/if}
				{#if data.turnstileSiteKey}
					<Turnstile siteKey={data.turnstileSiteKey} />
					{#if errors.captcha}<span class="error">{errors.captcha}</span>{/if}
				{/if}
				<div class="submit">
					<button class="button big" type="submit">Create account</button>
					<span>Already playing? <a href="/login">Log in</a></span>
				</div>
			</div>
		</section>
	</form>

	<aside class="side">
		<section class="panel">
			<h2>Rules in short</h2>
			<ul>
				<li>No bots, macros or cheat tools.</li>
				<li>Offensive names are renamed or deleted.</li>
				<li>Report bugs. Exploiting them is a ban.</li>
				<li>Be kind to other players and to staff.</li>
			</ul>
			<a href="/rules">Read the full rules ›</a>
		</section>
		<section class="panel">
			<h2>Name rules</h2>
			<p>
				3–20 letters, up to three words, each starting with a capital letter. No numbers, and no names of real people,
				staff, monsters, NPCs or spells.
			</p>
		</section>
	</aside>
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

	.steps {
		flex: 999 1 560px;
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: 28px;
	}

	.step-head {
		justify-content: flex-start;
	}

	.step {
		color: var(--head-text);
		background: var(--head-edge);
		padding: 2px 8px;
		border-radius: 3px;
	}

	.grid {
		padding: 24px;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
		gap: 20px;
	}

	.character {
		padding: 24px;
		display: flex;
		flex-wrap: wrap;
		gap: 24px;
		align-items: flex-start;
	}

	.outfit {
		flex: 0 0 128px;
		height: 128px;
		background: var(--paper-rule);
		border: 2px solid var(--paper-muted);
		border-radius: 3px;
		overflow: hidden;
	}

	.outfit img {
		width: 128px;
		height: 128px;
		image-rendering: pixelated;
	}

	.details {
		flex: 1 1 320px;
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	fieldset {
		border: 0;
		margin: 0;
		padding: 0;
		display: flex;
		gap: 24px;
	}

	legend {
		font-weight: 700;
		font-size: 15px;
		margin-bottom: 4px;
	}

	.note {
		margin: 0;
		color: var(--paper-muted);
		font-size: 16px;
	}

	.confirm {
		padding: 24px;
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.submit {
		display: flex;
		flex-wrap: wrap;
		gap: 16px;
		align-items: center;
	}

	.error {
		font-weight: 700;
		font-size: 14px;
		color: var(--danger);
	}

	.ok {
		font-weight: 700;
		font-size: 14px;
		color: var(--head);
	}

	.side {
		flex: 1 1 300px;
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: 24px;
	}

	.side .panel {
		display: flex;
		flex-direction: column;
		gap: 12px;
		color: var(--text-soft);
	}

	.side h2 {
		font-size: 24px;
	}

	.side ul {
		margin: 0;
		padding-left: 18px;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.side p {
		margin: 0;
	}

	.side a {
		color: var(--accent);
	}
</style>
