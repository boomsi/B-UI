import React from 'react';
import Upload, { IUploadProp } from './Upload';

type IDraggerInterface = IUploadProp & {};

function DraggerDefault() {
  return (
    <div className="b-upload-dragger-default">
      <span>＋</span>
      <p>click or drag to upload file</p>
    </div>
  );
}

function DraggerBase(props: IDraggerInterface) {
  const { onChange, children, ...prop } = props;

  return (
    <Upload onChange={onChange} {...prop}>
      <div className="b-upload-dragger">{children}</div>
    </Upload>
  );
}

interface InterDragger
  extends React.ForwardRefExoticComponent<IDraggerInterface> {}

const Dragger = DraggerBase as InterDragger;

Dragger.displayName = 'Dragger';

Dragger.defaultProps = {
  children: <DraggerDefault />,
};

export default Dragger;
