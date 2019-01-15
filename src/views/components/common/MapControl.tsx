// https://github.com/tomchentw/react-google-maps/issues/818

import * as PropTypes from 'prop-types';
import * as React from 'react';
import { createPortal } from 'react-dom';
const { MAP } = require('react-google-maps/lib/constants');

type Props = {
  position: google.maps.ControlPosition;
} & React.ComponentProps<'div'>;

export default class MapControl extends React.Component<Props> {
  static contextTypes = { [MAP]: PropTypes.object };

  private map: google.maps.Map;
  private controlDiv: HTMLDivElement;

  componentWillMount() {
    this.map = this.context[MAP];
    this.controlDiv = document.createElement('div');
    this.map.controls[this.props.position].push(this.controlDiv);
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
