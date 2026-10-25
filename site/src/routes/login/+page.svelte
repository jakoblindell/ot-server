<script lang="ts">
	let { data, form } = $props();
</script>

<svelte:head>
	<title>Log in · {data.serverName}</title>
</svelte:head>

<main class="scene">
	<div class="sky" aria-hidden="true"></div>
	<div class="pair">
		<section class="card login" aria-labelledby="login-h">
			<div class="card-head"><h1 id="login-h">Log in</h1></div>
			<form class="form card-body" method="POST">
				{#if form?.error}<p class="notice error" role="alert">{form.error}</p>{/if}
				<label class="field"
					>Account name
					<input name="account" autocomplete="username" value={form?.account ?? ''} required maxlength="32" /></label
				>
				<label class="field"
					>Password <input name="password" type="password" autocomplete="current-password" required /></label
				>
				<div class="row">
					<label class="check"><input type="checkbox" name="remember" checked={form?.remember} />Keep me logged in</label>
					<a href="/lost-account">Lost your account?</a>
				</div>
				<button class="button wide big" type="submit">Log in</button>
			</form>
		</section>

		<section class="panel new" aria-labelledby="new-h">
			<h2 id="new-h">New to {data.serverName}?</h2>
			<ol>
				<li>
					<span class="step pixel">1</span><span
						><strong>Create a free account</strong><br /><span>Pick an account name and your first character.</span></span
					>
				</li>
				<li>
					<span class="step pixel">2</span><span
						><strong>Press Play now</strong><br /><span>The game runs in your browser, on a computer or a phone.</span></span
					>
				</li>
				<li>
					<span class="step pixel">3</span><span
						><strong>Wake up on Rookgaard</strong><br /><span>Choose your vocation when you reach level 8.</span></span
					>
				</li>
			</ol>
			<a class="button ghost" href="/create-account">Create account ›</a>
		</section>
	</div>
</main>

<style>
	.scene {
		flex: 1;
		position: relative;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 72px 24px 96px;
		background: var(--sky);
	}

	.sky {
		position: absolute;
		inset: 0;
		background: url('/hero.svg') center bottom / cover no-repeat;
		image-rendering: pixelated;
		opacity: 0.85;
	}

	.pair {
		position: relative;
		width: 100%;
		max-width: 940px;
		display: flex;
		flex-wrap: wrap;
		gap: 28px;
		align-items: stretch;
	}

	.login {
		flex: 1 1 400px;
	}

	.login .card-head h1 {
		font-size: 30px;
	}

	.row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 8px;
		font-size: 15px;
	}

	.row a {
		font-weight: 700;
	}

	.new {
		flex: 1 1 300px;
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	ol {
		margin: 0;
		padding: 0;
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 14px;
	}

	li {
		display: flex;
		gap: 14px;
	}

	li strong {
		color: var(--text-bright);
	}

	li span span {
		color: var(--text-soft);
	}

	.step {
		flex: 0 0 32px;
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--head);
		color: var(--head-text);
		border-radius: 3px;
	}

	.new .button {
		margin-top: auto;
		align-self: flex-start;
	}

	@media (max-width: 520px) {
		.scene {
			padding: 32px 16px 48px;
		}
	}
</style>
