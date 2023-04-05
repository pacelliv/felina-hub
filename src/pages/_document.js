import Document, { Html, Head, Main, NextScript } from "next/document"
import { ServerStyleSheet } from "styled-components"

function MyDocument() {
    return (
        <Html>
            <Head />
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}

// Being a CSS-in-JavaScript styling, styled-components is geared for client-side rendering,
// it normally assumes that's it's executing on the browser therefore it produces CSS styles
// as a result of JavaScript execution and injects them directly into the document. Next JS
// pre-renders all pages by default on the server, for this reason you need to collect the CSS
// styles and include them in the server-rendered HTML response to avoid possible build issues
// e.g. flashes of unstyled content.

// To Address this issue we can use `ServerStyleSheet` from `styled-components` to collect all
// the CSS styles used in the aplication to include them server-rendered HTML response.
MyDocument.getInitialProps = async (ctx) => {
    // Step 1: Create an instance of ServerStyleSheet
    const sheet = new ServerStyleSheet()
    // Step 2: Extract `renderPage` from the context
    const originalRenderPage = ctx.renderPage

    try {
        // Step 3: Retrieve styles from components in the page
        ctx.renderPage = () =>
            originalRenderPage({
                enhanceApp: (App) => (props) =>
                    // Step 4: Extract the styles as <style> tags
                    sheet.collectStyles(<App {...props} />),
            })
        // Step 5: Enable Server side rendering and do initial data population
        const initialProps = await Document.getInitialProps(ctx)
        // Step 6: Pass styles as a prop
        return {
            ...initialProps,
            styles: (
                <>
                    {initialProps.styles}
                    {sheet.getStyleElement()}
                </>
            ),
        }
    } finally {
        sheet.seal()
    }
}

export default MyDocument
