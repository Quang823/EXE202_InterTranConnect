import { Routes, Route } from "react-router-dom";
import HomePageTranslator from "../../pages/Translator/HomePageTranslator/HomePage_Translator";
import ProfileTranslator from "../../pages/Translator/ProfileTranslator/Profile_Translator";
import JobTranslator from "../../pages/Translator/JobTranslator/Job_Translator";
import JobDetail from "../../pages/Translator/JobTranslator/JobDetail/Job_Details";
import ApplyJobs from "../../pages/Translator/JobTranslator/ApplyJobs/Apply_Job";
import FavoriteJob from "../../pages/Translator/JobTranslator/FavoriteJob/Favorite_Job";
import WalletTrans from "../../pages/Translator/WalletTranslator/WalletTranslator";
import SubscriptionPlan from "../../pages/Translator/SubscriptionPlan/SubscriptionPlan";
import ContactPages from "../../pages/Translator/ContactPages/ContactPages";
import Forums from "../../pages/Translator/Forums/Forums";
const TranslatorRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePageTranslator/>} />
      <Route path="edit_profile" element={<ProfileTranslator/>} />
      <Route path="job" element={<JobTranslator/>} />
      <Route path="jobDetails" element={<JobDetail />} />
      <Route path="jobFavorite" element={<FavoriteJob />} />
      <Route path="applyJob" element={<ApplyJobs />} />
      <Route path="wallet" element={<WalletTrans />} />
      <Route path="subscriptionPlan" element={<SubscriptionPlan />} />
      <Route path="contactPages" element={<ContactPages />} />
      <Route path="forum" element={<Forums />} />
    </Routes>
  );
};

export default TranslatorRoute;
