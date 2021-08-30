import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
//
import { connect } from "react-redux";
import PrivateRoute from "./utils/PrivateRoute";
//
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
// import Homepage from "./components/Homepage/Homepage";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Posts from "./components/Posts/Posts";
import AdminPage from "./components/AdminPage/AdminPage";
import Profile from "./components/Profile/Profile";
import Loader from "./components/Loader/Loader";

const App = (props) => {
	return (
		<div className="App">
			<Header />
			{props.isLoading === true && <Loader />}
			{props.dbError && <h2> {props.dbError}</h2>}
			<div className="app-content">
				<Switch>
					<Route exact path="/" component={Posts} />
					<Route path="/login" component={Login} />
					<Route path="/register" component={Register} />
					<PrivateRoute path="/posts" component={Posts} />
					<PrivateRoute path="/profile" component={Profile} />
					<Route path="/adminPage" component={AdminPage} />
				</Switch>
			</div>

			<Footer />
		</div>
	);
};

const mapStateToProps = (state) => ({
	isLoading: state.isLoading,
	isLoggedIn: state.isLoggedIn,
	dbError: state.dbError,
});

export default connect(mapStateToProps, {})(App);
