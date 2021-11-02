## Upload

Normal:

```tsx
import React from 'react';
import { Upload, Button } from 'boy-ui';

export default () => (
  <Upload name="upload1" showList>
    <Button ghost text="Click to upload" />
  </Upload>
);
```

Mutiple:

```tsx
import React from 'react';
import { Upload, Button } from 'boy-ui';

const filelist = [
  {
    name: 'xxx1.png',
    status: 'fullied',
  },
  {
    name: 'xxx2.jpg',
    status: 'rejected',
  },
  {
    name: 'xxx3.jpg',
    status: 'pendding',
  },
];

export default () => (
  <Upload name="upload1" showList multiple defaultFileList={filelist}>
    <Button ghost text="Click to upload" />
  </Upload>
);
```

More skills for writing demo: https://d.umijs.org/guide/basic#write-component-demo
