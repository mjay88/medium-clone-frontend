import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Header from "./components/layouts/Header";
import Profile from "./components/user/Profile";
import Write from "./components/articles/Write";
import Article from "./components/articles/Article";

export default function App() {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/write" element={<Write />} />
				<Route path="/articles/:slug" element={<Article />} />
			</Routes>
		</BrowserRouter>
	);
}
