import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';
import { ogp } from '../modules/ogp';

class MyDocument extends Document {
	render() {
		return (
			<Html lang="ja-JP">
				<Head>
					<meta charSet="utf-8" />
					<meta name="description" content={ogp.description} />
					<meta property="og:type" content="website" />
					<meta property="og:title" content={ogp.title} />
					<meta property="og:url" content={ogp.url} />
					<meta property="og:description" content={ogp.description} />
					<meta property="og:site_name" content={ogp.title} />
					<meta property="og:image" content={ogp.image} />
					<meta name="twitter:card" content="summary_large_image" />
					<meta name="format-detection" content="telephone=no" />
					<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
					{/* Google Font Optimization */}
					<link rel="preconnect" href="https://fonts.googleapis.com" />
					<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
					<link
						href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&family=Roboto:wght@300&display=swap"
						rel="stylesheet"
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default MyDocument
