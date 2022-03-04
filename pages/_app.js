import '@styles/globals.css';
import styles from '@styles/app.module.css';
import Head from 'next/head';
import Image from 'next/image';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import createEmotionCache from '@styles/createEmotionCache';
import { AuthProvider } from '@src/context/AuthContext';
import { StateProvider } from '@src/context/StateContext';
import { OptionProvider } from '@src/context/OptionContext';
import AuthStateChanged from '@src/layout/AuthStateChanged';
import theme from '@styles/theme';
import Navbar from '@components/Navbar';
import Footer from '@components/Footer';
import lsshStar from '@public/lsshStar.png';
import { db } from '@src/service/AuthService';
import { enableMultiTabIndexedDbPersistence } from 'firebase/firestore';
import { useEffect } from 'react';

const clientSideEmotionCache = createEmotionCache();

const MyApp = (props) => {
	const {
		Component,
		emotionCache = clientSideEmotionCache,
		pageProps,
	} = props;

	useEffect(() => {
		enableMultiTabIndexedDbPersistence(db).catch((err) => {
			if (err.code == 'failed-precondition') {
				console.log(
					'Multiple tabs open, persistence can only be enabled in one tab at a a time.'
				);
			} else if (err.code == 'unimplemented') {
				console.log(
					'The current browser does not support all of thefeatures required to enable persistence'
				);
			}
		});
	}, []);

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
