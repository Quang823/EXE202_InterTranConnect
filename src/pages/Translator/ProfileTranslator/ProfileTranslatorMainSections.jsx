import React, { useState, useEffect } from "react";
import { Phone, Briefcase, Award, BookOpen, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { fetchTranslatorCertificates } from "../../../services/translatorService";

const ProfileTranslatorMainSections = ({ userData, userId }) => {
  const navigate = useNavigate();
  const [certificates, setCertificates] = useState(userData.certificates || []);

  useEffect(() => {
    const loadCertificates = async () => {
      try {
        if (userId) {
          const fetchedCertificates = await fetchTranslatorCertificates(userId);
          setCertificates(fetchedCertificates || []);
        }
      } catch (error) {
        console.error("Failed to load certificates:", error.message);
        setCertificates([]);
      }
    };
    loadCertificates();
  }, [userId]);

  return (
    <div className="main-sections">
      <div className="section-card">
        <div className="section-content">
          <h2 className="section-title">
            <div className="title-accent"></div>
            About
          </h2>
          <p className="section-text">{userData.bio || "No bio available"}</p>
        </div>
      </div>
      <div className="section-card">
        <div className="section-content">
          <h2 className="section-title">
            <div className="title-accent"></div>
            Basic Information
          </h2>
          <ul className="list">
            <li className="list-item">
              <div className="list-bullet"></div>
              <span className="list-text">
                <strong>Full Name:</strong> {userData.firstName}{" "}
                {userData.lastName}
              </span>
            </li>
            <li className="list-item">
              <div className="list-bullet"></div>
              <span className="list-text">
                <strong>Email:</strong> {userData.email}
              </span>
            </li>
            <li className="list-item">
              <div className="list-bullet"></div>
              <span className="list-text">
                <strong>Student ID:</strong> {userData.studentId}
              </span>
            </li>
            <li className="list-item">
              <div className="list-bullet"></div>
              <span className="list-text">
                <strong>Date of Birth:</strong> {userData.dateOfBirth}
              </span>
            </li>
            <li className="list-item">
              <div className="list-bullet"></div>
              <span className="list-text">
                <strong>Gender:</strong> {userData.gender}
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="section-card">
        <div className="section-content">
          <h2 className="section-title">
            <div className="title-accent"></div>
            <Phone className="section-icon" />
            Contact Information
          </h2>
          <ul className="list">
            <li className="list-item">
              <div className="list-bullet"></div>
              <span className="list-text">
                <strong>Mailing Address:</strong> {userData.mailingAddress}
              </span>
            </li>
            <li className="list-item">
              <div className="list-bullet"></div>
              <span className="list-text">
                <strong>Phone Number:</strong> {userData.phoneNumber}
              </span>
            </li>
            <li className="list-item">
              <div className="list-bullet"></div>
              <span className="list-text">
                <strong>Business Fax:</strong> {userData.businessFax}
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="section-card">
        <div className="section-content">
          <h2 className="section-title">
            <div className="title-accent"></div>
            <Briefcase className="section-icon" />
            Job Information
          </h2>
          <ul className="list">
            <li className="list-item">
              <div className="list-bullet"></div>
              <span className="list-text">
                <strong>Company:</strong> {userData.company}
              </span>
            </li>
            <li className="list-item">
              <div className="list-bullet"></div>
              <span className="list-text">
                <strong>Job Title:</strong> {userData.jobTitle}
              </span>
            </li>
            <li className="list-item">
              <div className="list-bullet"></div>
              <span className="list-text">
                <strong>Department:</strong> {userData.department}
              </span>
            </li>
            <li className="list-item">
              <div className="list-bullet"></div>
              <span className="list-text">
                <strong>Work Location:</strong> {userData.workLocation}
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="section-card">
        <div className="section-content">
          <h2 className="section-title">
            <div className="title-accent"></div>
            <Award className="section-icon" />
            Certificates
          </h2>
          {certificates.length > 0 ? (
            <ul className="list">
              {certificates.map((cert) => (
                <li key={cert.id} className="list-item">
                  <CheckCircle className="list-icon" />
                  <span
                    className="list-text clickable"
                    onClick={() => navigate(`/translator/certificate_details`)}
                  >
                    <strong>{cert.title || cert.name}:</strong>{" "}
                    {cert.description || cert.certificateNames}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="section-text">No certificates added</p>
          )}
        </div>
      </div>
      <div className="section-card">
        <div className="section-content">
          <h2 className="section-title">
            <div className="title-accent"></div>
            <BookOpen className="section-icon" />
            Additional Information
          </h2>
          <ul className="list">
            <li className="list-item">
              <div className="list-bullet"></div>
              <span className="list-text">
                <strong>Other Name/Nickname:</strong> {userData.otherName}
              </span>
            </li>
            <li className="list-item">
              <div className="list-bullet"></div>
              <span className="list-text">
                <strong>Address:</strong> {userData.address}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfileTranslatorMainSections;
