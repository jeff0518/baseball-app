'use client';

import Link from 'next/link';
import { colors } from '@/app/lib/design-tokens';

export function Navigation() {
  return (
    <nav
      style={{
        backgroundColor: colors.secondary,
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Link href="/">
        <div
          style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: colors.primary,
            cursor: 'pointer',
          }}
        >
          ⚾ Baseball Stats
        </div>
      </Link>

      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <Link href="/">
          <span
            style={{
              color: colors.white,
              textDecoration: 'none',
              cursor: 'pointer',
              fontSize: '1rem',
              transition: 'color 0.3s',
            }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = colors.primary)}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = colors.white)}
          >
            首頁
          </span>
        </Link>

        <Link href="/search">
          <span
            style={{
              color: colors.white,
              textDecoration: 'none',
              cursor: 'pointer',
              fontSize: '1rem',
              transition: 'color 0.3s',
            }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = colors.primary)}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = colors.white)}
          >
            球員搜尋
          </span>
        </Link>

        <Link href="/about">
          <span
            style={{
              color: colors.white,
              textDecoration: 'none',
              cursor: 'pointer',
              fontSize: '1rem',
              transition: 'color 0.3s',
            }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = colors.primary)}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = colors.white)}
          >
            關於
          </span>
        </Link>
      </div>
    </nav>
  );
}
