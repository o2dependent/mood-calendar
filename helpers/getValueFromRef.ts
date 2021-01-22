// ts validation
export function getValueFromRef(ref): string {
	const current = ref.current;
	if (current) {
		return current.value;
	}
}
