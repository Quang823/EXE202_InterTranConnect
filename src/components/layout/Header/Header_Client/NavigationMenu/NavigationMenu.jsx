import React from "react";
import { NavLink } from "react-router-dom";
import "./NavigationMenu.scss";
import { useTranslation } from "react-i18next";

const NavigationMenu = ({
  user,
  onPostClick,
  className = "",
  mobile = false,
  onItemClick,
}) => {
  const { t } = useTranslation();

  const navItems = [
    { path: "/client/", label: t("home") },
    {
      path: "/client/create_post",
      label: t("post"),
      requiresAuth: true,
      onClick: onPostClick,
    },
    { path: "/client/news_blog", label: t("news") },
    { path: "/client/aboutUs", label: t("about") },
    { path: "/client/contactPages", label: t("contact") },
    ...(user
      ? [{ path: "/client/subscriptionPlan", label: t("pricing") }]
      : []),
    ...(user ? [{ path: "/client/forum", label: t("forum") }] : []),
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
