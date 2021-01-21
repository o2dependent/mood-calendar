export default function resetRefValue(ref): void {
	if (typeof ref?.current !== 'undefined') {
		ref.current.value = '';
	}
	return;
}
