import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import RecipeListItem from '../components/Recipe/RecipeListItem';

const testRecipe = {
  id: 1,
  name: 'test recipe',
  category: 'test category',
};

describe('<Header />', () => {
  let component;
  let tree;
  test('should not break if no recipe props passed', () => {
    component = renderer.create(<RecipeListItem />);
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('should correctly render recipe', () => {
    component = renderer.create(<RecipeListItem {...testRecipe} />);
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('should render favorite state', () => {
    component = renderer.create(<RecipeListItem favorited {...testRecipe} />);
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('should call onClick when clicked', () => {
    const onClickOrPress = jest.fn();
    component = mount(
      <RecipeListItem {...testRecipe} onClickOrPress={onClickOrPress} />,
    );
    component.simulate('click');
    expect(onClickOrPress.mock.calls.length.toBe(1));
    expect(onClickOrPress.mock.calls[0][0]).toBe(testRecipe.id);
  });
  test('Should call onClickOrPress when clicked', () => {
    const onClickOrPress = jest.fn();

    component = mount(
      <RecipeListItem {...testRecipe} onClickOrPress={onClickOrPress} />,
    );
    component.simulate('click');

    expect(onClickOrPress.mock.calls.length).toBe(1);
    expect(onClickOrPress.mock.calls[0][0]).toBe(testRecipe.id);
  });

  test('Should call onFavorited when favorited', () => {
    const onFavorite = jest.fn();

    component = mount(
      <RecipeListItem {...testRecipe} onFavorite={onFavorite} />,
    );
    component.find('div[role="button"]').simulate('click');

    expect(onFavorite.mock.calls.length).toBe(1);
    expect(onFavorite.mock.calls[0][0]).toBe(testRecipe.id);
  });

  test('Should not call onClickOrPress when favorited', () => {
    const onClickOrPress = jest.fn();
    const onFavorite = jest.fn();

    component = mount(
      <RecipeListItem
        recipe={testRecipe}
        onClickOrPress={onClickOrPress}
        onFavorite={onFavorite}
      />,
    );
    component.find('div[role="button"]').simulate('click');

    expect(onFavorite.mock.calls.length).toBe(1);
    expect(onClickOrPress.mock.calls.length).toBe(0);
  });
});
