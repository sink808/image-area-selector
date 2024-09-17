import { css } from '@emotion/react';
export const style = {
  selectionBox: css`
    position: absolute;
    border: 2px solid #0480ce;
    background-color: rgba(255, 255, 255, 0.15);
    cursor: move;
    box-sizing: border-box;
  `,
  deleteButton: css`
    position: absolute;
    top: 0;
    right: -32px;
    background-color: #eee;
    color: #999;
    border: none;
    border-radius: 4px;
    width: 24px;
    height: 24px;
    cursor: pointer;
    display: grid;
    align-items: center;
    justify-content: center;
  `,
  deleteButton__icon: css`
    font-size: 16px;
  `,
  selectionContent: css`
    width: 100%;
    height: 100%;
  `,
};
