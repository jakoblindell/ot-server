import { defineConfig } from '@playwright/test';

// Layout checks on phone widths (tests/layout.spec.ts). The site must be
// running against a database with tests/seed.sql loaded: see "Layout check"
// in README.md.
export default defineConfig({
	testDir: 'tests',
	fullyParallel: true,
	workers: process.env.CI ? 2 : 4,
	retries: 0,
	reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
	use: {
		baseURL: process.env.BASE_URL ?? 'http://localhost:3000',
		browserName: 'chromium',
		trace: 'retain-on-failure'
	}
});
