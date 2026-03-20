'use client';

import { colors, spacing } from '@/app/lib/design-tokens';

export default function AboutPage() {
  return (
    <main style={{ flex: 1, minHeight: 'calc(100vh - 60px)' }}>
      <section
        style={{
          background: `linear-gradient(135deg, ${colors.secondary} 0%, #0f2850 100%)`,
          color: colors.white,
          padding: `${spacing['2xl']} ${spacing.xl}`,
          marginBottom: spacing['2xl'],
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1
            style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              margin: 0,
              marginBottom: spacing.lg,
            }}
          >
            關於我們
          </h1>
        </div>
      </section>

      <section
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: spacing.xl,
          marginBottom: spacing['2xl'],
        }}
      >
        <div
          style={{
            backgroundColor: colors.white,
            borderRadius: '12px',
            padding: spacing.xl,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h2 style={{ color: colors.secondary, marginTop: 0 }}>
            🏟️ 台灣棒球統計資料庫
          </h2>
          <p style={{ color: colors.text.secondary, lineHeight: '1.8' }}>
            歡迎來到台灣棒球統計資料庫！本網站致力於提供最完整、最準確的台灣職棒球員統計數據。
          </p>

          <h3 style={{ color: colors.secondary }}>📊 我們提供什麼</h3>
          <ul style={{ color: colors.text.secondary, lineHeight: '1.8' }}>
            <li>詳細的打者統計數據（打擊率、上壘率、長打率等）</li>
            <li>投手統計數據（防禦率、奪三振等）</li>
            <li>快速搜尋和篩選功能</li>
            <li>比賽記錄數據</li>
          </ul>

          <h3 style={{ color: colors.secondary }}>📝 資料來源</h3>
          <p style={{ color: colors.text.secondary }}>
            本網站的所有數據均來自{' '}
            <a
              href="https://www.rebas.tw/"
              style={{
                color: colors.primary,
                textDecoration: 'none',
                fontWeight: 'bold',
              }}
            >
              rebas.tw
            </a>
            ，每天定時自動更新。
          </p>

          <h3 style={{ color: colors.secondary }}>💡 技術棧</h3>
          <p style={{ color: colors.text.secondary }}>
            <strong>前端：</strong> Next.js 16 + React 19 + TypeScript
            <br />
            <strong>後端：</strong> NestJS + PostgreSQL
            <br />
            <strong>部署：</strong> Vercel
          </p>

          <h3 style={{ color: colors.secondary }}>📧 聯絡方式</h3>
          <p style={{ color: colors.text.secondary }}>
            如有任何問題或建議，歡迎聯繫我們。
          </p>
        </div>
      </section>

      <footer
        style={{
          backgroundColor: colors.background,
          borderTop: `1px solid ${colors.border}`,
          padding: spacing.xl,
          textAlign: 'center',
          color: colors.text.secondary,
        }}
      >
        <p style={{ margin: 0 }}>
          © 2026 Baseball Stats Database. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
