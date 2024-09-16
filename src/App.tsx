import { useState, ChangeEvent } from 'react';
import { style } from './AppStyle';

import UploadArea from './components/UploadArea/UploadArea';

export function App() {
  const [image, setImage] = useState<string>('');

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div css={style.container}>
      <div css={style.main}>
        <div css={style.main__header}></div>
        {!image && <UploadArea handleImageChange={handleImageChange} />}
        {image && (
          <div css={style.previewContainer}>
            <img src={image} alt="Uploaded" css={style.imgStyle} />
          </div>
        )}
      </div>
    </div>
  );
}
