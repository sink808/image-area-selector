import { ChangeEvent } from 'react';
import { CiImageOn } from 'react-icons/ci';
import { style } from './UploadAreaStyle';

interface UploadAreaProps {
  handleImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const UploadArea: React.FC<UploadAreaProps> = ({ handleImageChange }) => (
  <div css={style.uploadArea}>
    <input
      type="file"
      accept="image/*"
      onChange={handleImageChange}
      css={style.hiddenInput}
    />
    <CiImageOn css={style.uploadArea__icon} />
    <span>Upload image</span>
  </div>
);

export default UploadArea;
