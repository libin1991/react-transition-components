import * as React from 'react';
import { shallow } from 'enzyme';

import FadeTransition from '../';

describe('FadeTransition', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <FadeTransition timeout={300}>
        <div />
      </FadeTransition>
    );
  });

  describe('when the FadeTransition is entering', () => {
    it('should apply entering styles', () => {

    });
  })

  describe('when the FadeTransition is exiting', () => {
    it('should apply exiting styles', () => {

    });
  })
})
