import MDEditor from '@uiw/react-md-editor';
import React, { useState } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

const TestImage = () => {
  const [content, setContent] = useState<string | undefined>('**내용을 입력해주세요.**');
  return (
    <>
      <div data-color-mode="light">
        <MDEditor height={500} value={content} onChange={setContent} />
      </div>
      <div>
        <Editor
          initialValue="hello react editor world!"
          previewStyle="vertical"
          height="700px"
          initialEditType="markdown"
          useCommandShortcut={false}
        />
      </div>
    </>
  );
};

export default TestImage;
