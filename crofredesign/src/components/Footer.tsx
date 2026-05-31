const footerCols = [
  {
    heading: 'crof.ai',
    isDescription: true,
    links: ['The fastest and cheapest access to OSS model inference. OpenAI-compatible API for indie devs and small teams.'],
  },
  {
    heading: 'Product',
    links: ['Pricing', 'Models', 'API Status', 'Changelog'],
  },
  {
    heading: 'Docs',
    links: ['Quickstart', 'Authentication', 'SDKs', 'API Reference'],
  },
  {
    heading: 'Company',
    links: ['About', 'Blog', 'Careers', 'Legal'],
  },
  {
    heading: 'Connect',
    links: ['GitHub', 'Discord', 'Twitter', 'Contact'],
  },
]

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid rgba(124,58,237,0.18)',
        padding: '64px 24px 32px',
        backgroundColor: '#08080F',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
            gap: '48px',
            marginBottom: '48px',
          }}
          className="footer-grid"
        >
          {footerCols.map((col, i) => (
            <div key={col.heading}>
              {i === 0 ? (
                <>
                  <span
                    style={{
                      fontFamily: 'Satoshi, Geist, sans-serif',
                      fontWeight: 600,
                      fontSize: '1.125rem',
                      color: '#F5F3FF',
                      display: 'block',
                      marginBottom: '16px',
                    }}
                  >
                    crof.ai
                  </span>
                  <p
                    style={{
                      fontFamily: 'DM Sans, sans-serif',
                      fontSize: '0.875rem',
                      color: '#8B8FA8',
                      lineHeight: 1.6,
                      margin: 0,
                      maxWidth: '280px',
                    }}
                  >
                    {col.links[0]}
                  </p>
                </>
              ) : (
                <>
                  <p
                    style={{
                      fontFamily: 'DM Sans, sans-serif',
                      fontSize: '0.8125rem',
                      fontWeight: 500,
                      color: '#F5F3FF',
                      margin: '0 0 16px',
                    }}
                  >
                    {col.heading}
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {col.links.map((link) => (
                      <li key={link}>
                        <a
                          href="#"
                          style={{
                            fontFamily: 'DM Sans, sans-serif',
                            fontSize: '0.875rem',
                            color: '#8B8FA8',
                            textDecoration: 'none',
                            transition: 'color 0.15s',
                          }}
                          onMouseEnter={e => (e.currentTarget.style.color = '#F5F3FF')}
                          onMouseLeave={e => (e.currentTarget.style.color = '#8B8FA8')}
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          ))}
        </div>

        <div
          style={{
            borderTop: '1px solid rgba(124,58,237,0.1)',
            paddingTop: '24px',
          }}
        >
          <p
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '0.8125rem',
              color: '#8B8FA8',
              margin: 0,
            }}
          >
            &copy; 2026 Nahcrof LLC
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 640px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}
