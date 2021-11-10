import React from 'react';
import './style.less';

interface ILoadingProps {
  color?: string;
  style?: React.CSSProperties;
}

export default function Loading(props: ILoadingProps) {
  const { color, style = {} } = props;
  return (
    <i
      className="b-icon b-icon-loading"
      style={color ? { borderColor: color, ...style } : style}
    ></i>
  );
}
