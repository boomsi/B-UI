import React from 'react';

import Upload, { IUploadProp } from './Upload';

export type IDraggerProps = Omit<IUploadProp, 'type'>;

function Dragger(props: IDraggerProps) {
  return <Upload {...props} type="drag" />;
}

Dragger.displayName = 'Dragger';

export default Dragger;
