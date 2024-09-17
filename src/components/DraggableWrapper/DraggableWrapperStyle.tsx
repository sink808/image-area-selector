import { css } from '@emotion/react';

export const style = {
  normal: css`
    position: absolute;
    background-color: #0480ce;
    width: 10px;
    height: 10px;
    z-index: 1;
  `,
  active: css`
    position: absolute;
    background-color: red;
    width: 10px;
    height: 10px;
  `,
  nw: css`
    top: -5px;
    left: -5px;
  `,
  ne: css`
    top: -5px;
    right: -5px;
  `,
  sw: css`
    bottom: -5px;
    left: -5px;
  `,
  se: css`
    bottom: -5px;
    right: -5px;
  `,
  n: css`
    top: -5px;
    left: 50%;
    transform: translateX(-50%);
  `,
  s: css`
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
  `,
  e: css`
    right: -5px;
    top: 50%;
    transform: translateY(-50%);
  `,
  w: css`
    left: -5px;
    top: 50%;
    transform: translateY(-50%);
  `,
};
