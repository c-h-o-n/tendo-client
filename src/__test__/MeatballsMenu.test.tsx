import { MeatballsMenu } from '@common/components/MeatballsMenu';
import { render } from './test-utils';

describe('header', () => {
  it('renders correctly', () => {
    const meatballsMEnu = render(<MeatballsMenu />);

    expect(meatballsMEnu.toJSON()).toMatchSnapshot();
  });
});
