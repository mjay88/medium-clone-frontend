import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SideBar from "./partials/SideBar";
import UserArticles from "./articles/UserArticles";

export default function Profile() {
	const { isLoggedIn } = useSelector((state) => state.user);
	const navigate = useNavigate();

	useEffect(() => {
		if (!isLoggedIn) navigate("/login");
	}, [isLoggedIn]);

	return (
		<div className="container">
			<div className="row my-5">
				<SideBar />
				<UserArticles />
			</div>
		</div>
	);
}
