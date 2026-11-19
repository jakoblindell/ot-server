// A row of tabs or links that scrolls sideways on narrow screens (the
// highscore skills, the account and admin menus). The row fades out at the
// edge that has more to show (see .scroll-row in app.css), and the current
// link is scrolled into view.
//
//   <nav class="scroll-row" data-scroll-x use:scrollRow={page.url.href}>...</nav>
//
// The parameter is only there so the row looks again after a client-side
// navigation (a layout's menu stays on the page). data-scroll-x tells the
// layout check (tests/layout.spec.ts) that this row scrolls on purpose.
export function scrollRow(row: HTMLElement, _key?: unknown) {
	const update = () => {
		const end = row.scrollWidth - row.clientWidth;
		row.classList.toggle('more-left', row.scrollLeft > 1);
		row.classList.toggle('more-right', row.scrollLeft < end - 1);
	};
	const reveal = () => {
		const current = row.querySelector<HTMLElement>('[aria-current="page"], [aria-current="true"]');
		if (!current || row.scrollWidth <= row.clientWidth) return;
		const left = current.getBoundingClientRect().left - row.getBoundingClientRect().left + row.scrollLeft;
		const right = left + current.offsetWidth;
		if (left < row.scrollLeft || right > row.scrollLeft + row.clientWidth) {
			row.scrollLeft = left - (row.clientWidth - current.offsetWidth) / 2;
		}
	};
	reveal();
	update();
	row.addEventListener('scroll', update, { passive: true });
	const resized = new ResizeObserver(() => {
		reveal();
		update();
	});
	resized.observe(row);
	return {
		update() {
			reveal();
			update();
		},
		destroy() {
			row.removeEventListener('scroll', update);
			resized.disconnect();
		}
	};
}
