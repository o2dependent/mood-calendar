export default function formatEmail(email: String): String {
	return email.replace('-', '--').replace('.', '-');
}
