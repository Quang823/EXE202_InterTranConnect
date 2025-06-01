import { Routes, Route } from "react-router-dom";
import HomePage_Client from "../../pages/Client/HomePage_Client/HomePage_Client";
import Post_Client from "../../pages/Client/PostClient/Post_Client";
import ProfileTranslator from "../../pages/Translator/ProfileTranslator/Profile_Translator";
import PostHistory from "../../pages/Client/PostHistory/PostHistory";
import PostDetailHistory from "../../pages/Client/PostDetailHistory/PostDetailHistory";
import TranslatorProfile from "../../pages/Client/TranslatorProfile/TranslatorProfile";
import CustomerProfile from "../../pages/Client/CustomerProfile/CustomerProfile";
const ClientRoute = () => {
  return (
    <Routes>
      <Route path="/home" element={<HomePage_Client />} />
      <Route path="/edit_profile" element={<ProfileTranslator />} />
      <Route path="/create_post" element={<Post_Client />} />
      <Route path="/post_history" element={<PostHistory />} />
      <Route path="/post-detail/:jobId" element={<PostDetailHistory />} />
      <Route path="/translator_profile" element={<TranslatorProfile />} />
      <Route path="/customer_profile" element={<CustomerProfile />} />
    </Routes>
  );
};

export default ClientRoute;
