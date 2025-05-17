import { Routes, Route } from "react-router-dom";
import HomePage_Client from "../../pages/Client/HomePage_Client/HomePage_Client";
import Post_Client from "../../pages/Client/PostClient/Post_Client";
import ProfileTranslator from "../../pages/Translator/ProfileTranslator/Profile_Translator";
const ClientRoute = () => {
  return (
    <Routes>
      <Route path="/home" element={<HomePage_Client />} />
      <Route path="/edit_profile" element={<ProfileTranslator />} />
      <Route path="/create_post" element={<Post_Client />} />
    </Routes>
  );
};

export default ClientRoute;
