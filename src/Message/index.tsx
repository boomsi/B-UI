import './index.less';

type IMessageType = 'error' | 'info' | 'success' | 'warn';

interface IMessageProps {
  message: string;
  type: IMessageType;
  interval: number;
}

function message({ message, type = 'info', interval = 3000 }: IMessageProps) {
  let oWrapper: Element = document.getElementsByClassName('b-message')?.[0];
  const oSpan = document.createElement('span');
  oSpan.innerHTML = `<i class='b-message-${type}'></i> ${message}`;

  if (oWrapper) {
    oWrapper.append(oSpan);
  } else {
    oWrapper = document.createElement('div');
    oWrapper.className = 'b-message';
    oWrapper.append(oSpan);
    document.body.append(oWrapper);
  }

  setTimeout(() => {
    oWrapper.removeChild(oSpan);
  }, interval);
}

export default message;
