## message

Normal:

```tsx
import React from 'react';
import { message, Button } from 'boy-ui';

export default () => {
  const btnStyle = { marginRight: 8 };

  function onClickFunc(type) {
    message[type]({
      content: `message ${type} !!!`,
      duration: 2000,
    });
  }

  return (
    <>
      <Button
        style={btnStyle}
        text="Success"
        onClick={() => onClickFunc('success')}
      />
      <Button
        style={btnStyle}
        text="Error"
        onClick={() => onClickFunc('error')}
      />
      <Button
        style={btnStyle}
        text="Info"
        onClick={() => onClickFunc('info')}
      />
      <Button text="Warn" onClick={() => onClickFunc('warn')} />
    </>
  );
};
```

More skills for writing demo: https://github.com/boomsi/B-UI
