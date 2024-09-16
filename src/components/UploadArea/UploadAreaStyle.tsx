import { css } from '@emotion/react';
export const style = {
  uploadArea: css`
    width: 355px;
    height: 156px;
    border: 2px solid #ccc;
    border-radius: 8px;
    color: #999;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    cursor: pointer;
    position: relative;
  `,
  uploadArea__icon: css`
    font-size: 24px;
  `,
  hiddenInput: css`
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  `,
};
