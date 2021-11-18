import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

import './index.less';

interface ICricle {
  radius: number;
  borderWidth: number;
  borderColor: string;
  backgroundColor: string;
}

interface IScale {
  long: number;
  color: string;
  width: number;
}

interface IClockProps {
  /** svg 占据宽度 */
  width?: number;
  /** svg 占据高度 */
  height?: number;
  /** svg 外圆属性 */
  outer?: ICricle;
  /** svg 内圆属性 */
  inner?: ICricle;
  /** 大刻度 */
  hourScale?: IScale & { show?: boolean };
  /** 中刻度 */
  minuteScale?: IScale & { show?: boolean };
  /** 小刻度 */
  secondScale?: IScale & { show?: boolean };
  /** 时针 */
  hourHand?: IScale;
  /** 分针 */
  minuteHand?: IScale;
  /** 秒针 */
  secondHand?: IScale;
  /** 圆心 */
  cricleCenter?: {
    radius: number;
    backgroundColor: string;
  };
}

const Clock: React.FC<IClockProps & typeof defaultProps> = function (props) {
  const {
    width,
    height,
    outer,
    inner,
    hourScale,
    minuteScale,
    secondScale,
    cricleCenter,
    hourHand,
    minuteHand,
    secondHand,
  } = props;
  const [now, setNow] = useState([0, 0, 0]);
  const id = uuidv4();
  const symbolId = {
    hour: `hour-scale-${id}`,
    minute: `minute-scale-${id}`,
    second: `second-scale-${id}`,
  };

  const centerPosition = { x: width / 2, y: height / 2 };
  const circleBorderWidth = outer.radius - inner.radius;
  const hourScaleAttr = {
    x1: centerPosition.x,
    y1: circleBorderWidth,
    x2: centerPosition.x,
    y2: circleBorderWidth + hourScale.long,
    stroke: hourScale.color,
    strokeWidth: hourScale.width,
  };

  const xFunc = (range: number) =>
    outer.radius + inner.radius * Math.cos((range * Math.PI) / 180);

  const yFunc = (range: number) =>
    outer.radius + inner.radius * Math.sin((range * Math.PI) / 180);

  const scaleAttr = {
    x1: xFunc,
    y1: yFunc,
    x2: xFunc,
    y2: yFunc,
    style: (range: number, attr: IScale): object => ({
      stroke: attr.color,
      strokeWidth: attr.width,
      transform: `rotate(${range}deg)`,
      transformOrigin: 'bottom center',
      transformBox: 'fill-box',
    }),
  };

  const hourRange =
    now[0] >= 12
      ? `rotate(${
          (now[0] * 360) / 12 +
          (now[1] * 360) / (60 * 12) +
          (now[2] * 360) / (60 * 60 * 12) -
          360
        }deg)`
      : `rotate(${
          (now[0] * 360) / 12 +
          (now[1] * 360) / (60 * 12) +
          (now[2] * 360) / (60 * 60 * 12)
        }deg)`;

  const minuteRange = `rotate(${
    (now[1] * 360) / 60 + (now[2] * 360) / (60 * 60 * 12)
  }deg)`;
  const secondRange = `rotate(${(now[2] * 360) / 60}deg)`;

  function nowTime() {
    const hour = dayjs().hour();
    const minute = dayjs().minute();
    const second = dayjs().second();
    setNow([hour, minute, second]);
  }

  function loopUpdate() {
    setTimeout(() => {
      nowTime();
      loopUpdate();
    }, 1000);
  }

  useEffect(() => {
    nowTime();
    loopUpdate();
  }, []);

  function renderItem(range: number, id: string) {
    const count = 360 / range;
    return Array.from(new Array(count), (x, n) => n).map((n: number) => (
      <use
        key={n}
        xlinkHref={`#${id}`}
        transform={`rotate(${n * range} ${centerPosition.x} ${
          centerPosition.y
        })`}
      ></use>
    ));
  }

  return (
    <div className="b-clock">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width={width}
        height={height}
      >
        <circle
          cx={centerPosition.x}
          cy={centerPosition.y}
          r={outer.radius - outer.borderWidth / 2}
          stroke={outer.borderColor}
          strokeWidth={outer.borderWidth}
          fill={outer.backgroundColor}
        ></circle>
        <circle
          cx={centerPosition.x}
          cy={centerPosition.y}
          r={inner.radius - inner.borderWidth / 2}
          stroke={inner.borderColor}
          strokeWidth={inner.borderWidth}
          fill={inner.backgroundColor}
        ></circle>

        <symbol>
          <line id={symbolId.hour} {...hourScaleAttr} />

          <g id={symbolId.minute}>
            <line
              x1={scaleAttr.x1(120)}
              y1={scaleAttr.y1(120)}
              x2={scaleAttr.x2(120)}
              y2={scaleAttr.y2(120) - minuteScale.long}
              style={scaleAttr.style(30, minuteScale)}
            />
            <line
              x1={scaleAttr.x1(150)}
              y1={scaleAttr.y1(150)}
              x2={scaleAttr.x2(150)}
              y2={scaleAttr.y2(150) - minuteScale.long}
              style={scaleAttr.style(60, minuteScale)}
            />
          </g>

          <g id={symbolId.second}>
            <line
              x1={scaleAttr.x1(6)}
              y1={scaleAttr.y1(6)}
              x2={scaleAttr.x2(6)}
              y2={scaleAttr.y2(6) - secondScale.long}
              style={scaleAttr.style(276, secondScale)}
            />
            <line
              x1={scaleAttr.x1(12)}
              y1={scaleAttr.y1(12)}
              x2={scaleAttr.x2(12)}
              y2={scaleAttr.y2(12) - secondScale.long}
              style={scaleAttr.style(282, secondScale)}
            />
            <line
              x1={scaleAttr.x1(18)}
              y1={scaleAttr.y1(18)}
              x2={scaleAttr.x2(18)}
              y2={scaleAttr.y2(18) - secondScale.long}
              style={scaleAttr.style(288, secondScale)}
            />
            <line
              x1={scaleAttr.x1(24)}
              y1={scaleAttr.y1(24)}
              x2={scaleAttr.x2(24)}
              y2={scaleAttr.y2(24) - secondScale.long}
              style={scaleAttr.style(294, secondScale)}
            />
          </g>
        </symbol>

        {hourScale.show && renderItem(90, symbolId.hour)}

        {minuteScale.show && renderItem(90, symbolId.minute)}

        {secondScale.show && renderItem(30, symbolId.second)}

        {/* second */}
        <line
          x1={centerPosition.x}
          y1={centerPosition.y}
          x2={centerPosition.x}
          y2={centerPosition.y - secondHand.long}
          stroke={secondHand.color}
          strokeWidth={secondHand.width}
          style={{
            transformOrigin: 'bottom center',
            transformBox: 'fill-box',
            transform: secondRange,
          }}
        />
        {/* minute */}
        <line
          x1={centerPosition.x}
          y1={centerPosition.y}
          x2={centerPosition.x}
          y2={centerPosition.y - minuteHand.long}
          stroke={minuteHand.color}
          strokeWidth={minuteHand.width}
          style={{
            transformOrigin: 'bottom center',
            transformBox: 'fill-box',
            transform: minuteRange,
          }}
        />
        {/* hour */}
        <line
          x1={centerPosition.x}
          y1={centerPosition.y}
          x2={centerPosition.x}
          y2={centerPosition.y - hourHand.long}
          stroke={hourHand.color}
          strokeWidth={hourHand.width}
          style={{
            transformOrigin: 'bottom center',
            transformBox: 'fill-box',
            transform: hourRange,
          }}
        />

        {/* center */}
        <circle
          cx={centerPosition.x}
          cy={centerPosition.y}
          r={cricleCenter.radius}
          fill={cricleCenter.backgroundColor}
        />
      </svg>
    </div>
  );
};

// width = radius + 1/2 borderWidth

const defaultProps = {
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
  hourHand: {
    long: 50,
    width: 2,
    color: '#8c8c8c',
  },
  minuteHand: {
    long: 60,
    width: 2,
    color: '#8c8c8c',
  },
  secondHand: {
    long: 70,
    width: 2,
    color: '#8c8c8c',
  },
  cricleCenter: {
    radius: 6,
    backgroundColor: '#999',
  },
};

Clock.defaultProps = defaultProps;

export default Clock;
