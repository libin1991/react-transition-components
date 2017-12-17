// @flow

import React from 'react';
import type { Node } from 'react';
import { Transition } from 'react-transition-group';

function getTransitionProperty(
  timeout: number,
  easing: string,
  transitions: Array<Object>
): string {
  return transitions
    .map(transition => `${transition.transitionName} ${timeout}ms ${easing}`)
    .join(',');
}

function getInitialStyle(transitions, styles, timeout, easing) {
  return {
    transition: getTransitionProperty(timeout, easing, transitions),
    ...styles,
    ...transitions.reduce((style, transition) => {
      style[transition.transitionName] = transition.getStartStyle();
      return style;
    }, {}),
  };
}

function getAllTransitionStyles(transitions) {
  return transitions.reduce(
    (styles, transition) => {
      styles.entering[transition.transitionName] = transition.getStartStyle();
      styles.entered[transition.transitionName] = transition.getEndStyle();
      styles.exiting[transition.transitionName] = transition.getStartStyle();
      return styles;
    },
    {
      entering: {},
      entered: {},
      exiting: {},
    }
  );
}

function getFinalStyle(defaultStyle, transitionStyles, state) {
  return {
    display: 'inline-block',
    ...defaultStyle,
    ...transitionStyles[state],
  };
}

type TransitionProps = {
  children: Node,
  timeout: number,
  easing: string,
  start: string | number,
  end: string | number,
};

const choreography = (transitions: Array<Object>, styles: Object) => {
  return class extends React.Component<TransitionProps> {
    static defaultProps = {
      timeout: 300,
      easing: 'ease-in',
    };

    render() {
      const { children, timeout, easing, ...rest } = this.props;

      return (
        <Transition
          appear
          mountOnEnter
          unmountOnExit
          timeout={timeout}
          {...rest}
        >
          {state => (
            <span
              style={getFinalStyle(
                getInitialStyle(transitions, styles, timeout, easing),
                getAllTransitionStyles(transitions),
                state
              )}
            >
              {children}
            </span>
          )}
        </Transition>
      );
    }
  };
};

export default choreography;