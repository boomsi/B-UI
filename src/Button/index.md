## Button

Normal:

```tsx
import React from 'react';
import { Button } from 'boy-ui';

const mrStyle = { marginRight: '24px' };
const mtStyle = { marginTop: '24px' };

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

const mrStyle = { marginRight: '24px' };
const mtStyle = { marginTop: '24px' };

export default () => (
  <>
    <Button style={mrStyle} text="Small" size="small" btnType="ghost" />
    <Button style={mrStyle} text="Default" btnType="ghost" />
    <Button text="Large" size="large" btnType="ghost" />
    <br />
    <Button style={mtStyle} text="Disabled" disabled btnType="ghost" />
  </>
);
```

Line:

```tsx
import React from 'react';
import { Button } from 'boy-ui';

const mrStyle = { marginRight: '24px' };
const mtStyle = { marginTop: '24px' };

export default () => (
  <>
    <Button style={mrStyle} text="Small" size="small" btnType="line" />
    <Button style={mrStyle} text="Default" btnType="line" />
    <Button text="Large" size="large" btnType="line" />
    <br />
    <Button style={mtStyle} text="Disabled" disabled btnType="line" />
  </>
);
```

Loading:

```tsx
import React from 'react';
import { Button } from 'boy-ui';

const mrStyle = { marginRight: '24px' };
const mtStyle = { marginTop: '24px' };

export default () => (
  <>
    <Button style={mrStyle} text="Loading" loading />
    <Button style={mrStyle} btnType="ghost" text="Loading" loading />
    <Button style={mrStyle} btnType="line" text="Loading" loading />
  </>
);
```

Debounce:

```tsx
import React from 'react';
import { Button, message } from 'boy-ui';

const mrStyle = { marginRight: '8px' };

export default () => (
  <Button
    text="Debounce 1000ms"
    debounce={1000}
    onClick={() => {
      message.info({
        content: 'message ...',
      });
    }}
  />
);
```

<API></API>

More skills for writing demo: https://github.com/boomsi/B-UI
