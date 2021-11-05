import React from 'react';

import Upload, { IUploadProp } from './Upload';

type IDraggerProps = Omit<IUploadProp, 'type'>;

function Dragger(props: IDraggerProps) {
  return <Upload {...props} type="drag" />;
}

interface InterDragger extends React.ForwardRefExoticComponent<IUploadProp> {}

(Dragger as InterDragger).displayName = 'Dragger';

export default Dragger;
