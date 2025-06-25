import { Routes, Route } from "react-router-dom";
import HomePage_Client from "../../pages/Client/HomePage_Client/HomePage_Client";
import Post_Client from "../../pages/Client/PostClient/Post_Client";
import ProfileTranslator from "../../pages/Translator/ProfileTranslator/Profile_Translator";
import PostHistory from "../../pages/Client/PostHistory/PostHistory";
import PostDetailHistory from "../../pages/Client/PostDetailHistory/PostDetailHistory";
import TranslatorProfile from "../../pages/Client/TranslatorProfile/TranslatorProfile";
import CustomerProfile from "../../pages/Client/CustomerProfile/CustomerProfile";
import WalletClient from "../../pages/Client/WalletClient/WalletClient";
import MembershipPlans from "../../pages/Client/MembershipPlans/MembershipPlans";
import ContactPages from "../../pages/Translator/ContactPages/ContactPages";
import Forums from "../../pages/Translator/Forums/Forums";
import InterTransConnects from "../../pages/Translator/InterTransConnects/InterTransConnects";
import NewsBlog from "../../pages/Shared/NewBlog/NewsBlog";
import NotificationsPage from "../../components/layout/Header/Header_Client/NotificationsPage/NotificationsPage";

const ClientRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage_Client />} />
      <Route path="/view_profile" element={<ProfileTranslator />} />
      <Route path="/create_post" element={<Post_Client />} />
      <Route path="/post_history" element={<PostHistory />} />
      <Route path="/post_detail/:jobId" element={<PostDetailHistory />} />
      <Route
        path="translator_profile/:interpreterId"
        element={<TranslatorProfile />}
      />
      <Route path="/customer_profile" element={<CustomerProfile />} />
      <Route path="/wallet" element={<WalletClient />} />
      <Route path="/subscriptionPlan" element={<MembershipPlans />} />
      <Route path="/contactPages" element={<ContactPages />} />
      <Route path="/forum" element={<Forums />} />
      <Route path="/aboutUs" element={<InterTransConnects />} />
      <Route path="/news_blog" element={<NewsBlog />} />
      <Route path="/notifications" element={<NotificationsPage />} />
    </Routes>
  );
};

export default ClientRoute;
