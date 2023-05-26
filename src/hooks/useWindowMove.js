import { useEffect, useRef } from 'react';

function useWindowMove() {
  const moveRef = useRef(null);

  useEffect(() => {
    moveRef.current.onmousedown = event => {
      const dragOffset = { x: event.clientX, y: event.clientY };

      const moveHandle = event => {
        window.bridge.moveWindow({
          offsetX: event.clientX - dragOffset.x,
          offsetY: event.clientY - dragOffset.y
        });
      };

      const removeListener = () => {
        document.removeEventListener('mousemove', moveHandle);
        document.removeEventListener('mouseup', removeListener);
      };

      document.addEventListener('mouseup', removeListener);

      document.addEventListener('mousemove', moveHandle);
    };
  }, []);

  return moveRef;
}

export default useWindowMove;
