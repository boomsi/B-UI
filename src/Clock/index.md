## Clock

Normal:

```tsx
import React from 'react';
import { Clock } from 'boy-ui';

const attr1 = {
  hourScale: {
    long: 10,
    color: '#8c8c8c',
    width: 2,
    show: true,
  },
  minuteScale: {
    long: 5,
    color: '#8c8c8c',
    width: 2,
    show: false,
  },
  secondScale: {
    long: 2,
    color: '#8c8c8c',
    width: 2,
    show: false,
  },
};

const attr2 = {
  hourScale: {
    long: 10,
    color: '#8c8c8c',
    width: 2,
    show: true,
  },
  minuteScale: {
    long: 5,
    color: '#8c8c8c',
    width: 2,
    show: true,
  },
  secondScale: {
    long: 2,
    color: '#8c8c8c',
    width: 2,
    show: false,
  },
};

const attr3 = {
  hourScale: {
    long: 10,
    color: '#8c8c8c',
    width: 2,
    show: true,
  },
  minuteScale: {
    long: 5,
    color: '#8c8c8c',
    width: 2,
    show: true,
  },
  secondScale: {
    long: 2,
    color: '#8c8c8c',
    width: 2,
    show: true,
  },
};

export default () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      maxWidth: 1000,
    }}
  >
    <Clock {...attr1} />
    <Clock {...attr2} />
    <Clock {...attr3} />
  </div>
);
```

Config attribute:

```tsx
import React from 'react';
import { Clock } from 'boy-ui';

const attr1 = {
  width: 216,
  height: 216,
  outer: {
    radius: 108,
    borderWidth: 2,
    borderColor: '#e5e5e5',
    backgroundColor: '#eee',
  },
  inner: {
    radius: 100,
    borderWidth: 2,
    borderColor: '#e5e5e5',
    backgroundColor: '#eee',
  },
  hourScale: {
    long: 10,
    color: 'red',
    width: 2,
    show: true,
  },
  minuteScale: {
    long: 5,
    color: 'green',
    width: 2,
    show: true,
  },
  secondScale: {
    long: 2,
    color: 'blue',
    width: 2,
    show: false,
  },
  hourHand: {
    long: 50,
    width: 2,
    color: 'red',
    show: true,
  },
  minuteHand: {
    long: 60,
    width: 2,
    color: 'green',
  },
  secondHand: {
    long: 70,
    width: 2,
    color: 'blue',
  },
  cricleCenter: {
    radius: 6,
    backgroundColor: '#999',
  },
};

const attr2 = {
  width: 256,
  height: 256,
  outer: {
    radius: 128,
    borderWidth: 2,
    borderColor: '#e5e5e5',
    backgroundColor: '#eee',
  },
  inner: {
    radius: 110,
    borderWidth: 2,
    borderColor: '#e5e5e5',
    backgroundColor: '#eee',
  },
  hourScale: {
    long: 10,
    color: 'red',
    width: 2,
    show: true,
  },
  minuteScale: {
    long: 5,
    color: 'green',
    width: 2,
    show: true,
  },
  secondScale: {
    long: 2,
    color: 'blue',
    width: 2,
    show: false,
  },
  hourHand: {
    long: 70,
    width: 8,
    color: 'red',
    show: true,
  },
  minuteHand: {
    long: 80,
    width: 6,
    color: 'green',
  },
  secondHand: {
    long: 90,
    width: 2,
    color: 'blue',
  },
  cricleCenter: {
    radius: 6,
    backgroundColor: '#999',
  },
};

export default () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      maxWidth: 600,
    }}
  >
    <Clock {...attr1} />
    <Clock {...attr2} />
  </div>
);
```

## Notice

> 建议涉及到的数字都为偶数，避免出现误差

<API></API>

More skills for writing demo: https://github.com/boomsi/B-UI
