import { css } from '@emotion/react';
export const style = {
  container: css`
    margin: auto;
    width: fit-content;
    display: flex;
    padding: 16px;
    justify-content: center;
    gap: 153px;
  `,
  main: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 792px;
    width: 433px;
    overflow: hidden;
    border-radius: 8px;
    background-color: #f4f9fa;
  `,
  main__header: css`
    height: 56px;
    width: 100%;
    background-color: #ebf0f3;
    margin-bottom: 36px;
  `,
  imgStyle: css`
    width: 355px;
    height: auto;
    display: block;
    -webkit-user-drag: none;
  `,
  previewContainer: css`
    position: relative;
    border: 2px solid rgba(0, 0, 255, 0.2);
    border-radius: 8px;
    display: inline-block;
    overflow: hidden;
  `,
};
