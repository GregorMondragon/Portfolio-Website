import '../../styles/UI.css';

// GlowOrbs — animated background blobs (blue palette)
const GlowOrbs = ({ variant = 'default' }) => {
  const configs = {
    default: [
      {
        className: 'animate-orb-1 glow-orb',
        style: {
          width: '600px', height: '600px',
          top: '-10%', left: '-5%',
          background: 'radial-gradient(circle, rgba(0,102,255,0.14) 0%, transparent 70%)',
        },
      },
      {
        className: 'animate-orb-2 glow-orb',
        style: {
          width: '500px', height: '500px',
          bottom: '-5%', right: '-8%',
          background: 'radial-gradient(circle, rgba(0,212,255,0.10) 0%, transparent 70%)',
        },
      },
      {
        className: 'animate-orb-3 glow-orb',
        style: {
          width: '400px', height: '400px',
          top: '40%', left: '40%',
          background: 'radial-gradient(circle, rgba(0,80,200,0.07) 0%, transparent 70%)',
        },
      },
    ],
    hero: [
      {
        className: 'animate-orb-1 glow-orb',
        style: {
          width: '900px', height: '900px',
          top: '-25%', right: '-15%',
          background: 'radial-gradient(circle, rgba(0,102,255,0.13) 0%, transparent 65%)',
        },
      },
      {
        className: 'animate-orb-2 glow-orb',
        style: {
          width: '700px', height: '700px',
          bottom: '-20%', left: '-12%',
          background: 'radial-gradient(circle, rgba(0,212,255,0.09) 0%, transparent 65%)',
        },
      },
    ],
  };

  const orbs = configs[variant] || configs.default;

  return (
    <div className="glow-orbs-container" aria-hidden="true">
      {orbs.map((orb, i) => (
        <div key={i} className={orb.className} style={orb.style} />
      ))}
    </div>
  );
};

export default GlowOrbs;
