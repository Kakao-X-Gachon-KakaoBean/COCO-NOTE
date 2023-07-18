import MDEditor from '@uiw/react-md-editor';
import { useState } from 'react';
import { EditorDiv } from '@components/ReleaseNote/ReleaseNoteDetail/styles.tsx';

const ReleaseNoteEdit = () => {
  const [value, setValue] = useState<string | undefined>('**내용을 입력해주세요.**');
  return (
    <div>
      <div>여기에 작성 중 상태</div>
      <EditorDiv>
        <MDEditor height={500} value={value} onChange={setValue} />
      </EditorDiv>
    </div>
  );
};

export default ReleaseNoteEdit;
