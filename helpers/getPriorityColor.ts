// fetch priority color for check box
export default function getPriorityColor(priority: number) {
	switch (priority) {
		case 1:
			return 'red';
		case 2:
			return 'yellow';
		case 3:
			return 'blue';
		default:
			return 'gray';
	}
}
