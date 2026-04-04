import { useState } from 'react';
import { useMotionValue, useSpring, useTransform } from 'framer-motion';

export const useTilt = (intensity = 20) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [0.5, -0.5], [-intensity, intensity]), {
    damping: 25,
    stiffness: 200,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-intensity, intensity]), {
    damping: 25,
    stiffness: 200,
  });

  const onMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPos = (mouseX / width) - 0.5;
    const yPos = (mouseY / height) - 0.5;

    x.set(xPos);
    y.set(yPos);
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { tilt: { x: rotateX, y: rotateY }, onMouseMove, onMouseLeave };
};

export default useTilt;
