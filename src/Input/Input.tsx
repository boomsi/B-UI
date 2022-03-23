import React from 'react';
import Password from './Password';
import './index.less';

interface IProps {
  // 自定义 className
  className?: string;
  // value
  value: string;
  // placeholder
  placeholder: string;
  // disabled
  disabled?: boolean;
  // 宽度
  width?: string;
  // 是否以下划线形式显示
  underline?: boolean;
  // 前置 Icon
  prefixIcon?: React.ReactElement;
  // 后置 Icon
  suffixIcon?: React.ReactElement;
  // onChange 时间
  onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<IProps> = (props) => {
  const {
    value,
    placeholder,
    disabled,
    width,
    underline,
    prefixIcon,
    suffixIcon,
    className,
    onChange,
  } = props;

  const inputCN = () => {
    let cn = [];
    if (underline) {
      cn.push('b-input-underline');
    }
    if (prefixIcon) {
      cn.push('b-prefix-border');
    }
    if (suffixIcon) {
      cn.push('b-suffix-border');
    }
    return cn.join(' ');
  };

  return (
    <div className={`b-input ${className}`}>
      {prefixIcon && <div className="b-prefix-block">{prefixIcon}</div>}
      <input
        className={inputCN()}
        style={{ width }}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {suffixIcon && <div className="b-suffix-block">{suffixIcon}</div>}
    </div>
  );
};

// const NewInput = Input as React.FC<IProps> & {
//   Password: typeof Password;
// };

const NewInput = Input as React.FC<IProps>;

NewInput.defaultProps = {
  value: undefined,
  placeholder: 'Text',
  width: '220px',
  underline: false,
};

export default NewInput;
