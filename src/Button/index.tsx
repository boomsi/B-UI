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
  htmlType?: ButtonType;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

type ButtonProps = IButtonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'onClick'>;

export default function Button({
  text,
  size = 'default',
  className,
  ...rest
}: ButtonProps) {
  const classNames = cn(
    'b-btn',
    {
      'b-btn-sm': size === 'small',
      'b-btn-lg': size === 'large',
    },
    className,
  );

  return (
    <button className={classNames} {...(rest as ButtonProps)}>
      <span>{text}</span>
    </button>
  );
}
