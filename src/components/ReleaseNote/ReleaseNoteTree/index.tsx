import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DownOutlined } from '@ant-design/icons';
import { Tree } from 'antd';
import type { TreeProps } from 'antd/es/tree';
import { treeData } from '@components/ReleaseNote/ReleaseNoteTree/mock.tsx';

const ReleaseNoteTree: React.FC = () => {
  const navigate = useNavigate();
  const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
    navigate(`/releasenote/${selectedKeys}`);
  };

  return (
    <Tree
      showLine
      switcherIcon={<DownOutlined />}
      defaultExpandedKeys={['0.0']}
      onSelect={onSelect}
      treeData={treeData}
    />
  );
};

export default ReleaseNoteTree;
