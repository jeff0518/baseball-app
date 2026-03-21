'use client';

import Image from 'next/image';
import { FaYoutube } from 'react-icons/fa';
import { MdPlayArrow } from 'react-icons/md';
import { colors } from '@/app/lib/design-tokens';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
}

interface HighlightsSectionProps {
  videos: Video[];
}

export function HighlightsSection({ videos }: HighlightsSectionProps) {
  return (
    <section className="highlights-section">
      {/* 标题 */}
      <div className="section-header">
        <div className="badge">
          <FaYoutube color="#ff0000" size="1.2rem" /> 
          精彩回顧
        </div>
        <h2 className="section-title">
          兄弟象官方頻道
        </h2>
      </div>
      
      {/* 视频网格 */}
      <div className="videos-grid">
        {videos.map((video) => (
          <a 
            key={video.id} 
            href={`https://www.youtube.com/watch?v=${video.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="video-card"
          >
            <div className="thumbnail-container">
              <Image 
                src={video.thumbnail} 
                alt={video.title} 
                className="thumbnail"
                fill
                style={{ objectFit: 'cover' }}
              />
              <div className="play-button">
                <MdPlayArrow size="1.5rem" />
              </div>
            </div>
            <div className="video-title">
              {video.title}
            </div>
          </a>
        ))}
      </div>

      <style jsx>{`
        .highlights-section {
          padding-bottom: 2rem;
        }

        .section-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }

        .badge {
          color: ${colors.primary.DEFAULT};
          font-weight: bold;
          font-size: 1rem;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: rgba(252, 207, 0, 0.1);
          border-radius: 20px;
          border: 2px solid ${colors.primary.DEFAULT};
        }

        .section-title {
          font-size: 1.8rem;
          color: ${colors.secondary.DEFAULT};
          margin: 0;
          font-weight: 900;
        }

        .videos-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        .video-card {
          text-decoration: none;
          transition: transform 0.2s;
          cursor: pointer;
        }

        .video-card:hover {
          transform: scale(1.03);
        }

        .video-card:focus {
          outline: 2px solid ${colors.primary.DEFAULT};
          outline-offset: 4px;
          border-radius: 12px;
        }

        .thumbnail-container {
          position: relative;
          width: 100%;
          aspect-ratio: 16/9;
          border-radius: 12px;
          overflow: hidden;
          background: ${colors.primary.DEFAULT};
        }

        .thumbnail {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .play-button {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: rgba(255,0,0,0.9);
          width: 50px;
          height: 35px;
          border-radius: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
          transition: all 0.2s;
        }

        .video-card:hover .play-button {
          background-color: rgba(255,0,0,1);
          transform: translate(-50%, -50%) scale(1.1);
        }

        .video-title {
          padding: 1rem;
          height: 80px;
          font-size: 0.9rem;
          color: ${colors.secondary.DEFAULT};
          font-weight: bold;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          line-height: 1.4;
          background: ${colors.white};
          border-radius: 0 0 12px 12px;
        }

        @media (max-width: 768px) {
          .section-title {
            font-size: 1.4rem;
          }

          .videos-grid {
            grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          }
        }

        @media (max-width: 480px) {
          .videos-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
