import SelectionWrapper, {
  Selection,
} from '../SelectionWrapper/SelectionWrapper';
import { style } from './SelectionsStyle';

interface SelectionsProps {
  selections: Selection[];
  currentSelection: Selection | null;
  setSelections: React.Dispatch<React.SetStateAction<Selection[]>>;
}

const Selections: React.FC<SelectionsProps> = ({
  selections,
  setSelections,
  currentSelection,
}) => {
  return (
    <>
      {selections.map((selection) => (
        <SelectionWrapper
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
    </>
  );
};

export default Selections;
