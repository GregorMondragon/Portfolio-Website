import '../../styles/SceneBackground.css';

const SceneBackground = () => {
  return (
    <div className="scene-bg-wrapper" aria-hidden="true">
      {/* 1. Floating Animated Orbs (Fixed Viewport) */}
      <div className="scene-orb-container">
        <div className="scene-orb scene-orb-1" />
        <div className="scene-orb scene-orb-2" />
        <div className="scene-orb scene-orb-3" />
        <div className="scene-orb scene-orb-4" />
        <div className="scene-orb scene-orb-5" />
      </div>

      {/* 2. Global Fixed Grid (Now on top of orbs for visibility) */}
      <div className="scene-bg-grid" />

      {/* 3. Subtle Vignette/Atmosphere */}
      <div className="scene-bg-vignette" />
    </div>
  );
};

export default SceneBackground;
