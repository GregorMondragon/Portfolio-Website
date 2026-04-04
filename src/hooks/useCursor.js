import { useEffect, useRef, useState } from 'react';

const useCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    let dotX = 0, dotY = 0;
    let ringX = 0, ringY = 0;
    let animId;

    const onMove = (e) => {
      dotX = e.clientX;
      dotY = e.clientY;
    };

    const animate = () => {
      ringX += (dotX - ringX) * 0.12;
      ringY += (dotY - ringY) * 0.12;

      if (dotRef.current) {
        dotRef.current.style.left = `${dotX - 4}px`;
        dotRef.current.style.top = `${dotY - 4}px`;
      }
      if (ringRef.current) {
        ringRef.current.style.left = `${ringX - 20}px`;
        ringRef.current.style.top = `${ringY - 20}px`;
      }

      animId = requestAnimationFrame(animate);
    };

    const onEnter = () => setHovered(true);
    const onLeave = () => setHovered(false);

    document.addEventListener('mousemove', onMove);

    const interactables = document.querySelectorAll('a, button, [data-cursor]');
    interactables.forEach((el) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    animId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMove);
      interactables.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
      cancelAnimationFrame(animId);
    };
  }, []);

  return { dotRef, ringRef, hovered };
};

export default useCursor;
