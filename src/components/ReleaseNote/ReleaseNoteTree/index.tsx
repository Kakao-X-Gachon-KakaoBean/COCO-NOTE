import React, { Key, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DownOutlined } from '@ant-design/icons';
import { Tree } from 'antd';
import type { TreeProps } from 'antd/es/tree';
import { TestReleasedNote } from '@components/ReleaseNote/ReleasedNoteAll/mock.tsx';
import { SelectedProjectState } from '@states/ProjectState.ts';
import { useRecoilValue } from 'recoil';
import { CreateReleaseNoteButton } from '@components/ReleaseNote/ReleaseNoteTree/styles.tsx';
import CreateReleaseNoteModal from '@components/ReleaseNote/CreateReleaseNoteModal';
import { CreateModalInput } from '@components/ReleaseNote/CreateReleaseNoteModal/type.ts';

const ReleaseNoteTree: React.FC = () => {
  const navigate = useNavigate();
  const selectedProject = useRecoilValue(SelectedProjectState);
  const [selectedNodeKey, setSelectedNodeKey] = useState<string | null>(null);
  const [previousNodeKey, setPreviousNodeKey] = useState<string | null>(null);
  const [selectedKeys, setSelectedKeys] = useState<Key[]>([]);
  const [createModalVisible, setCreateModalVisible] = useState(false);

  const editReleaseNoteTreeData = [
    {
      title: '수정 중인 릴리즈 노트',
      key: 'edit',
      children: TestReleasedNote.filter(note => note.editState).map(note => ({
        title: note.title,
        key: note.version,
        contents: note.contents,
      })),
    },
  ];

  const releasedNoteTreeData = [
    {
      title: '배포된 릴리즈 노트 목록',
      key: 'released',
      children: TestReleasedNote.filter(note => !note.editState).map(note => ({
        title: note.title,
        key: note.version,
        contents: note.contents,
      })),
    },
  ];

  const onSelect: TreeProps['onSelect'] = selectedKeys => {
    const selectedKey = selectedKeys[0].toString();
    setSelectedKeys(selectedKeys);

    if (selectedKey === previousNodeKey) {
      navigate(`/projects/${selectedProject.projectId}/releasenotes/${String(previousNodeKey)}`);
    } else {
      setPreviousNodeKey(selectedNodeKey);
      setSelectedNodeKey(selectedKey);
      const mergedReleasedNoteTree = [...editReleaseNoteTreeData, ...releasedNoteTreeData];
      const selectedNode = mergedReleasedNoteTree.find(node => node.key === selectedKey);
      if (selectedNode && selectedNode.children && selectedNode.children.length > 0) {
        navigate(`/projects/${selectedProject.projectId}/releasenotes/${String(selectedNode.children[0].key)}`);
      } else {
        navigate(`/projects/${selectedProject.projectId}/releasenotes/${selectedKey}`);
      }
    }
  };
  useEffect(() => {
    setPreviousNodeKey(null);
  }, [selectedNodeKey]);

  const handleOk = (input: CreateModalInput) => {
    // 여기서 input 값을 보고 navigate 및 editReleaseNoteTreeData에 추가하면 된다.
    if (input.status === 'success') {
      const newEditRelease = {
        title: input.title,
        key: input.key,
        contents: input.contents,
      };
      editReleaseNoteTreeData[0].children.push(newEditRelease);
      navigate(`/project/${selectedProject.projectId}/releasenote/${newEditRelease.key}`);
    }
    setCreateModalVisible(false);
  };

  return (
    <>
      <CreateReleaseNoteModal visible={createModalVisible} handleOk={handleOk} />
      <Tree
        switcherIcon={<DownOutlined />}
        defaultExpandAll
        onSelect={onSelect}
        selectedKeys={selectedKeys}
        treeData={editReleaseNoteTreeData}
        style={{ fontFamily: 'SCDream4', fontSize: '0.8vw' }}
      />
      <CreateReleaseNoteButton onClick={() => setCreateModalVisible(true)}>+</CreateReleaseNoteButton>
      <Tree
        switcherIcon={<DownOutlined />}
        defaultExpandAll
        onSelect={onSelect}
        selectedKeys={selectedKeys}
        treeData={releasedNoteTreeData}
        style={{ fontFamily: 'SCDream4', fontSize: '0.8vw' }}
      />
    </>
  );
};

export default ReleaseNoteTree;
