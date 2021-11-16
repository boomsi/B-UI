import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import './index.less';

interface IClockProps {
  width: number;
  height: number;
  outer: {
    radius: number;
    borderWidth: number;
    borderColor: string;
    backgroundColor: string;
  };
  inner: {
    radius: number;
    borderWidth: number;
    borderColor: string;
    backgroundColor: string;
  };
  scale: {
    long: number;
    color: string;
    width: number;
  };
  smallScale: {
    long: number;
    color: string;
    width: number;
  };
  hourHand: {
    long: number;
    width: number;
    color: string;
  };
  minuteHand: {
    long: number;
    width: number;
    color: string;
  };
  secondHand: {
    long: number;
    width: number;
    color: string;
  };
  cricleCenter: {
    radius: number;
    backgroundColor: string;
  };
}

const Clock: React.FC<IClockProps> = function (props) {
  const {
    width,
    height,
    outer,
    inner,
    scale,
    smallScale,
    cricleCenter,
    hourHand,
    minuteHand,
    secondHand,
  } = props;
  const circleBorderWidth = outer.radius - inner.radius;
  const [now, setNow] = useState([0, 0, 0]);

  const hourScale = {
    x1: width / 2,
    y1: circleBorderWidth,
    x2: width / 2,
    y2: circleBorderWidth + scale.long,
    style: { stroke: scale.color, strokeWidth: scale.width },
  };

  const xFunc = (range: number) =>
    outer.radius + inner.radius * Math.cos((range * Math.PI) / 180);

  const yFunc = (range: number) =>
    outer.radius + inner.radius * Math.sin((range * Math.PI) / 180);

  const minuteScale = {
    x1: xFunc,
    y1: yFunc,
    x2: xFunc,
    y2: yFunc,
    style: (range: number): object => ({
      stroke: smallScale.color,
      strokeWidth: smallScale.width,
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

  useEffect(() => {
    nowTime(null);
  }, []);

  function nowTime(lastTimer: any) {
    //   FIXME requestAnimationFrame ?
    if (lastTimer) {
      clearTimeout(lastTimer);
    }
    const timer = setTimeout(() => {
      const hour = dayjs().hour();
      const minute = dayjs().minute();
      const second = dayjs().second();
      setNow([hour, minute, second]);
      nowTime(timer);
    }, 1000);
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
          cx={width / 2}
          cy={height / 2}
          r={outer.radius - outer.borderWidth / 2}
          stroke={outer.borderColor}
          strokeWidth={outer.borderWidth}
          fill={outer.backgroundColor}
        ></circle>
        <circle
          cx={width / 2}
          cy={height / 2}
          r={inner.radius - inner.borderWidth / 2}
          stroke={inner.borderColor}
          strokeWidth={inner.borderWidth}
          fill={inner.backgroundColor}
        ></circle>

        <defs>
          <g id="hour-scale">
            <line
              x1={hourScale.x1}
              y1={hourScale.y1}
              x2={hourScale.x2}
              y2={hourScale.y2}
              style={hourScale.style}
            />
          </g>
        </defs>

        <use
          xlinkHref="#hour-scale"
          transform={`rotate(90 ${width / 2} ${height / 2})`}
        ></use>
        <use
          xlinkHref="#hour-scale"
          transform={`rotate(180 ${width / 2} ${height / 2})`}
        ></use>
        <use
          xlinkHref="#hour-scale"
          transform={`rotate(270 ${width / 2} ${height / 2})`}
        ></use>
        <use
          xlinkHref="#hour-scale"
          transform={`rotate(360 ${width / 2} ${height / 2})`}
        ></use>

        <defs>
          <g id="minute-scale">
            <line
              x1={minuteScale.x1(120)}
              y1={minuteScale.y1(120)}
              x2={minuteScale.x2(120)}
              y2={minuteScale.y2(120) - smallScale.long}
              style={minuteScale.style(30)}
            />
            <line
              x1={minuteScale.x1(150)}
              y1={minuteScale.y1(150)}
              x2={minuteScale.x2(150)}
              y2={minuteScale.y2(150) - smallScale.long}
              style={minuteScale.style(60)}
            />
          </g>
        </defs>

        <use
          xlinkHref="#minute-scale"
          transform={`rotate(90 ${width / 2} ${height / 2})`}
        ></use>
        <use
          xlinkHref="#minute-scale"
          transform={`rotate(180 ${width / 2} ${height / 2})`}
        ></use>
        <use
          xlinkHref="#minute-scale"
          transform={`rotate(270 ${width / 2} ${height / 2})`}
        ></use>
        <use
          xlinkHref="#minute-scale"
          transform={`rotate(360 ${width / 2} ${height / 2})`}
        ></use>

        {/* 秒针 */}
        <line
          x1={width / 2}
          y1={height / 2}
          x2={width / 2}
          y2={secondHand.long}
          stroke={secondHand.color}
          strokeWidth={secondHand.width}
          style={{
            transformOrigin: 'bottom center',
            transformBox: 'fill-box',
            transform: secondRange,
          }}
        />
        {/* 分针 */}
        <line
          x1={width / 2}
          y1={height / 2}
          x2={width / 2}
          y2={minuteHand.long}
          stroke={minuteHand.color}
          strokeWidth={minuteHand.width}
          style={{
            transformOrigin: 'bottom center',
            transformBox: 'fill-box',
            transform: minuteRange,
          }}
        />
        {/* 时针 */}
        <line
          x1={width / 2}
          y1={height / 2}
          x2={width / 2}
          y2={hourHand.long}
          stroke={hourHand.color}
          strokeWidth={hourHand.width}
          style={{
            transformOrigin: 'bottom center',
            transformBox: 'fill-box',
            transform: hourRange,
          }}
        />

        {/* 圆心 */}
        <circle
          cx={width / 2}
          cy={height / 2}
          r={cricleCenter.radius}
          fill={cricleCenter.backgroundColor}
        />
      </svg>
    </div>
  );
};

// FIXME 宽度 = 半径 + 一边的边框

Clock.defaultProps = {
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
  scale: {
    long: 10,
    color: '#8c8c8c',
    width: 2,
  },
  smallScale: {
    long: 5,
    color: '#8c8c8c',
    width: 2,
  },
  hourHand: {
    long: 50,
    width: 2,
    color: '#f40',
  },
  minuteHand: {
    long: 60,
    width: 2,
    color: '#38f',
  },
  secondHand: {
    long: 70,
    width: 2,
    color: '#e3d4a1',
  },
  cricleCenter: {
    radius: 6,
    backgroundColor: '#999',
  },
};

export default Clock;
