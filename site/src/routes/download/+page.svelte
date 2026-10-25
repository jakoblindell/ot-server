<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>Play · {data.serverName}</title>
</svelte:head>

<main class="wrap page">
	<section class="card" aria-labelledby="play-h">
		<div class="card-head"><h1 id="play-h">Play {data.serverName}</h1></div>
		<div class="card-body body">
			<p class="lead">
				The game client runs in your browser: nothing to download or install. It works on computers, tablets and phones;
				on a touch screen it switches to touch controls.
			</p>
			<p><a class="button big" href="/play/">Play now</a></p>
			<h2>Getting started</h2>
			<ol>
				<li><strong>Create an account</strong> with your first character, if you have not yet.</li>
				<li><strong>Press Play now</strong> and log in with your account name and password.</li>
				<li>
					<strong>Install it as an app</strong> (optional): the client offers it on the login screen, or use your browser's
					"Install" / "Add to Home Screen". It then opens in its own window.
				</li>
			</ol>
		</div>
	</section>
</main>

<style>
	.page {
		width: 100%;
		padding-top: 40px;
		padding-bottom: 64px;
	}

	.body h2 {
		font-size: 24px;
		margin-top: 24px;
	}

	.lead {
		font-size: 19px;
		margin-top: 0;
	}

	ol {
		padding-left: 22px;
	}

	li {
		margin-bottom: 8px;
	}
</style>
