import React from 'react';
import cn from 'classnames';
import Loading from '../_components/Loading';
import './index.less';

type SizeType = 'small' | 'default' | 'large';
type ButtonType = 'submit' | 'button' | 'reset';

export interface IButtonProps {
  /** 按钮文本 */
  text: string;
  /** 按钮尺寸 */
  size?: SizeType;
  /** 背景色是否透明 */
  ghost?: boolean;
  /** 按钮加载状态 */
  loading?: boolean;
  /** button 原生 type 值 */
  htmlType?: ButtonType;
  /** 防抖(ms) */
  debounce?: number;
  /** 点击事件 */
  onClick?: React.MouseEventHandler<HTMLElement>;
}

type ButtonProps = IButtonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'onClick'>;

const Button: React.FC<ButtonProps> = (props) => {
  const { text, className, size, ghost, loading, debounce, onClick, ...rest } =
    props;

  // 默认值为0 实际存在4ms的间隔
  function debounceFunc(fn: Function) {
    let timer: null | number = null;

    return function () {
      if (timer) return;
      fn.apply(null, arguments);

      timer = window.setTimeout(() => {
        timer = null;
      }, debounce);
    };
  }

  function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const { disabled, loading } = props;
    if (disabled || loading) return;
    onClick?.(e);
  }

  const classNames = cn(
    'b-btn',
    {
      'b-btn-sm': size === 'small',
      'b-btn-lg': size === 'large',
      'b-btn-ghost': ghost,
    },
    className,
  );

  return (
    <button
      className={classNames}
      {...(rest as ButtonProps)}
      onClick={debounceFunc(handleClick)}
    >
      {loading && <Loading color={ghost ? '#555' : '#FFF'} />}
      <span>{text}</span>
    </button>
  );
};

Button.defaultProps = {
  size: 'default',
  ghost: false,
  text: 'Button',
  loading: false,
  debounce: 0,
};

Button.displayName = 'Button';

export default Button;
