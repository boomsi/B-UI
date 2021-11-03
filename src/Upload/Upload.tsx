import React, { useRef, useState } from 'react';
import Del from '@/components/del';
import Dragger from './Dragger';
import Button from '../Button';
import './index.less';

type uploadStatus = 'pendding' | 'fullied' | 'rejected';
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
  children?: React.ReactElement<HTMLElement>;
  showList?: boolean;
  defaultFileList?: IFile[];
  uploadUrl: string;
  headers?: HTTPRequestHeader;
  onChange: (err: Error | null, info: any) => void;
  onRemove: (info: any) => void;
}

type IUploadProps = IUploadProp &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>;

const COLOR_DICT = {
  pendding: 'inherit',
  fullied: '#1890ff',
  rejected: '#ff4d4f',
};

function UploadBase(props: IUploadProps) {
  const {
    children,
    showList,
    uploadUrl,
    defaultFileList,
    headers,
    onChange,
    onRemove,
    ...prop
  } = props;
  const uploadRef = useRef<HTMLInputElement | null>(null);
  const [list, setList] = useState(defaultFileList as IFile[]);

  function onUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const filelist = e.target.files ? [...e.target.files] : [];
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
        onChange(err, null);
      })
      .then((res) => {
        onChange(null, res);
      });
  }

  function onClickEvent() {
    uploadRef.current?.click();
  }

  function removeFile(filename: string) {
    onRemove(filename);
  }

  return (
    <div className="b-upload">
      {children && React.cloneElement(children, { onClick: onClickEvent })}
      {showList && (
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
      )}
      <input
        {...prop}
        type="file"
        style={{ display: 'none' }}
        onChange={onUpload}
        ref={uploadRef}
      />
    </div>
  );
}

interface ICompoundedComponent
  extends React.ForwardRefExoticComponent<IUploadProps> {
  Dragger: typeof Dragger;
}

const Upload = UploadBase as ICompoundedComponent;

Upload.defaultProps = {
  showList: false,
  children: <Button text="click to upload" ghost />,
  defaultFileList: [],
  headers: {},
};

Upload.displayName = 'Upload';

export default Upload;
