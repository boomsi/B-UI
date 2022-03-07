## Input

Normal:

```tsx
import React from 'react';
import { Input } from 'boy-ui';

export default () => {
  const attr = { value: undefined, placeholder: 'Text' };

  return (
    <>
      <Input {...attr} />
      <Input {...attr} width="100%" />
    </>
  );
};
```

Password:

```tsx
import React from 'react';
import { Input } from 'boy-ui';

const Password = Input.Password;

export default () => {
  const attr = { value: undefined, placeholder: 'Text' };

  return (
    <>
      <Password {...attr} />
    </>
  );
};
```

<API></API>

More skills for writing demo: https://github.com/boomsi/B-UI
