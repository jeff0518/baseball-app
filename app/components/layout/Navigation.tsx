'use client';

import Link from 'next/link';
import { colors } from '@/app/lib/design-tokens';
import { getTeamInfo } from '@/app/lib/teams';

export function Navigation() {
  const brothers = getTeamInfo('中信兄弟');

  return (
    <nav
      style={{
        backgroundColor: colors.secondary.DEFAULT,
        padding: '1rem clamp(1rem, 3vw, 2rem)',
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
            color: colors.primary.DEFAULT,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            letterSpacing: '2px',
            outline: 'none'
          }}
          tabIndex={0}
          role="button"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              window.location.href = '/';
            }
          }}
        >
          {/* 使用中信兄弟官方圖片 Logo */}
          <div style={{ width: '45px', height: '45px', overflow: 'hidden', borderRadius: '50%', backgroundColor: colors.white, padding: '3px' }}>
            <img 
              src={brothers.officialLogoUrl} 
              alt="Baseball App Logo - 中信兄弟" 
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
              padding: '0.5rem 0.75rem',
              borderRadius: '4px',
              outline: 'none',
            }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = colors.primary.DEFAULT)}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = colors.white)}
            onFocus={(e) => {
              (e.target as HTMLElement).style.outline = `2px solid ${colors.primary.DEFAULT}`;
              (e.target as HTMLElement).style.outlineOffset = '2px';
            }}
            onBlur={(e) => {
              (e.target as HTMLElement).style.outline = 'none';
            }}
            tabIndex={0}
            role="button"
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
              padding: '0.5rem 0.75rem',
              borderRadius: '4px',
              outline: 'none',
            }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = colors.primary.DEFAULT)}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = colors.white)}
            onFocus={(e) => {
              (e.target as HTMLElement).style.outline = `2px solid ${colors.primary.DEFAULT}`;
              (e.target as HTMLElement).style.outlineOffset = '2px';
            }}
            onBlur={(e) => {
              (e.target as HTMLElement).style.outline = 'none';
            }}
            tabIndex={0}
            role="button"
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
              padding: '0.5rem 0.75rem',
              borderRadius: '4px',
              outline: 'none',
            }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = colors.primary.DEFAULT)}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = colors.white)}
            onFocus={(e) => {
              (e.target as HTMLElement).style.outline = `2px solid ${colors.primary.DEFAULT}`;
              (e.target as HTMLElement).style.outlineOffset = '2px';
            }}
            onBlur={(e) => {
              (e.target as HTMLElement).style.outline = 'none';
            }}
            tabIndex={0}
            role="button"
          >
            關於
          </span>
        </Link>
      </div>
    </nav>
  );
}
