import Header from "../../components/layout/Header/Header";
import Footer from "../../components/layout/Footer/Footer";

const ClientLayout = ({ children }) => {
  return (
    <div className="client-layout">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default ClientLayout;
