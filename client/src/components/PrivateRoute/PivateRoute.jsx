import { Route, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = true;

  return (
    <Route
      {...rest}
      element={props => (
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Navigate to="/login" replace={true} />
        )
      )}
    />
  );
};

PrivateRoute.propTypes = {
  element: PropTypes.elementType.isRequired,
};

export default PrivateRoute;
