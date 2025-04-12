import { Routes, Route } from "react-router-dom";
import HomePageTranslator from "../../pages/Translator/HomePageTranslator/HomePage_Translator";
import ProfileTranslator from "../../pages/Translator/ProfileTranslator/Profile_Translator";
import JobTranslator from "../../pages/Translator/JobTranslator/Job_Translator";
import JobDetails from "../../components/Translator/Job/JobDetails/JobDetails";
import ApplyJob from "../../components/Translator/Job/ApplyJob/ApplyJob";
const TranslatorRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePageTranslator/>} />
      <Route path="edit_profile" element={<ProfileTranslator/>} />
      <Route path="job" element={<JobTranslator/>} />
      <Route path="job/jobDetails" element={<JobDetails />} />
      <Route path="job/applyJob" element={<ApplyJob />} />
    </Routes>
  );
};

export default TranslatorRoute;
