import Header_Client from "../../components/layout/Header/Header_Client";
import Footer from "../../components/layout/Footer/Footer";

const ClientLayout = ({ children }) => {
  return (
    <div className="client-layout">
      <Header_Client />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default ClientLayout;
