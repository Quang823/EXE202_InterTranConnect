import React from "react";
import { NavLink } from "react-router-dom";
import "./NavigationMenu.scss";

const NavigationMenu = ({
  user,
  onPostClick,
  className = "",
  mobile = false,
  onItemClick,
}) => {
  const navItems = [
    { path: "/translator/", label: "Home" },
    {
      path: "/translator/job",
      label: "Job",
      requiresAuth: true,
      onClick: onPostClick,
    },
    { path: "/translator/news-blog", label: "News & Blog" },
    { path: "/translator/aboutUs", label: "About Us" },
    { path: "/translator/contactPages", label: "Contact Us" },
    { path: "/translator/subscriptionPlan", label: "Pricing" },
    ...(user ? [{ path: "/translator/forum", label: "Forum" }] : []),
  ];

  return (
    <nav
      className={`itc-navigation-menu ${
        mobile ? "itc-navigation-menu--mobile" : ""
      } ${className}`}
    >
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `itc-navigation-menu__link ${
              isActive ? "itc-navigation-menu__link--active" : ""
            }`
          }
          onClick={(e) => {
            if (item.onClick) item.onClick(e);
            if (onItemClick) onItemClick();
          }}
        >
          <span className="itc-navigation-menu__text">{item.label}</span>
          {!mobile && <div className="itc-navigation-menu__underline"></div>}
        </NavLink>
      ))}
    </nav>
  );
};

export default NavigationMenu;
