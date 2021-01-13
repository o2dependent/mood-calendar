import React, { useState } from 'react';
import styled from 'styled-components';
import colors from '../../styles/colors';
import AppNav from './AppNav';

// --- layout ---
export default function AppLayout({ children }) {
	// --- state ---
	const [isNavOpen, setIsNavOpen] = useState(false);
	// --- markup ---
	return (
		<Layout>
			<AppNav />
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
