import React, { useMemo } from 'react';
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

interface IProps {
  /** 列配置项 */
  config: ITableConfig[];
  /** 列数据 */
  data: Idata[];
  /** 行绑定事件 */
  onRow?: {
    [prop in IRowEvent]?: (
      e: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
      item: Idata,
      index: number,
    ) => void;
  };
  rowKey: string | ((data: Idata) => string);
}

const Table: React.FC<IProps> = ({ config, data, onRow, rowKey }) => {
  function renderTh() {
    return (
      <tr>
        {config.map(({ title, key, thAlign = 'center' }) => (
          <th key={key} style={{ textAlign: thAlign }}>
            {title}
          </th>
        ))}
      </tr>
    );
  }

  function renderTd() {
    return data.map((item: Idata, idx: number) => {
      const trKey = typeof rowKey === 'string' ? item[rowKey] : rowKey(item);
      // const events = onRow
      //   ? Object.assign(
      //       ...(Object.keys(onRow) as IRowEvent[]).map((eventName: IRowEvent) => ({
      //         [eventName]: (
      //           e: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
      //         ) => onRow[eventName]?.(e, item, idx),
      //       }))
      //     )
      //   : {};

      return (
        <tr key={trKey}>
          {config.map(({ key, dataIndex, tdAlign = 'center', render }) => (
            <td key={key} style={{ textAlign: tdAlign }}>
              {render ? render(item[dataIndex], item) : item[dataIndex]}
            </td>
          ))}
        </tr>
      );
    });
  }

  return (
    <div className="b-table">
      <table>
        <thead>{renderTh()}</thead>
        <tbody>{renderTd()}</tbody>
      </table>
    </div>
  );
};

Table.defaultProps = {
  config: [],
  data: [],
  onRow: {},
};

export default Table;
