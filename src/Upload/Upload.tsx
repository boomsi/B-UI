import React, { useRef, useState, useEffect } from 'react';
import classnames from 'classnames';
import { ChangeEvent } from 'react-dom/node_modules/@types/react';

import Del from '../_components/Del';
import Dragger from './Dragger';
import Button from '../Button';
import './index.less';

type uploadStatus = 'pendding' | 'fullied' | 'rejected';
type UploadType = 'drag';
type dragState = 'dragover' | 'dragleave' | 'drop';

interface IFile {
  uid?: string;
  name: string;
  status: uploadStatus;
  response?: string;
  url?: string;
}

interface HTTPRequestHeader {
  [propName: string]: string;
}

export interface IUploadProp {
  /** 触发上传的子组件 */
  children?: React.ReactElement<HTMLElement>;
  /** 展示已上传文件列表 */
  showList?: boolean;
  /** 文件列表 */
  defaultFileList?: IFile[];
  /** 上传文件 API 接口地址 */
  uploadUrl: string;
  /** 上传文件 HTTP header */
  headers?: HTTPRequestHeader;
  /** 上传类型 */
  type?: UploadType;
  /** 上传成功或失败回调函数 */
  onChange?: (err: Error | null, info: any) => void;
  /** 点击移除列表回调函数 */
  onRemove?: (info: any) => void;
}

export type IUploadProps = IUploadProp &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>;

const COLOR_DICT = {
  pendding: 'inherit',
  fullied: '#1890ff',
  rejected: '#ff4d4f',
};

function DraggerDefault() {
  return (
    <div className="b-upload-dragger-default">
      <span>＋</span>
      <p className="test">click or drag to upload file</p>
    </div>
  );
}

const UploadBase: React.FC<IUploadProps> = (props) => {
  const {
    type,
    showList,
    uploadUrl,
    defaultFileList,
    headers,
    onChange,
    onRemove,
    children,
    ...prop
  } = props;

  const uploadRef = useRef<HTMLInputElement | null>(null);
  const [list, setList] = useState(defaultFileList as IFile[]);
  const [dragState, setDragState] = useState('' as dragState);

  useEffect(() => {
    document.addEventListener('dragover', preventDefault);
    document.addEventListener('drop', preventDefault);
    return () => {
      document.removeEventListener('dragover', preventDefault);
      document.removeEventListener('drop', preventDefault);
    };
  }, []);

  function preventDefault(e: DragEvent) {
    e.preventDefault();
  }

  function onUpload(target: FileList | null) {
    const filelist = target ? [...target] : [];
    const formData = new FormData();

    setList(
      filelist.map((file) => ({
        name: file.name,
        status: 'pendding',
      })),
    );

    filelist.forEach((file) => {
      formData.append(file.name, file);
    });

    fetch(uploadUrl, {
      method: 'POST',
      headers: new Headers(headers),
      body: formData,
    })
      .then((res) => res.json())
      .catch((err) => {
        onChange?.(err, null);
      })
      .then((res) => {
        onChange?.(null, res);
      });
  }

  function onClickEvent() {
    uploadRef.current?.click();
  }

  function removeFile(filename: string) {
    onRemove?.(filename);
  }

  function onDragFile(e: React.DragEvent<HTMLDivElement>) {
    setDragState(e.type as dragState);
    if (e.type === 'drop') {
      const filelist = e.dataTransfer.files;
      onUpload(filelist);
    }
  }

  function renderChildren() {
    const child =
      children ||
      (type === 'drag' ? (
        <DraggerDefault />
      ) : (
        <Button btnType="ghost" text="click to upload" />
      ));

    const cls = classnames('b-upload-dragger', {
      'b-upload-dragger-hover': dragState === 'dragover',
    });

    return type === 'drag' ? (
      <div
        className={cls}
        onDragOver={onDragFile}
        onDragLeave={onDragFile}
        onDrop={onDragFile}
        onClick={onClickEvent}
      >
        {child}
      </div>
    ) : (
      React.cloneElement(child, { onClick: onClickEvent })
    );
  }

  function renderList() {
    return (
      <ul className="b-upload-filelist">
        {list.map((item) => (
          <li key={item.name}>
            <span
              style={{
                color: COLOR_DICT[item.status],
              }}
            >
              {item.name}
            </span>
            <span
              style={
                item.status === 'rejected'
                  ? { display: 'block', color: COLOR_DICT[item.status] }
                  : { display: 'none' }
              }
              onClick={() => removeFile(item.name)}
            >
              <Del />
            </span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="b-upload">
      {renderChildren()}
      {showList && renderList()}
      <input
        {...prop}
        type="file"
        style={{ display: 'none' }}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onUpload(e.target.files)
        }
        ref={uploadRef}
      />
    </div>
  );
};

const Upload = UploadBase as React.FC<IUploadProps> & {
  Dragger: typeof Dragger;
};

Upload.Dragger = Dragger;

Upload.defaultProps = {
  showList: false,
  defaultFileList: [],
  headers: {},
};

Upload.displayName = 'Upload';

export default Upload;
