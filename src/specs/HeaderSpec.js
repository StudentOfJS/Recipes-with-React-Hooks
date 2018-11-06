import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import Header from '../components/Header';

describe('<Header />', () => {
  test('should render correctly', () => {
    const component = renderer.create(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
