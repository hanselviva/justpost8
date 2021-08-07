import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
//
import { connect } from "react-redux";

//
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Homepage from "./components/Homepage/Homepage";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Posts from "./components/Posts/Posts";
import AdminPage from "./components/AdminPage/AdminPage";

const App = () => {
	return (
		<div className="App">
			<Header />
			<div className="app-content">
				<Switch>
					<Route exact path="/" component={Homepage} />
					<Route path="/login" component={Login} />
					<Route path="/register" component={Register} />
					<Route path="/posts" component={Posts} />
					<Route path="/adminPage" component={AdminPage} />
				</Switch>
			</div>
			<Footer />
		</div>
	);
};

const mapStateToProps = (state) => ({
	// isLoading: state.isLoading,
	// isLoggedIn: state.isLoggedIn,
	// user: state.user,
	//posts: state.posts,
	// fetchError: state.fetchError,
});

export default connect(mapStateToProps, {})(App);
