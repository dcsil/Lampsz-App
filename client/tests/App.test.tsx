import renderer from 'react-test-renderer';
import App from '../src/App';

it('renders learn react link', () => {
  const component = renderer.create(<App/>);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
