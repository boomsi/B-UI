import './index.less';

type IMessageType = 'error' | 'info' | 'success' | 'warn';

interface IMessageProps {
  content: string;
  duration: number;
  onClose?: () => void;
  type: IMessageType;
}

class MessageUsual {
  private wrapper: Element | null = null;

  appendWrapper() {
    const oWrapper = document.createElement('div');
    oWrapper.className = 'b-message';
    document.body.append(oWrapper);
    this.wrapper = oWrapper;
  }

  appendItem({
    type = 'info',
    content,
    duration = 3000,
    onClose,
  }: IMessageProps) {
    if (!this.wrapper) this.appendWrapper();

    const oSpan = document.createElement('span');
    oSpan.innerHTML = `<i class='b-message-${type}'></i> ${content}`;
    this.wrapper!.append(oSpan);
    this.removeItem(oSpan, duration, onClose);
  }

  removeItem(
    target: Element,
    duration: IMessageProps['duration'],
    onClose: IMessageProps['onClose'],
  ) {
    setTimeout(() => {
      this.wrapper!.removeChild(target);
      onClose?.();
    }, duration);
  }

  usual(type: IMessageType) {
    return (query: Omit<IMessageProps, 'type'>) => {
      this.appendItem({ ...query, type });
    };
  }
}

class Message extends MessageUsual {
  constructor() {
    super();
  }

  info = super.usual('info');
  success = super.usual('success');
  error = super.usual('error');
  warn = super.usual('warn');
}

const message = new Message();

export default message;
