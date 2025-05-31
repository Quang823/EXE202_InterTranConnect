import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  ListGroup,
} from "react-bootstrap";
import {
  FaStar,
  FaFilter,
  FaLanguage,
  FaBriefcase,
  FaUserTie,
} from "react-icons/fa";
import "./HomePage_Client.scss";

const translators = [
  {
    name: "Kieu Anh",
    title: "Professional Interpreter",
    description:
      "Specialized in business, legal, medical, and technical interpretation.",
    image:
      "https://res.cloudinary.com/dk3yac2ie/image/upload/v1744270065/TIME-Studio-headshot-3-elements_qhvu8q_Circle_kqpkz1.jpg",
    social: ["facebook", "twitter", "linkedin"],
  },
  {
    name: "Truong Thinh",
    title: "Expert Interpreter",
    description:
      "Experienced in translation for business, legal, and technical fields.",
    image:
      "https://res.cloudinary.com/dk3yac2ie/image/upload/v1744269752/Ban-sao-cua-Anh-Profile.04-scaled_vuvqel_Circle_rdve2p.jpg",
    social: ["facebook", "twitter", "linkedin"],
  },
  {
    name: "Thanh Thuy",
    title: "Specialized Translator",
    description: "Skilled in business, legal, and medical translation.",
    image:
      "https://res.cloudinary.com/dk3yac2ie/image/upload/v1744270074/Anh-CV-chuyen-nghiep-min-1.jpg_exzc9m_Circle_miymix.webp",
    social: ["facebook", "twitter", "linkedin"],
  },
];

const translatorList = [
  {
    name: "Le Minh",
    title: "Legal Interpreter",
    price: "$75/hr",
    fields: [
      "Legal Translation",
      "Contract Translation",
      "Business Negotiation",
    ],
    experience: "10+ years",
    status: "Available",
    image:
      "https://res.cloudinary.com/dk3yac2ie/image/upload/v1744270065/TIME-Studio-headshot-3-elements_qhvu8q_Circle_kqpkz1.jpg",
  },
  {
    name: "Gia Thinh",
    title: "Legal Interpreter",
    price: "$65/hr",
    fields: [
      "Legal Translation",
      "Document Translation",
      "Medical Interpretation",
    ],
    experience: "8 years",
    status: "Booked",
    image:
      "https://res.cloudinary.com/dk3yac2ie/image/upload/v1744269752/Ban-sao-cua-Anh-Profile.04-scaled_vuvqel_Circle_rdve2p.jpg",
  },
  {
    name: "Sarah B.",
    title: "Legal Interpreter",
    price: "$85/hr",
    fields: [
      "Legal Translation",
      "Government Contracts",
      "Medical Interpretation",
    ],
    experience: "12 years",
    status: "Available",
    image:
      "https://res.cloudinary.com/dk3yac2ie/image/upload/v1744270074/Anh-CV-chuyen-nghiep-min-1.jpg_exzc9m_Circle_miymix.webp",
  },
  {
    name: "Archana T.",
    title: "Business Interpreter",
    price: "$70/hr",
    fields: [
      "Business Negotiation",
      "Legal Contracts",
      "Technical Translation",
    ],
    experience: "9 years",
    status: "Available",
    image:
      "https://res.cloudinary.com/dk3yac2ie/image/upload/v1744270065/TIME-Studio-headshot-3-elements_qhvu8q_Circle_kqpkz1.jpg",
  },
  {
    name: "Gautham P.",
    title: "Legal Interpreter",
    price: "$80/hr",
    fields: [
      "Legal Translation",
      "Business Negotiation",
      "Government Contracts",
    ],
    experience: "15 years",
    status: "Available",
    image:
      "https://res.cloudinary.com/dk3yac2ie/image/upload/v1744269752/Ban-sao-cua-Anh-Profile.04-scaled_vuvqel_Circle_rdve2p.jpg",
  },
  {
    name: "Rajan T.",
    title: "Business Interpreter",
    price: "$60/hr",
    fields: [
      "Business Negotiation",
      "Legal Contracts",
      "Medical Interpretation",
    ],
    experience: "7 years",
    status: "Available",
    image:
      "https://res.cloudinary.com/dk3yac2ie/image/upload/v1744270074/Anh-CV-chuyen-nghiep-min-1.jpg_exzc9m_Circle_miymix.webp",
  },
];

const HomePage_Client = () => {
  return (
    <div className="home-page-client">
      {/* Top Translators Section */}
      <section className="hpc-top-translators-section">
        <Container>
          <h2 className="hpc-section-title">Top Translators</h2>
          <Row>
            {translators.map((translator, index) => (
              <Col md={4} key={index} className="hpc-translator-card-col">
                <Card className="hpc-translator-card shadow">
                  <div className="hpc-image-wrapper">
                    <Card.Img
                      variant="top"
                      src={translator.image}
                      className="hpc-translator-image"
                    />
                  </div>
                  <Card.Body className="text-center">
                    <Card.Title className="fw-bold">
                      {translator.name}
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {translator.title}
                    </Card.Subtitle>
                    <Card.Text>{translator.description}</Card.Text>
                    <div className="hpc-social-links mb-3">
                      {translator.social.map((social, idx) => (
                        <a
                          href="#"
                          key={idx}
                          className={`hpc-social-icon ${social} me-2`}
                        >
                          <i className={`fab fa-${social}`} />
                        </a>
                      ))}
                    </div>
                    <div className="hpc-card-buttons">
                      <Button
                        variant="primary"
                        className="hpc-view-profile-btn me-2"
                      >
                        View Profile
                      </Button>
                      <Button variant="success" className="hpc-book-now-btn">
                        Book Now
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Choose Your Translators Section */}
      <section className="hpc-choose-translators-section">
        <Container>
          <h2 className="hpc-section-title">Choose Your Translators</h2>
          <Row>
            {/* Filters Sidebar */}
            <Col md={3} className="hpc-filters-sidebar mb-4">
              <div className="p-3 bg-light rounded shadow-sm">
                <h4 className="h6 fw-bold mb-3">
                  <FaFilter className="me-2" /> Looking For
                </h4>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Translator, Interpreter..."
                    className="rounded-pill"
                  />
                </Form.Group>
                <h4 className="h6 fw-bold mb-3">
                  <FaLanguage className="me-2" /> Source Language
                </h4>
                <Form.Select className="mb-3 rounded-pill">
                  <option>English</option>
                  <option>Vietnamese</option>
                  <option>Spanish</option>
                  <option>French</option>
                </Form.Select>
                <h4 className="h6 fw-bold mb-3">
                  <FaLanguage className="me-2" /> Target Language
                </h4>
                <Form.Select className="mb-3 rounded-pill">
                  <option>Vietnamese</option>
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                </Form.Select>
                <h4 className="h6 fw-bold mb-3">
                  <FaBriefcase className="me-2" /> Experience Level
                </h4>
                <Form.Check
                  type="checkbox"
                  label="Beginner (1-3 years)"
                  className="mb-2"
                />
                <Form.Check
                  type="checkbox"
                  label="Intermediate (3-5 years)"
                  className="mb-2"
                />
                <Form.Check
                  type="checkbox"
                  label="Expert (5+ years)"
                  className="mb-2"
                />
                <h4 className="h6 fw-bold mb-3">
                  <FaUserTie className="me-2" /> Service Type
                </h4>
                <Form.Check
                  type="checkbox"
                  label="Translation"
                  className="mb-2"
                />
                <Form.Check
                  type="checkbox"
                  label="Interpretation"
                  className="mb-2"
                />
                <Form.Check type="checkbox" label="Both" className="mb-2" />
              </div>
            </Col>

            {/* Translators List */}
            <Col md={9} className="hpc-translators-list">
              {translatorList.map((translator, index) => (
                <Card
                  key={index}
                  className="hpc-translator-list-item mb-3 shadow-sm"
                  style={{ height: "auto" }}
                >
                  <Row className="align-items-center p-2">
                    <Col md={2} xs={3} className="hpc-translator-image-col">
                      <Card.Img
                        src={translator.image}
                        className="hpc-translator-list-image rounded-circle"
                      />
                    </Col>
                    <Col md={7} xs={9}>
                      <Card.Body>
                        <Card.Title className="h5 fw-bold">
                          {translator.name}
                        </Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                          {translator.title}
                        </Card.Subtitle>
                        <div className="hpc-translator-details mb-2">
                          <span className="hpc-price text-primary fw-bold me-3">
                            {translator.price}
                          </span>
                          <span className="hpc-rating text-warning me-3">
                            <FaStar /> 4.9
                          </span>
                          <span
                            className={`hpc-status badge ${
                              translator.status.toLowerCase() === "available"
                                ? "bg-success"
                                : "bg-danger"
                            }`}
                          >
                            {translator.status}
                          </span>
                        </div>
                        <div className="hpc-translator-fields mb-2">
                          {translator.fields.map((field, idx) => (
                            <span
                              key={idx}
                              className="hpc-field-badge badge bg-light text-dark me-2"
                            >
                              {field}
                            </span>
                          ))}
                        </div>
                        <Card.Text className="text-muted small">
                          Experience: {translator.experience}
                        </Card.Text>
                      </Card.Body>
                    </Col>
                    <Col
                      md={3}
                      xs={12}
                      className="hpc-book-now-col text-center"
                    >
                      <Button
                        variant="success"
                        className="hpc-book-now-btn rounded-pill"
                      >
                        Book Now
                      </Button>
                    </Col>
                  </Row>
                </Card>
              ))}
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default HomePage_Client;
