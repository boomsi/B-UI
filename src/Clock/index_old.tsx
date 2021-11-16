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
}

const Clock: React.FC<IClockProps> = function (props) {
  const { width, height, outer, inner, scale } = props;
  const circleBorderWidth = outer.radius - inner.radius;
  const [now, setNow] = useState([0, 0, 0]);

  const scaleAttr = {
    top: {
      x1: width / 2 - 1,
      y1: circleBorderWidth,
      x2: width / 2 - 1,
      y2: circleBorderWidth + scale.long,
    },
    right: {
      x1: width - circleBorderWidth,
      y1: height / 2 - 1,
      x2: width - circleBorderWidth - scale.long,
      y2: height / 2 - 1,
    },
    bottom: {
      x1: width / 2 - 1,
      y1: height - circleBorderWidth,
      x2: width / 2 - 1,
      y2: height - circleBorderWidth - scale.long,
    },
    left: {
      x1: circleBorderWidth,
      y1: height / 2 - 1,
      x2: circleBorderWidth + scale.long,
      y2: height / 2 - 1,
    },
    style: { stroke: scale.color, strokeWidth: scale.width },
  };

  const smallScaleAttr = {
    leftBottom: (range: number) => ({
      x1: outer.radius + inner.radius * Math.cos((range * Math.PI) / 180),
      y1: outer.radius + inner.radius * Math.sin((range * Math.PI) / 180),
      x2: outer.radius + inner.radius * Math.cos((range * Math.PI) / 180),
      y2: outer.radius + inner.radius * Math.sin((range * Math.PI) / 180) - 5,
    }),
    rightBottom: (range: number) => ({
      x1: outer.radius + inner.radius * Math.cos((range * Math.PI) / 180),
      y1: outer.radius + inner.radius * Math.sin((range * Math.PI) / 180),
      x2: outer.radius + inner.radius * Math.cos((range * Math.PI) / 180),
      y2: outer.radius + inner.radius * Math.sin((range * Math.PI) / 180) - 5,
    }),
    leftTop: (range: number) => ({
      x1: outer.radius + inner.radius * Math.cos((range * Math.PI) / 180),
      y1: outer.radius + inner.radius * Math.sin((range * Math.PI) / 180),
      x2: outer.radius + inner.radius * Math.cos((range * Math.PI) / 180),
      y2: outer.radius + inner.radius * Math.sin((range * Math.PI) / 180) - 5,
    }),
    rightTop: (range: number) => ({
      x1: outer.radius + inner.radius * Math.cos((range * Math.PI) / 180),
      y1: outer.radius + inner.radius * Math.sin((range * Math.PI) / 180),
      x2: outer.radius + inner.radius * Math.cos((range * Math.PI) / 180),
      y2: outer.radius + inner.radius * Math.sin((range * Math.PI) / 180) - 5,
    }),
    style: (range: number): object => ({
      stroke: scale.color,
      strokeWidth: scale.width,
      transform: `rotate(${range}deg)`,
      transformOrigin: 'bottom center',
      transformBox: 'fill-box',
    }),
  };

  const hourRange =
    now[0] >= 12
      ? `rotate(${
          (now[0] * 360) / 24 +
          (now[1] * 360) / (60 * 24) +
          (now[2] * 360) / (60 * 60 * 24) -
          180
        }deg)`
      : `rotate(${
          (now[0] * 360) / 24 +
          (now[1] * 360) / (60 * 24) +
          (now[2] * 360) / (60 * 60 * 24)
        }deg)`;

  const minuteRange = `rotate(${
    (now[1] * 360) / 60 + (now[2] * 360) / (60 * 60 * 24)
  }deg)`;
  const secondRange = `rotate(${(now[2] * 360) / 60}deg)`;

  useEffect(() => {
    nowTime(null);
  }, []);

  function nowTime(lastTimer: any) {
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

        {/* 大刻度 */}
        <line
          x1={scaleAttr.top.x1}
          y1={scaleAttr.top.y1}
          x2={scaleAttr.top.x2}
          y2={scaleAttr.top.y2}
          style={scaleAttr.style}
        />
        <line
          x1={scaleAttr.right.x1}
          y1={scaleAttr.right.y1}
          x2={scaleAttr.right.x2}
          y2={scaleAttr.right.y2}
          style={scaleAttr.style}
        />
        <line
          x1={scaleAttr.bottom.x1}
          y1={scaleAttr.bottom.y1}
          x2={scaleAttr.bottom.x2}
          y2={scaleAttr.bottom.y2}
          style={scaleAttr.style}
        />
        <line
          x1={scaleAttr.left.x1}
          y1={scaleAttr.left.y1}
          x2={scaleAttr.left.x2}
          y2={scaleAttr.left.y2}
          style={scaleAttr.style}
        />

        {/* 小刻度 */}
        <line
          x1={smallScaleAttr.leftBottom(108).x1}
          y1={smallScaleAttr.leftBottom(108).y1}
          x2={smallScaleAttr.leftBottom(108).x2}
          y2={smallScaleAttr.leftBottom(108).y2}
          style={smallScaleAttr.style(18)}
        />
        <line
          x1={smallScaleAttr.leftBottom(126).x1}
          y1={smallScaleAttr.leftBottom(126).y1}
          x2={smallScaleAttr.leftBottom(126).x2}
          y2={smallScaleAttr.leftBottom(126).y2}
          style={smallScaleAttr.style(36)}
        />
        <line
          x1={smallScaleAttr.leftBottom(144).x1}
          y1={smallScaleAttr.leftBottom(144).y1}
          x2={smallScaleAttr.leftBottom(144).x2}
          y2={smallScaleAttr.leftBottom(144).y2}
          style={smallScaleAttr.style(54)}
        />
        <line
          x1={smallScaleAttr.leftBottom(162).x1}
          y1={smallScaleAttr.leftBottom(162).y1}
          x2={smallScaleAttr.leftBottom(162).x2}
          y2={smallScaleAttr.leftBottom(162).y2}
          style={smallScaleAttr.style(72)}
        />

        <line
          x1={smallScaleAttr.rightBottom(18).x1}
          y1={smallScaleAttr.rightBottom(18).y1}
          x2={smallScaleAttr.rightBottom(18).x2}
          y2={smallScaleAttr.rightBottom(18).y2}
          style={smallScaleAttr.style(288)}
        />
        <line
          x1={smallScaleAttr.rightBottom(36).x1}
          y1={smallScaleAttr.rightBottom(36).y1}
          x2={smallScaleAttr.rightBottom(36).x2}
          y2={smallScaleAttr.rightBottom(36).y2}
          style={smallScaleAttr.style(306)}
        />
        <line
          x1={smallScaleAttr.rightBottom(54).x1}
          y1={smallScaleAttr.rightBottom(54).y1}
          x2={smallScaleAttr.rightBottom(54).x2}
          y2={smallScaleAttr.rightBottom(54).y2}
          style={smallScaleAttr.style(324)}
        />
        <line
          x1={smallScaleAttr.rightBottom(72).x1}
          y1={smallScaleAttr.rightBottom(72).y1}
          x2={smallScaleAttr.rightBottom(72).x2}
          y2={smallScaleAttr.rightBottom(72).y2}
          style={smallScaleAttr.style(342)}
        />

        <line
          x1={smallScaleAttr.leftTop(198).x1}
          y1={smallScaleAttr.leftTop(198).y1}
          x2={smallScaleAttr.leftTop(198).x2}
          y2={smallScaleAttr.leftTop(198).y2}
          style={smallScaleAttr.style(108)}
        />
        <line
          x1={smallScaleAttr.leftTop(216).x1}
          y1={smallScaleAttr.leftTop(216).y1}
          x2={smallScaleAttr.leftTop(216).x2}
          y2={smallScaleAttr.leftTop(216).y2}
          style={smallScaleAttr.style(126)}
        />
        <line
          x1={smallScaleAttr.leftTop(234).x1}
          y1={smallScaleAttr.leftTop(234).y1}
          x2={smallScaleAttr.leftTop(234).x2}
          y2={smallScaleAttr.leftTop(234).y2}
          style={smallScaleAttr.style(144)}
        />
        <line
          x1={smallScaleAttr.leftTop(252).x1}
          y1={smallScaleAttr.leftTop(252).y1}
          x2={smallScaleAttr.leftTop(252).x2}
          y2={smallScaleAttr.leftTop(252).y2}
          style={smallScaleAttr.style(162)}
        />

        <line
          x1={smallScaleAttr.rightTop(288).x1}
          y1={smallScaleAttr.rightTop(288).y1}
          x2={smallScaleAttr.rightTop(288).x2}
          y2={smallScaleAttr.rightTop(288).y2}
          style={smallScaleAttr.style(198)}
        />
        <line
          x1={smallScaleAttr.rightTop(306).x1}
          y1={smallScaleAttr.rightTop(306).y1}
          x2={smallScaleAttr.rightTop(306).x2}
          y2={smallScaleAttr.rightTop(306).y2}
          style={smallScaleAttr.style(216)}
        />
        <line
          x1={smallScaleAttr.rightTop(324).x1}
          y1={smallScaleAttr.rightTop(324).y1}
          x2={smallScaleAttr.rightTop(324).x2}
          y2={smallScaleAttr.rightTop(324).y2}
          style={smallScaleAttr.style(234)}
        />
        <line
          x1={smallScaleAttr.rightTop(342).x1}
          y1={smallScaleAttr.rightTop(342).y1}
          x2={smallScaleAttr.rightTop(342).x2}
          y2={smallScaleAttr.rightTop(342).y2}
          style={smallScaleAttr.style(252)}
        />

        {/* 秒针 */}
        <line
          x1={width / 2 - 1}
          y1={height / 2}
          x2="107"
          y2="40"
          stroke="#c3e2a4"
          strokeWidth="2"
          style={{
            transformOrigin: 'bottom center',
            transformBox: 'fill-box',
            transform: secondRange,
            transition: 'all .3s',
          }}
        />
        {/* 分针 */}
        <line
          x1={width / 2 - 1}
          y1={height / 2}
          x2="107"
          y2="60"
          stroke="#38f"
          strokeWidth="2"
          style={{
            transformOrigin: 'bottom center',
            transformBox: 'fill-box',
            transform: minuteRange,
            transition: 'all .3s',
          }}
        />
        {/* 时针 */}
        <line
          x1={width / 2 - 1}
          y1={height / 2}
          x2="107"
          y2="80"
          stroke="#f40"
          strokeWidth="2"
          style={{
            transformOrigin: 'bottom center',
            transformBox: 'fill-box',
            transform: hourRange,
            transition: 'all .3s',
          }}
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
    long: 20,
    color: '#8c8c8c',
    width: 2,
  },
};

export default Clock;
