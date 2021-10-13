## Button

Demo:

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

More skills for writing demo: https://d.umijs.org/guide/basic#write-component-demo
