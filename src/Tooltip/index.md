## Tooltip

Normal:

```tsx
import React from 'react';
import { Tooltip, Button } from 'boy-ui';

const layout = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 150px)',
  gridTemplateRows: 'repeat(3, 50px)',
  placeContent: 'center',
  alignItems: 'center',
  justifyItems: 'center',
};

export default () => {
  function onClickFunc(type) {
    message[type]({
      content: `message ${type} !!!`,
      duration: 2000,
    });
  }

  return (
    <div style={layout}>
      <Tooltip text="Tooltip Top" style={{ gridColumn: '2/3' }}>
        <Button btnType="ghost" text="Tooltip Top" />
      </Tooltip>
      <Tooltip
        text="Tooltip Left"
        position="left"
        style={{ gridColumn: '1/2' }}
      >
        <Button btnType="ghost" text="Tooltip Left" />
      </Tooltip>
      <Tooltip
        text="Tooltip Right"
        position="right"
        style={{ gridColumn: '3/4' }}
      >
        <Button btnType="ghost" text="Tooltip Right" />
      </Tooltip>
      <Tooltip
        text="Tooltip Bottom"
        position="bottom"
        style={{ gridColumn: '2/3' }}
      >
        <Button btnType="ghost" text="Tooltip Bottom" />
      </Tooltip>
    </div>
  );
};
```

<API></API>

More skills for writing demo: https://github.com/boomsi/B-UI
