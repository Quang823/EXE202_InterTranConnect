import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Menu, X, Zap } from "lucide-react";
import NavigationMenu from "../Header_Translator/NavigationMenu/NavigationMenu";
import AccountDropdown from "../Header_Translator/AccountDropdown/AccountDropdown";
import LanguageDropdown from "../Header_Client/LanguageDropdown/LanguageDropdown";
import HeroSection from "../Header_Translator/HeroSection/HeroSection";
import Image from "../../../../assets/images/Image";
import "./Header_Translator.scss";
import ToastManager from "../../../common/Toast/ToastManager";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../../../../hooks/useAuth";
import NotificationBell from "../Header_Client/NotificationBell/NotificationBell";

const Header_Translator = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleHireTranslator = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      ToastManager.showSuccess("Translator hired successfully!");
    }, 2000);
  };

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
    navigate("/translator/");
  };

  const handleNavigation = (path) => {
    setIsMobileMenuOpen(false);
    navigate(path);
  };

  const renderCompactHeader = () => (
    <header className="itc-header itc-header--compact">
      <nav
        className={`itc-header__nav ${
          isScrolled ? "itc-header__nav--scrolled" : ""
        }`}
      >
        <div className="itc-header__container">
          <div className="itc-header__nav-content">
            {/* Logo */}
            <div
              className="itc-header__logo"
              onClick={() => handleNavigation("/translator/")}
            >
              <div className="itc-header__logo-icon">
                <Image
                  className="itc-header__logo-svg"
                  src="logo"
                  alt="Inter-Trans Connect Logo"
                />
                <div className="itc-header__logo-glow"></div>
              </div>
              <div className="itc-header__logo-text">
                <h1 className="itc-header__brand-name">INTER-TRANS CONNECT</h1>
              </div>
            </div>

            {/* Desktop Navigation */}
            <NavigationMenu
              user={user}
              className="itc-navigation-menu itc-navigation-menu--desktop"
            />

            {/* Right Section */}
            <div className="itc-header__actions">
              {user ? (
                <div className="itc-header__user-section">
                  <LanguageDropdown />
                  <NotificationBell />
                  <AccountDropdown user={user} onLogout={handleLogout} />
                </div>
              ) : (
                <div className="itc-header__auth-buttons">
                  <Button
                    variant="ghost"
                    className="itc-header__auth-btn itc-header__auth-btn--login"
                    onClick={() => handleNavigation("/login")}
                  >
                    Login
                  </Button>
                  <Button
                    className="itc-header__auth-btn itc-header__auth-btn--register"
                    onClick={() => handleNavigation("/register")}
                  >
                    Register
                  </Button>
                </div>
              )}

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="itc-header__mobile-toggle"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X /> : <Menu />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="itc-header__mobile-menu">
              <NavigationMenu
                user={user}
                className="itc-navigation-menu itc-navigation-menu--mobile"
                mobile={true}
                onItemClick={() => setIsMobileMenuOpen(false)}
              />
              {user ? (
                <div className="itc-header__mobile-user">
                  <LanguageDropdown mobile />
                  <NotificationBell mobile />
                  <AccountDropdown user={user} onLogout={handleLogout} mobile />
                </div>
              ) : (
                <div className="itc-header__mobile-auth">
                  <Button
                    variant="ghost"
                    className="itc-header__mobile-auth-btn"
                    onClick={() => handleNavigation("/login")}
                  >
                    Login
                  </Button>
                  <Button
                    className="itc-header__mobile-auth-btn itc-header__mobile-auth-btn--register"
                    onClick={() => handleNavigation("/register")}
                  >
                    Register
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
      <ToastContainer />
    </header>
  );

  const renderFullHeader = () => (
    <header className="itc-header">
      <div className="itc-header__bg">
        <div className="itc-header__bg-circle itc-header__bg-circle--1"></div>
        <div className="itc-header__bg-circle itc-header__bg-circle--2"></div>
        <div className="itc-header__bg-circle itc-header__bg-circle--3"></div>
      </div>
      <nav
        className={`itc-header__nav ${
          isScrolled ? "itc-header__nav--scrolled" : ""
        }`}
      >
        <div className="itc-header__container">
          <div className="itc-header__nav-content">
            {/* Logo */}
            <div
              className="itc-header__logo"
              onClick={() => handleNavigation("/translator/")}
            >
              <div className="itc-header__logo-icon">
                <Image
                  className="itc-header__logo-svg"
                  src="logo"
                  alt="Inter-Trans Connect Logo"
                />
                <div className="itc-header__logo-glow"></div>
              </div>
              <div className="itc-header__logo-text">
                <h1 className="itc-header__brand-name">INTER-TRANS CONNECT</h1>
              </div>
            </div>

            {/* Desktop Navigation */}
            <NavigationMenu
              user={user}
              className="itc-navigation-menu itc-navigation-menu--desktop"
            />

            {/* Right Section */}
            <div className="itc-header__actions">
              {user ? (
                <div className="itc-header__user-section">
                  <LanguageDropdown />
                  <NotificationBell />
                  <AccountDropdown user={user} onLogout={handleLogout} />
                </div>
              ) : (
                <div className="itc-header__auth-buttons">
                  <Button
                    variant="ghost"
                    className="itc-header__auth-btn itc-header__auth-btn--login"
                    onClick={() => handleNavigation("/login")}
                  >
                    Login
                  </Button>
                  <Button
                    className="itc-header__auth-btn itc-header__auth-btn--register"
                    onClick={() => handleNavigation("/register")}
                  >
                    Register
                  </Button>
                </div>
              )}

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="itc-header__mobile-toggle"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X /> : <Menu />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="itc-header__mobile-menu">
              <NavigationMenu
                user={user}
                className="itc-navigation-menu itc-navigation-menu--mobile"
                mobile={true}
                onItemClick={() => setIsMobileMenuOpen(false)}
              />
              {user ? (
                <div className="itc-header__mobile-user">
                  <LanguageDropdown mobile />
                  <NotificationBell mobile />
                  <AccountDropdown user={user} onLogout={handleLogout} mobile />
                </div>
              ) : (
                <div className="itc-header__mobile-auth">
                  <Button
                    variant="ghost"
                    className="itc-header__mobile-auth-btn"
                    onClick={() => handleNavigation("/login")}
                  >
                    Login
                  </Button>
                  <Button
                    className="itc-header__mobile-auth-btn itc-header__mobile-auth-btn--register"
                    onClick={() => handleNavigation("/register")}
                  >
                    Register
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
      <HeroSection />
      <ToastContainer />
    </header>
  );

  return location.pathname === "/translator/"
    ? renderFullHeader()
    : renderCompactHeader();
};

export default Header_Translator;
