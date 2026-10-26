<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>Privacy · {data.serverName}</title>
</svelte:head>

<main class="wrap page">
	<section class="card">
		<div class="card-head"><h1>Privacy</h1></div>
		<div class="card-body text">
			<p>{data.serverName} is a hobby project. We keep only what running the game and this site needs, and we do not sell or share it.</p>
			<h2>What we store</h2>
			<ul>
				<li><strong>Your account:</strong> account name, email address, and your password as a salted hash (never the password itself).</li>
				<li><strong>Your characters</strong> and everything the game saves about them; character names, levels, deaths and guilds are public.</li>
				<li><strong>Addresses:</strong> the IP address of your last game login and of logins on this website, to protect accounts and fight cheating.</li>
				<li><strong>Things you write:</strong> news comments, reports, and staff notes about rule breaking.</li>
			</ul>
			<h2>Cookies</h2>
			<p>
				One cookie keeps you logged in and one remembers the colour scheme you picked. There is no advertising or tracking. The account
				forms use Cloudflare Turnstile to keep robots out, which checks your browser.
			</p>
			<h2>Email</h2>
			<p>We only email you to confirm your address or to help you get back into your account.</p>
			<h2>Deleting your data</h2>
			<p>
				You can delete characters on your account page. To delete your whole account, ask on the <a href="/support">support page</a>. Database
				backups are kept for two weeks.
			</p>
		</div>
	</section>
</main>

<style>
	.page {
		width: 100%;
		max-width: 860px;
		padding-top: 32px;
		padding-bottom: 72px;
	}

	.text h2 {
		font-size: 22px;
		margin: 20px 0 6px;
	}

	.text p {
		margin: 0;
	}

	.text ul {
		margin: 0;
		padding-left: 20px;
	}

	.text li {
		margin-bottom: 6px;
	}
</style>
