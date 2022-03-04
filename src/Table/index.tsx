import React from 'react';
import './index.less';

type IAlign = 'left' | 'center' | 'right';

interface ITableConfig {
  title: string;
  key: string;
  ellipsis?: boolean;
  dataIndex: string;
  thAlign?: IAlign;
  tdAlign?: IAlign;
  width?: number;
  render?: (value: any, item: Idata) => React.ReactElement;
}

interface Idata {
  [props: string | number | symbol]: any;
}

type IRowEvent = 'onClick' | 'onDoubleClick' | 'onMouseEnter' | 'onMouseLeave';

interface IRow {
  [prop: IRowEvent]: (
    e: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    item: Idata,
  ) => void;
}

interface IProps {
  /** 列配置项 */
  config: ITableConfig[];
  /** 列数据 */
  data: Idata[];
  /** 行绑定事件 */
  onRow?: IRow;
}

const Table: React.FC<IProps> = ({ config, data, onClick }) => {
  return (
    <div className="b-table">
      <table>
        <thead>
          <tr>
            {config.map(({ title, key, thAlign = 'center' }) => (
              <th key={key} style={{ textAlign: thAlign }}>
                {title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.title} onClick={(e) => onClick?.(e, item)}>
              {config.map(({ key, dataIndex, tdAlign = 'center', render }) => (
                <td key={key} style={{ textAlign: tdAlign }}>
                  {render ? render(item[dataIndex], item) : item[dataIndex]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Table.defaultProps = {
  config: [],
  data: [],
};

export default Table;
