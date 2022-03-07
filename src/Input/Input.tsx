import React from 'react';
import Password from './Password';
import './index.less';

interface IProps {
  value: string;
  placeholder: string;
  width?: string;
  underline?: boolean;
}

const Input: React.FC<IProps> = (props) => {
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
        style={{ width }}
        placeholder={placeholder}
        value={value}
      />
    </div>
  );
};

const NewInput = Input as React.FC<IProps> & {
  Password: typeof Password;
};

NewInput.defaultProps = {
  value: undefined,
  placeholder: 'Text',
  width: 'inherit',
  underline: false,
};

export default NewInput;
