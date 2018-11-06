import React from 'react';
import renderer from 'react-test-renderer';
import RecipeListItem from '../Recipe/RecipeListItem';

const testRecipe = {
  id: 1,
  name: 'test recipe',
  category: 'test category',
};

describe('<Header />', () => {
  test('should not break if no recipe props passed', () => {
    const component = renderer.create(<RecipeListItem />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('should correctly render recipe', () => {
    const component = renderer.create(<RecipeListItem {...testRecipe} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('should render favorite state', () => {
    const component = renderer.create(
      <RecipeListItem favorited {...testRecipe} />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
