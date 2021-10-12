import React from 'react';

interface IProps {
  text: string;
}

export default ({ text }: IProps) => <button>{text}</button>;
