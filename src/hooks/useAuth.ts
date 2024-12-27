import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import userManager from "../services/user-manager.ts";
import jwtDecode from 'jwt-decode';

function useAuth() {
	const [isLoggingIn, setIsLoggingIn] = useState(false);
	const [isLoggingOut, setIsLoggingOut] = useState(false);
	const [error, setError] = useState<AxiosError>();
	const TOKEN_KEY = "oidc.user:http://localhost:8080:noteify-react-client";
	//
	// setJwt(sessionStorage.getItem(TOKEN_KEY));

	useEffect(() => {
		return () => {
			userManager.events.removeAccessTokenExpired(() => {
			})
		}
	}, []);

	userManager.events.addAccessTokenExpired(() => {
		console.log("User access token is expired");
	})

	const signIn = () => {
		userManager.signinRedirect()
			.then((response) => console.log(response))
			.catch((exception) => console.log(exception));
	};

	const signInCallback = () => {
		setIsLoggingIn(true);
		userManager
			.signinRedirectCallback()
			.then((response) => {
				// sessionStorage.setItem(TOKEN_KEY, `${response.token_type} ${response.access_token}`);
				setIsLoggingIn(false);
				window.location.assign("/notes");
			})
			.catch((err) => {
				setError(err);
				setIsLoggingIn(false);
			});
	};

	const signOut = () => {
		sessionStorage.removeItem(TOKEN_KEY);
		userManager.signoutRedirect()
			.then((response) => console.log(response))
			.catch((exception) => console.log(exception));
	};

	const signOutCallback = () => {
		setIsLoggingOut(true);
		userManager
			.signoutRedirectCallback()
			.then((response) => {
				console.log(response);
				setIsLoggingOut(false);
				window.location.assign("/");
			})
			.catch((err) => {
				setError(err);
				setIsLoggingOut(false);
			});
	};

	const getCurrentUser = () => {
		try {
			const token = sessionStorage.getItem(TOKEN_KEY);
			if (token) return jwtDecode(token);
		} catch (ex) {
			return null;
		}
	};

	const authStatusCode = error?.response?.status;

	return {
		signIn,
		signInCallback,
		signOut,
		signOutCallback,
		getCurrentUser,
		isLoggingIn,
		isLoggingOut,
		error,
		authStatusCode,
	};
}

export default useAuth;
