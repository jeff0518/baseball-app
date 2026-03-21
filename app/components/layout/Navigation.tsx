'use client';

import Link from 'next/link';
import { colors } from '@/app/lib/design-tokens';
import { getTeamInfo } from '@/app/lib/teams';

export function Navigation() {
  const brothers = getTeamInfo('中信兄弟');

  return (
    <nav
      style={{
        backgroundColor: colors.secondary,
        padding: '1rem 3rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
      }}
    >
      <Link href="/">
        <div
          style={{
            fontSize: '1.6rem',
            fontWeight: '900',
            color: colors.primary,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            letterSpacing: '2px'
          }}
        >
          {/* 使用中信兄弟官方圖片 Logo */}
          <div style={{ width: '45px', height: '45px', overflow: 'hidden', borderRadius: '50%', backgroundColor: '#fff', padding: '3px' }}>
            <img 
              src={brothers.officialLogoUrl} 
              alt="Brothers Logo" 
              style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
            />
          </div>
          <span>象迷視角</span>
        </div>
      </Link>

      <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
        <Link href="/">
          <span
            style={{
              color: colors.white,
              textDecoration: 'none',
              cursor: 'pointer',
              fontSize: '1.1rem',
              fontWeight: 'bold',
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
              fontSize: '1.1rem',
              fontWeight: 'bold',
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
              fontSize: '1.1rem',
              fontWeight: 'bold',
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
