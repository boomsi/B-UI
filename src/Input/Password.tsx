import React from 'react';
import './index.less';

interface IProps {
  value: string;
  placeholder: string;
  width?: string;
  underline?: boolean;
}

const Password: React.FC<IProps> = (props) => {
  const { value, placeholder, width, underline } = props;

  const inputCN = () => {
    let cn = '';
    if (underline) {
      cn += 'b-input-underline';
    }

    return cn;
  };

  return (
    <div className="b-input">
      <input
        className={inputCN()}
        type="password"
        style={{ width }}
        placeholder={placeholder}
        value={value}
        autoComplete="new-password"
        pattern="[0-9A-z]{8}"
      />
    </div>
  );
};

Password.defaultProps = {
  value: undefined,
  placeholder: 'Text',
  width: 'inherit',
  underline: false,
};

export default Password;
