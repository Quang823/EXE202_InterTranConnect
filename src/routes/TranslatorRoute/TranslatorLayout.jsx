import Header_Translator from "../../components/layout/Header/Header_Translator";
import Footer from "../../components/layout/Footer/Footer";

const TranslatorLayout = ({ children }) => {
  return (
    <div className="translator-layout">
      <Header_Translator />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default TranslatorLayout;
