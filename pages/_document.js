import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <link rel="icon" href={`${process.env.PUBLIC_URL}/favicon.ico`} />
          <meta name="theme-color" content="#000000" />
          <meta
            name="description"
            content="Building a creative outlet empowering Asian High school students to collaborate and learn code and hobbies by the means of a collaborative community, workshops, AMA, bootcamps and inventive services."
          />
          <link
            rel="apple-touch-icon"
            href={`${process.env.PUBLIC_URL}/logo192.png`}
          />
          <link
            rel="manifest"
            href={`${process.env.PUBLIC_URL}/manifest.json`}
          />
          <noscript>You need to enable JavaScript to run this app.</noscript>
       <link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet"/>
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
