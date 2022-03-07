## Table

Normal:

```tsx
import React from 'react';
import { Table } from 'boy-ui';

const config = [
  {
    title: 'Name',
    key: 'name',
    dataIndex: 'name',
    ellipsis: true,
  },
  {
    title: 'Age',
    key: 'age',
    dataIndex: 'age',
    ellipsis: false,
  },
  {
    title: 'Sex',
    key: 'sex',
    dataIndex: 'sex',
    render: (val) => (val === 0 ? 'women' : 'men'),
  },
  {
    title: 'Address',
    key: 'address',
    dataIndex: 'address',
    ellipsis: false,
    tdAlign: 'left',
    thAlign: 'left',
  },
];

const data = [
  {
    name: 'Peter',
    age: 22,
    sex: 1,
    address: 'China BeiJing',
  },
  {
    name: 'Tony',
    age: 18,
    sex: 0,
    address: 'China ShangHai',
  },
];

const onRow = {
  onClick(e, item) {
    console.log('click');
  },
  onDoubleClick(e, item) {
    console.log('double click');
  },
  onMouseEnter(e, item) {
    console.log('mouse enter');
  },
  onMouseLeave(e, item) {
    console.log('mouse leave');
  },
};

export default () => (
  <Table data={data} config={config} rowKey="name" onRow={onRow} />
);
```

Border:

```tsx
import React from 'react';
import { Table } from 'boy-ui';

const config = [
  {
    title: 'Name',
    key: 'name',
    dataIndex: 'name',
    ellipsis: true,
  },
  {
    title: 'Age',
    key: 'age',
    dataIndex: 'age',
    ellipsis: false,
  },
  {
    title: 'Sex',
    key: 'sex',
    dataIndex: 'sex',
    render: (val) => (val === 0 ? 'women' : 'men'),
  },
  {
    title: 'Address',
    key: 'address',
    dataIndex: 'address',
    ellipsis: false,
    tdAlign: 'left',
    thAlign: 'left',
  },
];

const data = [
  {
    name: 'Peter',
    age: 22,
    sex: 1,
    address: 'China BeiJing',
  },
  {
    name: 'Tony',
    age: 18,
    sex: 0,
    address: 'China ShangHai',
  },
];

export default () => <Table data={data} config={config} border rowKey="name" />;
```

<API></API>

More skills for writing demo: https://github.com/boomsi/B-UI
