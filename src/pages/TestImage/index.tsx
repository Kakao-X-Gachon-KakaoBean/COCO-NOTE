import MDEditor from '@uiw/react-md-editor';
import React, { useState } from 'react';

const TestImage = () => {
  const [content, setContent] = useState<string | undefined>('**내용을 입력해주세요.**');
  return (
    <>
      <div data-color-mode="light">
        <MDEditor height={500} value={content} onChange={setContent} />
      </div>
    </>
  );
};

export default TestImage;
