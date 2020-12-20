import React, { useState } from 'react';
import styled from 'styled-components';
import colors from '../../styles/colors';

// --- layout ---
export default function AppLayout({ children }) {
	// --- state ---
	const [isNavOpen, setIsNavOpen] = useState(false);
	// --- markup ---
	return (
		<Layout>
			{isNavOpen ? <AppNav></AppNav> : null}
			<ChildrenWrap>{children}</ChildrenWrap>
		</Layout>
	);
}

// --- styled components ---
const Layout = styled.div`
	min-height: 100vh;
	width: 100vw;
	display: flex;
	overflow: hidden;
`;

const ChildrenWrap = styled.div`
	display: flex;
	min-height: 100%;
	width: 100%;
	flex-grow: 1;
	flex-direction: column;
`;

const AppNav = styled.nav`
	max-width: 300px;
	width: 20%;
	height: 100%;
	background-color: ${colors.dark.primary};
`;
