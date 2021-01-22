export default function formatEmail(email: string): string {
	return email.replace('-', '--').replace('.', '-');
}
