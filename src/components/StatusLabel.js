import React from 'react';
import { Chip } from '@material-ui/core';

import PropTypes from 'prop-types';
import { statusColors } from 'src/utils/utilFuncs';

const StatusLabel = ({ status, ...rest }) => (
  <Chip
    {...rest}
    label={status}
    style={{ backgroundColor: statusColors[status], color: 'white' }}
  />
);
StatusLabel.propTypes = {
  status: PropTypes.string.isRequired
};
export default StatusLabel;
