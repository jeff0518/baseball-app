'use client';

import Image from 'next/image';
import { FaYoutube } from 'react-icons/fa';
import { MdPlayArrow } from 'react-icons/md';

import styles from './HighlightsSection.module.css';

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
    <section className={styles.highlightsSection}>
      {/* 标题 */}
      <div className={styles.sectionHeader}>
        <div className={styles.badge}>
          <FaYoutube color="#ff0000" size="1.2rem" /> 
          精彩回顧
        </div>
        <h2 className={styles.sectionTitle}>
          兄弟象官方頻道
        </h2>
      </div>
      
      {/* 视频网格 */}
      <div className={styles.videosGrid}>
        {videos.map((video) => (
          <a 
            key={video.id} 
            href={`https://www.youtube.com/watch?v=${video.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.videoCard}
          >
            <div className={styles.thumbnailContainer}>
              <Image 
                src={video.thumbnail} 
                alt={video.title} 
                className={styles.thumbnail}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: 'cover' }}
              />
              <div className={styles.playButton}>
                <MdPlayArrow size="1.5rem" />
              </div>
            </div>
            <div className={styles.videoTitle}>
              {video.title}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
