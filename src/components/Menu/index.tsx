import { FC, useCallback } from 'react';
import { CreateModal } from '@components/Menu/styles';
import { Props } from '@components/Menu/type';

const Menu: FC<Props> = ({ children, show, onCloseModal, closeButton }) => {
  const stopPropagation = useCallback((e: any) => {
    e.stopPropagation();
    console.log(show);
    console.log(onCloseModal);
    console.log(closeButton);
  }, []);
  console.log(stopPropagation);

  return (
    <div>
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
