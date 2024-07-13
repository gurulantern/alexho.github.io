import React from 'react';
import styles from '../styles/GameEmbed.module.css';

interface GameEmbedProps {
  src: string;
}

const GameEmbed: React.FC<GameEmbedProps> = ({ src }) => {
  return (
    <div className={styles.container}>
      <iframe 
        src={src} 
        width="800" 
        height="600" 
        className={styles.iframe}
        title="Godot Game"
      ></iframe>
    </div>
  );
}

export default GameEmbed;