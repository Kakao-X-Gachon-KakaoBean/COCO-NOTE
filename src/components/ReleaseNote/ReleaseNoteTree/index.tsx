import { Key, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DownOutlined } from '@ant-design/icons';
import { Tree } from 'antd';
import type { TreeProps, DataNode } from 'antd/es/tree';
import { CreateReleaseNoteButton } from '@components/ReleaseNote/ReleaseNoteTree/styles.tsx';
import CreateReleaseNoteModal from '@components/ReleaseNote/CreateReleaseNoteModal';
import { useParams } from 'react-router';
import { useQuery } from 'react-query';
import fetcher from '@utils/fetcher.ts';
import { ManuscriptTree, ReleasedNoteTree } from '@components/ReleaseNote/ReleaseNoteTree/type.ts';

const ReleaseNoteTree = () => {
  const navigate = useNavigate();
  const headerParam = useParams();
  const projectId = headerParam.projectId;
  const [selectedNodeKey, setSelectedNodeKey] = useState<string | null>(null);
  const [previousNodeKey, setPreviousNodeKey] = useState<string | null>(null);
  const [selectedKeys, setSelectedKeys] = useState<Key[]>([]);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [editReleaseNoteTreeData, setEditReleaseNoteTreeData] = useState<DataNode[] | undefined>();
  const [releasedNoteTreeData, setReleasedNoteTreeData] = useState<DataNode[] | undefined>();
  useQuery<ManuscriptTree>(
    ['manuscriptAll', projectId],
    () =>
      fetcher({
        queryKey: 'http://localhost:8080/manuscripts?projectId=' + projectId,
      }),
    {
      enabled: projectId !== undefined,
      onSuccess: data => {
        setEditReleaseNoteTreeData([
          {
            title: '수정 중인 릴리즈 노트',
            key: 'edit',
            children: data.manuscripts.map(tree => ({
              title: tree.title,
              key: tree.version,
            })),
          },
        ]);
      },
      onError: () => {
        console.log('오류가 발생했습니다.');
      },
    }
  );
  useQuery<ReleasedNoteTree>(
    ['releasedNoteAll', projectId],
    () =>
      fetcher({
        queryKey: 'http://localhost:8080/release-notes?projectId=' + projectId,
      }),
    {
      enabled: projectId !== undefined,
      onSuccess: data => {
        setReleasedNoteTreeData([
          {
            title: '배포된 릴리즈 노트 목록',
            key: 'released',
            children: data.releaseNotes.map(tree => ({
              title: tree.title,
              key: tree.version,
            })),
          },
        ]);
      },
    }
  );

  const onSelect: TreeProps['onSelect'] = selectedKeys => {
    const selectedKey = selectedKeys[0].toString();
    setSelectedKeys(selectedKeys);

    if (selectedKey === previousNodeKey) {
      navigate(`/projects/${projectId}/releasenotes/manuscripts/${String(previousNodeKey)}`);
    } else {
      setPreviousNodeKey(selectedNodeKey);
      setSelectedNodeKey(selectedKey);
      const mergedReleasedNoteTree = [...editReleaseNoteTreeData, ...releasedNoteTreeData];
      const selectedNode = mergedReleasedNoteTree.find(node => node.key === selectedKey);
      if (selectedNode && selectedNode.children && selectedNode.children.length > 0) {
        navigate(`/projects${projectId}/releasenotes/manuscripts/${String(selectedNode.children[0].key)}`);
      } else {
        navigate(`/projects/${projectId}/releasenotes/manuscripts/${selectedKey}`);
      }
    }
  };

  const handleOk = () => {
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
