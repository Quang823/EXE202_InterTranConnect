import { Routes, Route } from "react-router-dom";
import HomePage_Translator from "../../pages/Translator/HomePage_Translator/HomePage_Translator";
const TranslatorRoute = () => {
  return (
    <Routes>
      <Route path="/home" element={<HomePage_Translator />} />
    </Routes>
  );
};

export default TranslatorRoute;
