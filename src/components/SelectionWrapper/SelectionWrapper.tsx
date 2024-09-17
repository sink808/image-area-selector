import DraggableWrapper from '../DraggableWrapper/DraggableWrapper';
import { DraggableEvent, DraggableData } from 'react-draggable';
import { ResizableBox, ResizeCallbackData } from 'react-resizable';
import { RiDeleteBinLine } from 'react-icons/ri';
import { style } from './SelectionWrapperStyle';
import 'react-resizable/css/styles.css';
import './customResizableBox.css';

export interface Selection {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface SelectionProps {
  selection: Selection;
  setSelections: React.Dispatch<React.SetStateAction<Selection[]>>;
}

const SelectionWrapper: React.FC<SelectionProps> = ({
  selection,
  setSelections,
}) => {
  const handleUpdateSelection = (originSelection: Selection, id: number) => {
    const { x, y, width, height } = originSelection;

    setSelections((prev) =>
      prev.map((sel) =>
        sel.id === id
          ? {
              id: id,
              x: width > 0 ? x : x + width + sel.width,
              y: height > 0 ? y : y + height + sel.height,
              width: width > 0 ? width : -width,
              height: height > 0 ? height : -height,
            }
          : sel,
      ),
    );
  };

  const handleDeleteSelection = (id: number) =>
    setSelections((prev) => prev.filter((selection) => selection.id !== id));

  const handleOnDrag = (_e: DraggableEvent, data: DraggableData) => {
    handleUpdateSelection(
      {
        ...selection,
        x: data.x,
        y: data.y,
      },
      selection.id,
    );
  };

  const handleOnResize = (
    _e: React.SyntheticEvent,
    data: ResizeCallbackData,
  ) => {
    const width = data.handle.includes('w')
      ? -data.size.width
      : data.size.width;
    const height = data.handle.includes('n')
      ? -data.size.height
      : data.size.height;
    // 左或上要減掉長或高

    handleUpdateSelection(
      {
        ...selection,
        width,
        height,
      },
      selection.id,
    );
  };

  return (
    <DraggableWrapper
      key={selection.id}
      position={{ x: selection.x, y: selection.y }}
      width={selection.width}
      height={selection.height}
      onDrag={handleOnDrag}
    >
      <ResizableBox
        width={selection.width}
        height={selection.height}
        resizeHandles={['s', 'w', 'e', 'n', 'sw', 'nw', 'se', 'ne']}
        minConstraints={[24, 24]}
        css={style.selectionBox}
        onResize={handleOnResize}
      >
        <div css={style.selectionContent}>
          <button
            css={style.deleteButton}
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering onDrag
              handleDeleteSelection(selection.id);
            }}
          >
            <RiDeleteBinLine css={style.deleteButton__icon} />
          </button>
        </div>
      </ResizableBox>
    </DraggableWrapper>
  );
};

export default SelectionWrapper;
