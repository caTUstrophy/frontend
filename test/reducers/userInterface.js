import unexpected from 'unexpected';
import userInterface from '../../reducers/userInterface';
import { toggleSideMenu } from '../../actions/userInterface';

const expect = unexpected.clone();

export function UserInterfaceReducerTests() {
  it('should init correctly', () => {
    let state = userInterface(undefined, {});
    expect(state, 'not to be', undefined);
    expect(state, 'to be an', Object);
    expect(state.sideMenuOpen, 'to be', false);
  });
  it('should open side menu correctly', () => {
    let state = userInterface(undefined, {});
    expect(state.sideMenuOpen, 'to be', false);
    state = userInterface(state, toggleSideMenu());
    expect(state.sideMenuOpen, 'to be', true);
  });
}

export default UserInterfaceReducerTests