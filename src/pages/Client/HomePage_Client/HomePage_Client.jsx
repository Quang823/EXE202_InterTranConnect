import React from "react";
import SearchSection from "./SearchSection/SearchSection";
import TopTranslators from "./TopTranslator/TopTranslators";
import TranslatorDirectory from "./TranslatorDirectory/TranslatorDirectory";
import LatestNews from "./LatestNews/LatestNews";
import "./HomePage_Client.scss";

const HomePage_Client = () => {
  return (
    <div className="homepage-client-container">
      <SearchSection />
      <TopTranslators />
      <TranslatorDirectory />
      <LatestNews />
    </div>
  );
};

export default HomePage_Client;
