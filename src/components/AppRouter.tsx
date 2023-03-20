import { PureComponent, ReactNode } from 'react';
import { Route, Routes } from 'react-router-dom';
import { MainPage } from '../pages/Main/MainPage';
import { AboutPage } from '../pages/About/AboutPage';
import { Error404Page } from '../pages/404/Error404Page';

export class AppRouter extends PureComponent {
  render(): ReactNode {
    return (
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="*" element={<Error404Page />} />
      </Routes>
    );
  }
}
