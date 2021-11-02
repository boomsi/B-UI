import React, { useRef, useState, useEffect } from 'react';
import Del from '@/components/del';
import './index.less';

type uploadStatus = 'pendding' | 'fullied' | 'rejected';
interface IFile {
  uid?: string;
  name: string;
  status: uploadStatus;
  response?: string;
  url?: string;
}

interface IProps {
  children: React.ReactElement<any>;
  showList?: boolean;
  defaultFileList?: IFile[];
  uploadUrl: string;
  headers?: Headers;
  onChange: (err: Error | null, info: any) => void;
}

type IUpload = IProps & React.InputHTMLAttributes<HTMLInputElement>;

const COLOR_DICT = {
  pendding: 'inherit',
  fullied: '#1890ff',
  rejected: '#ff4d4f',
};

export default function Upload(props: IUpload) {
  const {
    children,
    showList = false,
    uploadUrl,
    defaultFileList = [],
    headers = {},
    onChange,
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
        onChange(err);
      })
      .then((res) => {
        onChange(null, res);
      });
  }

  function onClickEvent() {
    uploadRef.current?.click();
  }

  function removeFile(filename: string) {
    setList(list.filter((file) => file.name !== filename));
  }

  return (
    <div className="b-upload">
      {React.cloneElement(children, { onClick: onClickEvent })}
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
