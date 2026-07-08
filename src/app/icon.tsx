import { ImageResponse } from 'next/og';

export const size = {
  width: 256,
  height: 256,
};
export const contentType = 'image/png';
export const dynamic = 'force-static';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#344e41', // Dark oily green
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: 100, // scaled for 256px
          fontWeight: 900,
          fontFamily: 'sans-serif',
          borderRadius: '20%', // slightly rounded corners
        }}
      >
        EAI
      </div>
    ),
    { ...size }
  );
}
