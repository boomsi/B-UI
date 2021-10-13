import React from 'react';
import cn from 'classnames';
import { tuple } from '@/_util/type';
import './index.less';

const SizeTypes = tuple('small', 'default', 'large');
const ButtonTypes = tuple('submit', 'button', 'reset');
type SizeType = typeof SizeTypes[number];
type ButtonType = typeof ButtonTypes[number];

interface IButtonProps {
  text: string;
  size?: SizeType;
  style?: object;
  loading?: boolean;
  htmlType?: ButtonType;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

type ButtonProps = IButtonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'onClick'>;

function Button(props: ButtonProps) {
  const { text, size = 'default', className, onClick, ...rest } = props;

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
    },
    className,
  );

  return (
    <button
      className={classNames}
      {...(rest as ButtonProps)}
      onClick={handleClick}
    >
      <span>{text}</span>
    </button>
  );
}

export default Button;
