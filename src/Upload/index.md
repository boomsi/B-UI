## Upload

Normal:

```tsx
import React from 'react';
import { Upload, Button } from 'boy-ui';

export default () => {
  function onChange(value) {
    console.log(value);
  }

  return (
    <Upload
      uploadUrl="http://www.example.com"
      name="upload1"
      showList
      onChange={onChange}
    >
      <Button ghost text="Click to upload" />
    </Upload>
  );
};
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

export default () => {
  function onChange(value) {
    console.log(value);
  }

  return (
    <Upload
      uploadUrl="http://www.example.com"
      name="upload2"
      showList
      multiple
      defaultFileList={filelist}
      onChange={onChange}
    >
      <Button ghost text="Click to upload" />
    </Upload>
  );
};
```

Dragger:

```tsx
import React from 'react';
import { Upload } from 'boy-ui';
const { Dragger } = Upload;

export default () => {
  function onChange(file) {
    console.log(file);
  }

  return (
    <Dragger
      name="upload3"
      uploadUrl="http://www.example.com"
      onChange={onChange}
      showList
    />
  );
};
```

More skills for writing demo: https://github.com/boomsi/B-UI
