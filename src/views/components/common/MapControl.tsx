// https://github.com/tomchentw/react-google-maps/issues/818

import * as PropTypes from 'prop-types';
import * as React from 'react';
import { createPortal } from 'react-dom';
// const { MAP } = require('react-google-maps/lib/constants');
const MAP = '__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED';

type Props = {
  position: google.maps.ControlPosition;
} & React.ComponentProps<'div'>;

export default class MapControl extends React.Component<Props> {
  static contextTypes = { [MAP]: PropTypes.object };

  private map: google.maps.Map;
  private controlDiv: HTMLDivElement;

  constructor(props: Props, context: { [MAP]: google.maps.Map }) {
    super(props);
    this.map = context[MAP];
    this.controlDiv = document.createElement('div');
    this.map.controls[props.position].push(this.controlDiv);
  }

  componentWillUnmount() {
    const divIndex = this.map.controls[this.props.position]
      .getArray()
      .indexOf(this.controlDiv);
    this.map.controls[this.props.position].removeAt(divIndex);
  }

  render() {
    const { className } = this.props;
    className && this.controlDiv.classList.add(className);
    return createPortal(this.props.children, this.controlDiv);
  }
}
