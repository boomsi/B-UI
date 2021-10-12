## Button

Demo:

```tsx
import React from 'react';
import { Button } from 'bui';

const style = {
  marginRight: '8px',
};

export default () => (
  <>
    <Button style={style} text="Small" size="small" />
    <Button style={style} text="Default" />
    <Button text="Large" size="large" />
    <br />
    <Button text="Disabled" disabled />
  </>
);
```

More skills for writing demo: https://d.umijs.org/guide/basic#write-component-demo
