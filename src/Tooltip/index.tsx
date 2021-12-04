import React, { ReactElement } from 'react';
import classNames from 'classnames';
import './index.less';

type IPosition = 'top' | 'bottom' | 'left' | 'right';

interface IProps {
  // 显示提示的子组件
  children: ReactElement;
  //  提示显示位置
  position?: IPosition;
  //   提示文字
  text: string;
  //   是否开启文本超出省略
  ellipsis?: boolean;
  //   自定义className
  className?: string;
  // 自定义 style
  style?: React.CSSProperties;
}

const Tooltip: React.FC<IProps> = function (props) {
  const { children, position, text, ellipsis, className, ...prop } = props;
  return (
    <div
      className={classNames('b-tooltip', className, {
        'b-tooltip-ellipsis': ellipsis,
      })}
      {...prop}
    >
      {children}
      <div className={`b-tooltip-text b-tooltip-${position}`}>{text}</div>
    </div>
  );
};

Tooltip.defaultProps = {
  position: 'top',
  ellipsis: false,
};

export default Tooltip;
