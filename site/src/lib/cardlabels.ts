// For <table class="cards">: gives every body cell its column's name
// (data-label), which phones show beside the value (see table.cards in
// app.css). Follows rows added or changed later.
//
//   <table class="cards" use:cardLabels>
export function cardLabels(table: HTMLTableElement) {
	const label = () => {
		const names = [...table.querySelectorAll('thead th')].map((th) => th.textContent?.trim() ?? '');
		for (const row of table.tBodies) {
			for (const tr of row.rows) {
				let column = 0;
				for (const cell of tr.cells) {
					const name = names[column];
					if (name && cell.colSpan === 1 && !cell.dataset.label) cell.dataset.label = name;
					column += cell.colSpan;
				}
			}
		}
	};
	label();
	const observer = new MutationObserver(label);
	observer.observe(table, { childList: true, subtree: true });
	return { destroy: () => observer.disconnect() };
}
