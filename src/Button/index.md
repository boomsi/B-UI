## Button

Normal:

```tsx
import React from 'react';
import { Button } from 'boy-ui';

const mrStyle = { marginRight: '8px' };
const mtStyle = { marginTop: '8px' };

export default () => (
  <>
    <Button style={mrStyle} text="Small" size="small" />
    <Button style={mrStyle} text="Default" />
    <Button text="Large" size="large" />
    <br />
    <Button style={mtStyle} text="Disabled" disabled />
  </>
);
```

Ghost:

```tsx
import React from 'react';
import { Button } from 'boy-ui';

const mrStyle = { marginRight: '8px' };
const mtStyle = { marginTop: '8px' };

export default () => (
  <>
    <Button style={mrStyle} text="Small" size="small" ghost />
    <Button style={mrStyle} text="Default" ghost />
    <Button text="Large" size="large" ghost />
    <br />
    <Button style={mtStyle} text="Disabled" disabled ghost />
  </>
);
```

More skills for writing demo: https://github.com/boomsi/B-UI
