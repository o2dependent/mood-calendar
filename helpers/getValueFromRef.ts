// ts validation
export function getValueFromRef(ref): String {
	const current = ref.current;
	if (current) {
		return current.value;
	}
}
