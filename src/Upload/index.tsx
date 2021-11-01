import React from 'react';
import './index.less';

interface IProps {
  children: React.ReactNode;
  multiple?: boolean;
}

type IUpload = IProps & React.InputHTMLAttributes<HTMLInputElement>;

export default function Upload(props: IUpload) {
  const { children, ...prop } = props;

  function onUpload(e: React.ChangeEvent) {
    e.stopPropagation()
    console.log(e)
  }

  return (
    <div className="b-upload">
      {children}
      <input type="file" {...prop} onChange={onUpload} />
    </div>
  );
}
