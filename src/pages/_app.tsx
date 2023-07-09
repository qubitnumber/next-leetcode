import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { RecoilRoot } from "recoil";
import { ToastContainer } from "react-toastify";
import { SessionProvider } from 'next-auth/react';
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<SessionProvider session={pageProps.session}>
			<RecoilRoot>
				<Head>
					<title>DurisCode</title>
					<meta name='viewport' content='width=device-width, initial-scale=1' />
					<link rel='icon' href='/favicon.icon' />
					<meta
						name='description'
						content='Web application that contains Duris Code problems and video solutions'
					/>
				</Head>
				<ToastContainer />
				<Component {...pageProps} />
			</RecoilRoot>
		</SessionProvider>
	);
}
