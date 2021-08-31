import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={() => {
				if (localStorage.getItem("token") === null) {
					return <Redirect to="/" />;
				}
				return <Component {...rest} />;
			}}
		/>
	);
};

export default PrivateRoute;
