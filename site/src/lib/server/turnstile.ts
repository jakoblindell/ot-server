import { config } from './config';

// Cloudflare Turnstile (the "I am human" check). Without keys configured the
// check passes, for local development.
export const turnstileEnabled = () => !!config.turnstile.siteKey && !!config.turnstile.secret;

export async function checkTurnstile(token: string, ip: string): Promise<boolean> {
	if (!turnstileEnabled()) return true;
	if (!token) return false;
	try {
		const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
			method: 'POST',
			body: new URLSearchParams({ secret: config.turnstile.secret, response: token, remoteip: ip }),
			signal: AbortSignal.timeout(10_000)
		});
		const result = (await response.json()) as { success?: boolean };
		return result.success === true;
	} catch (error) {
		console.error('Turnstile check failed:', error);
		return false;
	}
}
