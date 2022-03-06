import '@styles/globals.css';
import styles from '@styles/app.module.css';
import Head from 'next/head';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import createEmotionCache from '@styles/createEmotionCache';
import AuthStateChanged from '@src/layout/AuthStateChanged';
import theme from '@styles/theme';
import Navbar from '@components/Navbar';
import Footer from '@components/Footer';
import lsshStar from '@public/lsshStar.png';

const clientSideEmotionCache = createEmotionCache();

const AuthProvider = dynamic(
	() =>
		import('@src/context/AuthContext').then(
			(module) => module.AuthProvider
		),
	{
		ssr: false,
	}
);
const StateProvider = dynamic(
	() =>
		import('@src/context/StateContext').then(
			(module) => module.StateProvider
		),
	{ ssr: false }
);
const OptionProvider = dynamic(
	() =>
		import('@src/context/OptionContext').then(
			(module) => module.OptionProvider
		),
	{ ssr: false }
);

const MyApp = (props) => {
	const {
		Component,
		emotionCache = clientSideEmotionCache,
		pageProps,
	} = props;

	return (
		<CacheProvider value={emotionCache}>
			<Head>
				<title>麗山高中自主學習</title>
				<meta
					name='viewport'
					content='initial-scale=1, width=device-width'
				/>
			</Head>
			<ThemeProvider theme={theme}>
				<AuthProvider>
					<AuthStateChanged>
						<StateProvider>
							<OptionProvider>
								<div
									style={{
										minHeight: '100vh',
										width: '100%',
									}}
								>
									<CssBaseline />
									<Navbar />
									<div className={styles.lsshStar}>
										<Image
											alt='lssh-star'
											src={lsshStar}
											priority
											quality={100}
										/>
									</div>
									<Component {...pageProps} />
								</div>
								<Footer />
							</OptionProvider>
						</StateProvider>
					</AuthStateChanged>
				</AuthProvider>
			</ThemeProvider>
		</CacheProvider>
	);
};

export default MyApp;
