import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { Wrapper } from '@/components/ActivityIndicator/styles.tsx';

const antIcon = <LoadingOutlined style={{ fontSize: '2.4vw', color: '#00b050' }} spin />;

export const ActivityIndicator: React.FC = () => {
  return (
    <Wrapper>
      <Spin indicator={antIcon} />
    </Wrapper>
  );
};
