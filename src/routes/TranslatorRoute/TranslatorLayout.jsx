import Header_Translator from "../../components/layout/Header/Header_Translator";
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
      <style jsx>{`
        .translator-layout {
          .content-wrapper {
            display: flex;
            flex: 1;
            main {
              flex: 3;
              padding: 16px;
            }
          }
        }
      `}</style>
    </div>
  );
};

export default TranslatorLayout;
