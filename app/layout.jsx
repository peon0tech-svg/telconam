import 'nextra-theme-docs/style.css'

export const metadata = {
  title: {
    template: '%s | Telecommunication Environment for Namibia',
    default: 'Telecommunication Environment for Namibia',
  },
  description: 'Comprehensive database and reference for telecommunication acts, regulations, and gazettes in Namibia.',
  metadataBase: new URL('https://telconam.peon.tech'),
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
