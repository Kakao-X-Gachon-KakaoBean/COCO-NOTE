import { Route, MemoryRouter, Routes } from 'react-router-dom';

export const renderWithRouterMatch = (
  ui: JSX.Element,
  route: string | string[],
  path: string,
  children?: JSX.Element
) => {
  return (
    <MemoryRouter initialEntries={typeof route === 'string' ? [route] : route}>
      {children && children}
      <Routes>
        <Route path={path} element={ui} />
      </Routes>
    </MemoryRouter>
  );
};
