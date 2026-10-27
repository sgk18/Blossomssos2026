import { ImageResponse } from 'next/og';
import { siteConfig } from '@/data/site-config';

export const runtime = 'nodejs';
export const alt = 'Blossoms SOS - School of Sciences, CHRIST (Deemed to be University)';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px 70px',
          backgroundColor: '#171717',
          backgroundImage:
            'radial-gradient(circle at 85% 15%, rgba(168, 203, 183, 0.18) 0%, transparent 45%), radial-gradient(circle at 15% 85%, rgba(163, 28, 27, 0.22) 0%, transparent 50%)',
          color: '#F2EFE8',
          fontFamily: 'sans-serif',
          border: '12px solid #06110C',
          boxSizing: 'border-box',
        }}
      >
        {/* Top Header Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px 20px',
                borderRadius: '9999px',
                backgroundColor: '#06110C',
                border: '1px solid rgba(168, 203, 183, 0.35)',
                color: '#A8CBB7',
                fontSize: 16,
                fontWeight: 700,
                letterSpacing: '2px',
                textTransform: 'uppercase',
              }}
            >
              School of Sciences • Team Onyx
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '8px 16px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(255, 224, 130, 0.12)',
                border: '1px solid rgba(255, 224, 130, 0.3)',
                color: '#FFE082',
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              Motto: &ldquo;Be the Best&rdquo;
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              color: 'rgba(242, 239, 232, 0.75)',
              fontSize: 15,
              fontWeight: 500,
            }}
          >
            CHRIST (Deemed to be University)
          </div>
        </div>

        {/* Central Fest Branding */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <div
            style={{
              fontSize: 84,
              fontWeight: 900,
              letterSpacing: '-2px',
              lineHeight: 1.0,
              color: '#F2EFE8',
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
            }}
          >
            <span>BLOSSOMS</span>
            <span
              style={{
                fontSize: 32,
                fontWeight: 800,
                color: '#A8CBB7',
                backgroundColor: '#06110C',
                padding: '6px 18px',
                borderRadius: '12px',
                border: '1px solid rgba(168, 203, 183, 0.3)',
                letterSpacing: '3px',
              }}
            >
              SOS
            </span>
          </div>

          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: '#A8CBB7',
              letterSpacing: '1px',
            }}
          >
            &ldquo;From Flames to Flights, White Onyx Ignites.&rdquo;
          </div>

          <div
            style={{
              fontSize: 18,
              color: 'rgba(242, 239, 232, 0.8)',
              maxWidth: '900px',
              lineHeight: 1.5,
              marginTop: '4px',
            }}
          >
            {siteConfig.defaultDescription}
          </div>
        </div>

        {/* Bottom Discipline Pillars Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '20px',
            borderTop: '1px solid rgba(168, 203, 183, 0.2)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            {['Art (9)', 'Literary (8)', 'Music (5)', 'Theatre (6)', 'Dance (3)'].map((cat) => (
              <div
                key={cat}
                style={{
                  padding: '6px 14px',
                  borderRadius: '10px',
                  backgroundColor: '#06110C',
                  border: '1px solid rgba(168, 203, 183, 0.25)',
                  color: '#F2EFE8',
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                {cat}
              </div>
            ))}
          </div>

          <div
            style={{
              fontSize: 14,
              color: '#A8CBB7',
              fontWeight: 600,
              letterSpacing: '1px',
            }}
          >
            blossomssos.vercel.app
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
