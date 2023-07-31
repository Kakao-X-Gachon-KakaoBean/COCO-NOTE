import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DownOutlined } from '@ant-design/icons';
import { Tree } from 'antd';
import type { TreeProps } from 'antd/es/tree';
import { DataNode } from 'antd/es/tree';
import { SelectedProjectState } from '@states/ProjectState.ts';
import { useRecoilValue } from 'recoil';
import { Test } from '@components/ReleaseNote/ReleasedNoteAll/mockExam.tsx';

const ReleaseNoteExam: React.FC = () => {
  const navigate = useNavigate();
  const selectedProject = useRecoilValue(SelectedProjectState);
  const [selectedNodeKey, setSelectedNodeKey] = useState<string | null>(null);
  const [previousNodeKey, setPreviousNodeKey] = useState<string | null>(null);

  const treeData: DataNode[] = [
    {
      title: '수정 중인 릴리즈 노트',
      key: 'edit',
      children: Test.filter(note => note.editState).map(note => ({
        title: note.title,
        key: note.version,
        contents: note.contents,
      })),
    },
    {
      title: '릴리즈 노트 목록',
      key: 'released',
      children: Test.filter(note => !note.editState).map(note => ({
        title: note.title,
        key: note.version,
        contents: note.contents,
      })),
    },
  ];

  const onSelect: TreeProps['onSelect'] = selectedKeys => {
    const selectedKey = selectedKeys[0].toString();

    if (selectedKey === previousNodeKey) {
      navigate(`/project/${selectedProject.projectId}/releasenote/${String(previousNodeKey)}`);
    } else {
      setPreviousNodeKey(selectedNodeKey);
      setSelectedNodeKey(selectedKey);

      const selectedNode = treeData.find(node => node.key === selectedKey);
      if (selectedNode && selectedNode.children && selectedNode.children.length > 0) {
        navigate(`/project/${selectedProject.projectId}/releasenote/${String(selectedNode.children[0].key)}`);
      } else {
        navigate(`/project/${selectedProject.projectId}/releasenote/${selectedKey}`);
      }
    }
  };
  useEffect(() => {
    setPreviousNodeKey(null);
  }, [selectedNodeKey]);

  return (
    <>
      <Tree
        switcherIcon={<DownOutlined />}
        defaultExpandAll
        onSelect={onSelect}
        treeData={treeData}
        style={{ fontFamily: 'SCDream4', fontSize: '0.8vw' }}
      />
    </>
  );
};

export default ReleaseNoteExam;
