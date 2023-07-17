import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DownOutlined } from '@ant-design/icons';
import { Tree } from 'antd';
import type { TreeProps } from 'antd/es/tree';
import { TestReleasedNote } from '@components/ReleaseNote/ReleasedNoteAll/mock.tsx';
import { DataNode } from 'antd/es/tree';

const ReleaseNoteTree: React.FC = () => {
  const navigate = useNavigate();
  const onSelect: TreeProps['onSelect'] = selectedKeys => {
    if (!(selectedKeys.includes('edit') || selectedKeys.includes('released'))) {
      navigate(`/releasenote/${selectedKeys}`);
    }
  };
  const treeData: DataNode[] = [
    {
      title: '수정 중인 릴리즈 노트',
      key: 'edit',
      children: TestReleasedNote.filter(note => note.editState).map(note => ({
        title: note.title,
        key: note.key,
        contents: note.contents,
      })),
    },
    {
      title: '릴리즈 노트 목록',
      key: 'released',
      children: TestReleasedNote.filter(note => !note.editState).map(note => ({
        title: note.title,
        key: note.key,
        contents: note.contents,
      })),
    },
  ];

  return (
    <Tree
      switcherIcon={<DownOutlined />}
      defaultExpandAll
      onSelect={onSelect}
      treeData={treeData}
      style={{ fontFamily: 'SCDream4', fontSize: '0.8vw' }}
    />
  );
};

export default ReleaseNoteTree;
