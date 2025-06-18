import Header_Translator from "../../components/layout/Header/Header_Translator/Header_Translator";
import Footer from "../../components/layout/Footer/Footer";

const TranslatorLayout = ({
  children,
  showSidebar = false,
  sidebarContent,
  showHeader = true,
  showFooter = true,
}) => {
  return (
    <div className="translator-layout">
      {showHeader && <Header_Translator />}
      <div className="content-wrapper">
        {showSidebar && <aside className="sidebar">{sidebarContent}</aside>}
        <main>{children}</main>
      </div>
      {showFooter && <Footer />}
    </div>
  );
};

export default TranslatorLayout;
