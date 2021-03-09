import React from "react";
import { Link } from "@reach/router";

const NavLink = (props) => (
	<Link
		{...props}
		getProps={({ isCurrent }) => ({
			style: { color: isCurrent ? "#fff" : "#fffc" },
		})}
		className="nav-link"
	/>
);

export default NavLink;
