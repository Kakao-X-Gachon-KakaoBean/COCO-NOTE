import { FC, useCallback } from 'react';
import { CreateModal } from '@components/Menu/styles';
import { Props } from '@type/MenuType.ts';

const Menu: FC<Props> = ({ children }) => {
  const stopPropagation = useCallback((e: any) => {
    e.stopPropagation();
  }, []);

  return (
    <div onClick={stopPropagation}>
      <CreateModal>
        <div>{children}</div>
      </CreateModal>
    </div>
  );
};

Menu.defaultProps = {
  closeButton: true,
};

export default Menu;
