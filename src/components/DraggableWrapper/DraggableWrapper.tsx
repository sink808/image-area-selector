import { useRef, useState, useEffect } from 'react';
import Draggable, {
  DraggableData,
  DraggableEvent,
  ControlPosition,
} from 'react-draggable';
import { css } from '@emotion/react';
import { style } from './DraggableWrapperStyle';

type PointType = keyof typeof style;

interface DraggableWrapperProps {
  children: React.ReactNode;
  onDrag: (e: DraggableEvent, data: DraggableData) => void;
  position: ControlPosition;
  width: number;
  height: number;
}

interface PointsProps {
  points: PointType[];
  onClick: () => void;
  type: 'active' | 'normal';
}

const points: PointType[] = ['s', 'w', 'e', 'n', 'sw', 'nw', 'se', 'ne'];

const Points: React.FC<PointsProps> = ({ points, onClick, type }) => (
  <>
    {points.map((point: PointType) => (
      <div
        key={point}
        onClick={onClick}
        css={css`
          ${style[type]} ${style[point]}
        `}
      ></div>
    ))}
  </>
);

const DraggableWrapper: React.FC<DraggableWrapperProps> = ({
  children,
  onDrag,
  position,
  width,
  height,
}) => {
  const draggableRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        !draggableRef.current?.contains(e.target as Node) ||
        !(e.target as HTMLElement).classList.contains('react-resizable-handle')
      ) {
        setIsResizing(false); // 點擊 react-resizable-handle 以外的地方取消 resizing
      }
    };

    document.addEventListener('mouseup', handleClickOutside);
    return () => {
      document.removeEventListener('mouseup', handleClickOutside);
    };
  }, []);

  return (
    <>
      {isResizing ? (
        <div
          style={{
            position: 'absolute',
            top: position.y,
            left: position.x,
            width,
            height,
          }}
        >
          <Points
            points={points}
            onClick={() => setIsResizing(true)}
            type="active"
          />

          {children}
        </div>
      ) : (
        <Draggable
          nodeRef={draggableRef}
          position={position}
          onDrag={onDrag}
          bounds="parent"
        >
          <div
            style={{
              width,
              height,
              position: 'absolute',
              top: 0,
              left: 0,
            }}
            ref={draggableRef}
          >
            <Points
              points={points}
              onClick={() => setIsResizing(true)}
              type="normal"
            />

            {children}
          </div>
        </Draggable>
      )}
    </>
  );
};

export default DraggableWrapper;
