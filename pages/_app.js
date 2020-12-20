import { createGlobalStyle } from 'styled-components';
import '../styles/globals.css';
// global style wrapper
const GlobalStyles = createGlobalStyle`
  html, body {
    height: 100%;
    width: 100%;
    
  }

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
`;
function MyApp({ Component, pageProps }) {
	return (
		<>
			<Component {...pageProps} />
			<GlobalStyles />
		</>
	);
}

export default MyApp;
