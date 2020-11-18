import React from "react";
import Spinner from 'react-bootstrap/Spinner';
import { FormattedMessage } from 'react-intl'

export const Loader = () => (
  <div className="d-flex justify-content-center loader">
    <Spinner animation="border" variant="primary">
      <span className="sr-only"><FormattedMessage id='loading'/>...</span>
    </Spinner>
  </div>
);