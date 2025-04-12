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
      <section className="top-translators-section">
        <Container>
          <h2 className="section-title">Top Translators</h2>
          <Row>
            {translators.map((translator, index) => (
              <Col md={4} key={index} className="translator-card-col">
                <Card className="translator-card">
                  <Card.Img
                    variant="top"
                    src={translator.image}
                    className="translator-image"
                  />
                  <Card.Body>
                    <Card.Title>{translator.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {translator.title}
                    </Card.Subtitle>
                    <Card.Text>{translator.description}</Card.Text>
                    <div className="social-links">
                      {translator.social.map((social, idx) => (
                        <a
                          href="#"
                          key={idx}
                          className={`social-icon ${social}`}
                        >
                          <i className={`fab fa-${social}`} />
                        </a>
                      ))}
                    </div>
                    <div className="card-buttons">
                      <Button variant="primary" className="view-profile-btn">
                        View Profile
                      </Button>
                      <Button variant="success" className="book-now-btn">
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
      <section className="choose-translators-section">
        <Container>
          <h2 className="section-title">Choose Your Translators</h2>
          <Row>
            {/* Filters Sidebar */}
            <Col md={3} className="filters-sidebar">
              <div className="filter-group">
                <h4>
                  <FaFilter /> Looking For
                </h4>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Translator, Interpreter..."
                  />
                </Form.Group>
              </div>
              <div className="filter-group">
                <h4>
                  <FaLanguage /> Source Language
                </h4>
                <Form.Control as="select">
                  <option>English</option>
                  <option>Vietnamese</option>
                  <option>Spanish</option>
                  <option>French</option>
                </Form.Control>
              </div>
              <div className="filter-group">
                <h4>
                  <FaLanguage /> Target Language
                </h4>
                <Form.Control as="select">
                  <option>Vietnamese</option>
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                </Form.Control>
              </div>
              <div className="filter-group">
                <h4>
                  <FaBriefcase /> Experience Level
                </h4>
                <Form.Check type="checkbox" label="Beginner (1-3 years)" />
                <Form.Check type="checkbox" label="Intermediate (3-5 years)" />
                <Form.Check type="checkbox" label="Expert (5+ years)" />
              </div>
              <div className="filter-group">
                <h4>
                  <FaUserTie /> Service Type
                </h4>
                <Form.Check type="checkbox" label="Translation" />
                <Form.Check type="checkbox" label="Interpretation" />
                <Form.Check type="checkbox" label="Both" />
              </div>
            </Col>

            {/* Translators List */}
            <Col md={9} className="translators-list">
              {translatorList.map((translator, index) => (
                <Card key={index} className="translator-list-item">
                  <Row>
                    <Col md={2} className="translator-image-col">
                      <Card.Img
                        src={translator.image}
                        className="translator-list-image"
                      />
                    </Col>
                    <Col md={7}>
                      <Card.Body>
                        <Card.Title>{translator.name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                          {translator.title}
                        </Card.Subtitle>
                        <div className="translator-details">
                          <span className="price">{translator.price}</span>
                          <span className="rating">
                            <FaStar /> 4.9
                          </span>
                          <span
                            className={`status ${translator.status.toLowerCase()}`}
                          >
                            {translator.status}
                          </span>
                        </div>
                        <div className="translator-fields">
                          {translator.fields.map((field, idx) => (
                            <span key={idx} className="field-badge">
                              {field}
                            </span>
                          ))}
                        </div>
                        <Card.Text>
                          Experience: {translator.experience}
                        </Card.Text>
                      </Card.Body>
                    </Col>
                    <Col md={3} className="book-now-col">
                      <Button variant="success" className="book-now-btn">
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
