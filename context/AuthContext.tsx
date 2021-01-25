import React, { useContext, useEffect, useState } from 'react';
import { auth } from '../helpers/firebase';

const AuthContext = React.createContext(null);

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	// TODO: find firebase user type
	const [currentUser, setCurrentUser] = useState<any>();
	const [loading, setLoading] = useState(true);

	function signup(email: string, password: string) {
		return auth.createUserWithEmailAndPassword(email, password);
	}

	function login(email: string, password: string) {
		return auth.signInWithEmailAndPassword(email, password);
	}

	function logout() {
		return auth.signOut();
	}

	function resetPassword(email: string) {
		return auth.sendPasswordResetEmail(email);
	}

	function updateEmail(email: string) {
		return currentUser.updateEmail(email);
	}

	function updatePassword(password: string) {
		return currentUser.updatePassword(password);
	}

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setCurrentUser(user);
			setLoading(false);
		});
		return unsubscribe;
	}, []);

	const value = {
		currentUser,
		signup,
		login,
		logout,
		resetPassword,
		updateEmail,
		updatePassword,
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading ? children : null}
		</AuthContext.Provider>
	);
}
