import { Routes, Route } from "react-router-dom";
import HomePageTranslator from "../../pages/Translator/HomePageTranslator/HomePage_Translator";
import ProfileTranslator from "../../pages/Translator/ProfileTranslator/Profile_Translator";
import JobTranslator from "../../pages/Translator/JobTranslator/Job_Translator";
import JobDetail from "../../pages/Translator/JobTranslator/JobDetail/Job_Details";
import ApplyJobs from "../../pages/Translator/JobTranslator/ApplyJobs/Apply_Job";
import FavoriteJob from "../../pages/Translator/JobTranslator/FavoriteJob/Favorite_Job";
import WalletTrans from "../../pages/Translator/WalletTranslator/WalletTranslator";
import MembershipPlans from "../../pages/Translator/MembershipPlans/MembershipPlans";
import ContactPages from "../../pages/Translator/ContactPages/ContactPages";
import Forums from "../../pages/Translator/Forums/Forums";
import InterTransConnects from "../../pages/Translator/InterTransConnects/InterTransConnects";
import AdminDashboards from "../../pages/Translator/AdminDashboards/AdminDashboards";
import NewsBlog from "../../pages/Shared/NewBlog/NewsBlog";
import AddCertificatePage from "../../pages/Translator/TranslatorCertificate/AddCertificatePage";
import CertificateDetailsPage from "../../pages/Translator/TranslatorCertificate/CertificateDetailsPage";
const TranslatorRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePageTranslator />} />
      <Route path="/edit_profile" element={<ProfileTranslator />} />
      <Route path="/job" element={<JobTranslator />} />
      <Route path="/jobDetails/:id" element={<JobDetail />} />
      <Route path="/jobFavorite" element={<FavoriteJob />} />
      <Route path="/applyJob" element={<ApplyJobs />} />
      <Route path="/wallet" element={<WalletTrans />} />
      <Route path="/subscriptionPlans" element={<MembershipPlans />} />
      <Route path="/contactPages" element={<ContactPages />} />
      <Route path="/forum" element={<Forums />} />
      <Route path="/aboutUs" element={<InterTransConnects />} />
      <Route path="/dashboard" element={<AdminDashboards />} />
      <Route path="/news_blog" element={<NewsBlog />} />
      <Route path="/add_certificate" element={<AddCertificatePage />} />
      <Route path="/certificate_details" element={<CertificateDetailsPage />} />
    </Routes>
  );
};

export default TranslatorRoute;
