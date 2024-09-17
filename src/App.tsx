import { useState, useRef, ChangeEvent } from 'react';
import { style } from './AppStyle';

import UploadArea from './components/UploadArea/UploadArea';
import Selection from './components/Selection/Selection';

export function App() {
  const [image, setImage] = useState<string>('');
  const [selections, setSelections] = useState<Selection[]>([]);
  const [currentSelection, setCurrentSelection] = useState<Selection | null>(
    null,
  ); // 顯示用
  const currentSelectionRef = useRef<Selection | null>(null); // Listener 用
  const [nextId, setNextId] = useState<number>(1); // 避免 id 重複

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleAddSelection = (selection: Selection) => {
    setSelections((prev) => [...prev, selection]);
    setNextId(nextId + 1);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const rect = (e.target as HTMLDivElement).getBoundingClientRect();
    const startX = e.clientX - rect.left;
    const startY = e.clientY - rect.top;

    const onMouseMove = (e: MouseEvent) => {
      const width = e.clientX - rect.left - startX;
      const height = e.clientY - rect.top - startY;

      const selection = {
        id: nextId,
        x: width > 0 ? startX : startX + width,
        y: height > 0 ? startY : startY + height,
        width: width > 0 ? width : -width,
        height: height > 0 ? height : -height,
      };

      setCurrentSelection(selection);
      currentSelectionRef.current = selection;
    };

    const onMouseUp = () => {
      if (currentSelectionRef.current) {
        // 使用 ref 判斷, 避免 currentSelection 是 null
        handleAddSelection(currentSelectionRef.current);
        currentSelectionRef.current = null;
        setCurrentSelection(null);
      }
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  return (
    <div css={style.container}>
      <div css={style.main}>
        <div css={style.main__header}></div>
        {!image && <UploadArea handleImageChange={handleImageChange} />}
        {image && (
          <div css={style.previewContainer}>
            <img
              src={image}
              alt="Uploaded"
              css={style.imgStyle}
              onMouseDown={handleMouseDown}
            />
            {selections.map((selection) => (
              <Selection
                key={selection.id}
                selection={selection}
                setSelections={setSelections}
              />
            ))}
            {currentSelection && (
              <div
                css={style.selectionBox}
                style={{
                  left: currentSelection.x,
                  top: currentSelection.y,
                  width: currentSelection.width,
                  height: currentSelection.height,
                }}
              />
            )}
          </div>
        )}
      </div>
      <div css={style.dataContainer}>
        {selections.length > 0 && (
          <pre>
            {JSON.stringify(
              // 移除 id
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              selections.map(({ id, ...res }) => res),
              null,
              2,
            )}
          </pre>
        )}
      </div>
    </div>
  );
}
