import { GithubAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import app from "../../firebase/firebase.init";
import { useState } from "react";
const Login = () => {
	const [user, setUser] = useState([])
	const auth = getAuth(app);
	const googleProvider = new GoogleAuthProvider();
	const githubProvider = new GithubAuthProvider()

	const handleGoogleSignIn = ()=>{
		signInWithPopup(auth, googleProvider)
		.then(result => {
			const loggedInUser = result.user
			console.log(loggedInUser);
			setUser(loggedInUser)
		})
		.catch(error=> {
			console.log(error);
		})
	}
	const handleGoogleSignOut = ()=>{
		signOut(auth)
		.then(result =>{
			console.log(result);
			setUser(null)
		})
		.catch(error =>{
			console.log(error)

		})
	}
	const handleGithubSignIn = ()=>{
		signInWithPopup(auth, githubProvider)
		.then(result =>{
			const loggedInUser = result.user;
			console.log(loggedInUser);
			setUser(loggedInUser)
		})
		.catch(error =>{
			console.log(error);
		})
	}

	return (
		<div>
		{/* user ? logout : signIn */}
		{
			user ? <button onClick={handleGoogleSignOut}>Log Out</button> :
			<>
				<button onClick={handleGoogleSignIn}>Google Login</button>
				<button onClick={handleGithubSignIn}>Github Login</button>
			</>
		}


		{
			user &&
			<div>
				<h3>User: {user?.displayName}</h3>
				<p>Email: {user?.email}</p>
				<img src={user?.photoURL} alt="img" />
			</div>
		}
		</div>
	);
};

export default Login;