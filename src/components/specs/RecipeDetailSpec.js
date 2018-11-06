import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import RecipeDetail from '../Recipe/RecipeDetail';

const testRecipe = {
  detail: {
    name: 'test recipe',
    image: '',
    category: 'test category',
    calories: 1000000000,
    ingredients: ['ing1', 'ing2'],
    steps: ['step1', 'step2'],
  },
};

describe('<RecipeDetail />', () => {
  test('should render without props', () => {
    const component = renderer.create(
      <BrowserRouter>
        <RecipeDetail />
      </BrowserRouter>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('should correctly render a recipe', () => {
    const component = renderer.create(
      <BrowserRouter>
        <RecipeDetail {...testRecipe} />
      </BrowserRouter>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('should correctly render a className', () => {
    const component = renderer.create(
      <BrowserRouter>
        <RecipeDetail className="py6" />
      </BrowserRouter>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
