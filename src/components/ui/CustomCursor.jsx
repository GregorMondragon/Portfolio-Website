import { useCursor } from '../../hooks';

const CustomCursor = () => {
  const { dotRef, ringRef, hovered } = useCursor();

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className={`cursor-ring${hovered ? ' hovered' : ''}`} />
    </>
  );
};

export default CustomCursor;
