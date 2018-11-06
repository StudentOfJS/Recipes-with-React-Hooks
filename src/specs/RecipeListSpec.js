import React from 'react';
import renderer from 'react-test-renderer';
import RecipeList from '../components/Recipe/RecipeList';

const testRecipes = [
  {
    id: 1,
    name: 'test recipe 1',
    category: 'test category',
  },
  {
    id: 2,
    name: 'test recipe 2',
    category: 'test category',
  },
  {
    id: 3,
    name: 'test recipe 3',
    category: 'test category',
  },
  {
    id: 4,
    name: 'test recipe 4',
    category: 'test category',
  },
];

describe('<RecipeList />', () => {
  test('should not break when no props passed', () => {
    const component = renderer.create(<RecipeList />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('should render recipes correctly', () => {
    const component = renderer.create(<RecipeList recipes={testRecipes} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('should render favorites correctly', () => {
    const component = renderer.create(
      <RecipeList recipes={testRecipes} isFavorite={id => id > 0 && id < 2} />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
