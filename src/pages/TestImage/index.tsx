import MDEditor from '@uiw/react-md-editor';
import React, { useState } from 'react';
import { Editor } from '@toast-ui/react-editor';

const TestImage = () => {
  const [content, setContent] = useState<string | undefined>('**내용을 입력해주세요.**');
  return (
    <>
      <div data-color-mode="light">
        <MDEditor height={500} value={content} onChange={setContent} />
      </div>
      <div>
        <Editor
          height={'100%'}
          initialEditType="wysiwyg"
          hideModeSwitch={true}
          useCommandShortcut={false}
          language="ko-KR"
        />
      </div>
    </>
  );
};

export default TestImage;
