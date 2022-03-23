## Input

Normal:

```tsx
import React from 'react';
import { Input } from 'boy-ui';

export default () => {
  const attr = { value: undefined, placeholder: 'Text' };
  const margin = { margin: '16px 0' };
  const containerStyle = { display: 'flex', alignItems: 'flex-start' };

  return (
    <div style={containerStyle}>
      <div style={{ marginRight: '24px' }}>
        <p style={margin}>Normal:</p>
        <Input {...attr} />
        <p style={margin}>Underline:</p>
        <Input {...attr} underline />
        <p style={margin}>PrefixIcon:</p>
        <Input {...attr} prefixIcon={<i className="font_family icon-user" />} />
        <p style={margin}>SuffixIcon:</p>
        <Input {...attr} suffixIcon={<i className="font_family icon-user" />} />
      </div>
      <div>
        <p style={margin}>Normal Disabled:</p>
        <Input {...attr} disabled />
        <p style={margin}>Underline Disabled:</p>
        <Input {...attr} disabled underline />
        <p style={margin}>PrefixIcon Disabled:</p>
        <Input
          {...attr}
          disabled
          prefixIcon={<i className="font_family icon-user" />}
        />
        <p style={margin}>SuffixIcon Disabled:</p>
        <Input
          {...attr}
          disabled
          suffixIcon={<i className="font_family icon-user" />}
        />
      </div>
    </div>
  );
};
```

prefixIcon:

```tsx
import React from 'react';
import { Input } from 'boy-ui';

export default () => {
  const attr = { value: undefined, placeholder: 'Text' };
  const margin = { margin: '16px 0' };

  return (
    <>
      <p style={margin}>Normal:</p>
      <Input {...attr} width="100%" />
      <p style={margin}>Underline:</p>
      <Input {...attr} underline width="100%" />
      <p style={margin}>PrefixIcon:</p>
      <Input
        {...attr}
        width="100%"
        prefixIcon={<i className="font_family icon-user" />}
      />
      <p style={margin}>SuffixIcon:</p>
      <Input
        {...attr}
        width="100%"
        suffixIcon={<i className="font_family icon-user" />}
      />
    </>
  );
};
```

<!-- Password:

```tsx
import React from 'react';
import { Input } from 'boy-ui';

const Password = Input.Password;

export default () => {
  const attr = { value: undefined, placeholder: 'Password' };

  return (
    <>
      <Password {...attr} />
    </>
  );
};
``` -->

<API></API>

More skills for writing demo: https://github.com/boomsi/B-UI
