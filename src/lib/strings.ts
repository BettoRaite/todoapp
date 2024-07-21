export function startsWith(string: string, substring: string) {
	return string.replace(/\s+/g, "").startsWith(substring);
}

export function startsWithPartial(string: string, substring: string) {
	const noSpaces = string.replace(/\s+/g, "");

	if (noSpaces.startsWith(substring)) {
		return true;
	}

	const map: Record<string, number> = {};
	let lastIndex = -1;

	for (let i = 0; i < string.length; ++i) {
		if (i < substring.length) {
			const c = substring[i];
			map[c] = i;
		}
		const c = string[i];
		const index = map[c];
		if (!index) {
			continue;
		}
		if (index > lastIndex) {
			if (substring.length - 1 === index) {
				return true;
			}
			lastIndex = index;
			continue;
		}
		return false;
	}
	return true;
}
export function removeCharacters(string: string, substring: string) {
	return [...string]
		.filter((c) => {
			return !substring.includes(c);
		})
		.join("");
}
