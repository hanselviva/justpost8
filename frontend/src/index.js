import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
//
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { reducer } from "./reducers";
//
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
const theme = createTheme({
	palette: {
		primary: {
			main: "#e1f5fe",
			light: "#ffffff",
			dark: "#afc2cb",
			// contrastText: "",
		},
		// secondary: {
		// 	main: "#80deea",
		// 	light: "#b4ffff",
		// 	dark: "#4bacb8",
		// 	// contrastText: "",
		// },
	},
	typography: {
		fontFamily: "Questrial",
	},
});

const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
	<Router>
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<App />
			</ThemeProvider>
		</Provider>
	</Router>,
	document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
