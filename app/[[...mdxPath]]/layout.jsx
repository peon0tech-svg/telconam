import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Search } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'

export default async function MdxLayout({ children }) {
  const pageMap = await getPageMap()

  const logo = (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '800', fontSize: '1.2rem', letterSpacing: '-0.025em' }}>
      <span style={{ fontSize: '1.4rem' }}>📡</span>
      <span style={{ background: 'linear-gradient(90deg, #3b82f6, #6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        TelcoNam
      </span>
    </div>
  )

  const navbar = (
    <Navbar logo={logo} />
  )

  return (
    <Layout
      navbar={navbar}
      pageMap={pageMap}
      search={<Search placeholder="Search documents..." />}
      footer={<Footer>© {new Date().getFullYear()} Telecommunication Environment for Namibia</Footer>}
      sidebar={{ defaultMenuCollapseLevel: 1 }}
      editLink={null}
      feedback={{ content: null }}
    >
      {children}
    </Layout>
  )
}
