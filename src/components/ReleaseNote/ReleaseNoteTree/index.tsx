import { Key, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DownOutlined } from '@ant-design/icons';
import { Tree } from 'antd';
import type { DataNode, TreeProps } from 'antd/es/tree';
import { CreateReleaseNoteButton, ReleaseTreeDiv } from '@/components/ReleaseNote/ReleaseNoteTree/styles.tsx';
import CreateReleaseNoteModal from '@/components/ReleaseNote/CreateReleaseNoteModal';
import { useParams } from 'react-router';
import { useQuery } from 'react-query';
import fetcher from '@/utils/fetcher.ts';
import { ManuscriptTree, ReleasedNoteTree } from '@/components/ReleaseNote/ReleaseNoteTree/type.ts';
import { toast } from 'react-toastify';
import { ActivityIndicator } from '@/components/ActivityIndicator';

const ReleaseNoteTree = () => {
  const navigate = useNavigate();
  const headerParam = useParams();
  const projectId = headerParam.projectId;
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
              title: tree.version,
              key: tree.version,
              name: tree.title,
              id: tree.id,
              state: 'edit',
            })),
          },
        ]);
      },
      onError: () => {
        alert('오류가 발생했습니다.');
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
              title: tree.version,
              key: tree.version,
              name: tree.title,
              id: tree.id,
              state: 'released',
            })),
          },
        ]);
      },
    }
  );

  const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const scriptId = info.node.id ?? 'none';
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const scriptType = info.node.state ?? 'none';
    setSelectedKeys(selectedKeys);
    if (scriptType === 'edit') {
      navigate(`/projects/${projectId}/manuscripts/${scriptId}`);
    } else if (scriptType === 'released') {
      navigate(`/projects/${projectId}/release-notes/${scriptId}`);
    } else {
      toast.error('오류가 발생했습니다. 새로고침 해주세요.');
    }
  };

  const handleOk = () => {
    setCreateModalVisible(false);
  };

  return (
    <>
      <CreateReleaseNoteModal visible={createModalVisible} handleOk={handleOk} />
      <ReleaseTreeDiv>
        {editReleaseNoteTreeData ? (
          <>
            <Tree
              switcherIcon={<DownOutlined />}
              defaultExpandAll
              onSelect={onSelect}
              selectedKeys={selectedKeys}
              treeData={editReleaseNoteTreeData}
              style={{ fontFamily: 'SCDream4', fontSize: '0.8vw' }}
            />
            <CreateReleaseNoteButton onClick={() => setCreateModalVisible(true)}>+</CreateReleaseNoteButton>
          </>
        ) : (
          <ActivityIndicator />
        )}
        {releasedNoteTreeData ? (
          <Tree
            switcherIcon={<DownOutlined />}
            defaultExpandAll
            onSelect={onSelect}
            selectedKeys={selectedKeys}
            treeData={releasedNoteTreeData}
            style={{ fontFamily: 'SCDream4', fontSize: '0.8vw' }}
          />
        ) : (
          <ActivityIndicator />
        )}
      </ReleaseTreeDiv>
    </>
  );
};

export default ReleaseNoteTree;
