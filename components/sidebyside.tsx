import React from 'react';

interface ImageProps {
    src: string;
    alt: string;
    caption: string;
}

const SideBySideImages: React.FC<{ leftImage: ImageProps; rightImage: ImageProps }> = ({ leftImage, rightImage }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ width: '45%', textAlign: 'center' }}>
                <img src={leftImage.src} alt={leftImage.alt} style={{ maxWidth: '100%' }} />
                <div style={{ marginTop: '10px', fontStyle: 'italic' }}>{leftImage.caption}</div>
            </div>
            <div style={{ width: '45%', textAlign: 'center' }}>
                <img src={rightImage.src} alt={rightImage.alt} style={{ maxWidth: '100%' }} />
                <div style={{ marginTop: '10px', fontStyle: 'italic' }}>{rightImage.caption}</div>
            </div>
        </div>
    );
};

export default SideBySideImages;