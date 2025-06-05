"use client"

import { useEffect, useState } from "react"
import { Globe, Users, Award, FileCheck, ChevronRight, Play, Check, X } from "lucide-react"
import "./InterTransConnect.scss"

const InterTransConnect = () => {
  const [activeTab, setActiveTab] = useState(0)
  const [activeFaq, setActiveFaq] = useState(null)

  useEffect(() => {
    // Intersection Observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in")
          }
        })
      },
      { threshold: 0.1 },
    )

    document.querySelectorAll(".animate").forEach((el) => {
      observer.observe(el)
    })

    return () => {
      document.querySelectorAll(".animate").forEach((el) => {
        observer.unobserve(el)
      })
    }
  }, [])

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index)
  }

  return (
    <div className="itc-container">
      {/* Hero Section */}
      <section className="itc-hero">
        <div className="itc-hero-content">
          <div className="itc-hero-text animate">
            <h1>
              Connecting Languages, <span>Building Bridges</span>
            </h1>
            <p>
              Join our global network of professional translators and interpreters to find meaningful work opportunities
              and grow your career in language services.
            </p>
            <div className="itc-hero-buttons">
              <button className="itc-btn-primary">Get Started</button>
              <button className="itc-btn-secondary">Learn More</button>
            </div>
          </div>
          <div className="itc-hero-image animate">
            <img src="https://media.istockphoto.com/id/1364548726/photo/translate-language-online-learning-global-communication.jpg?s=612x612&w=0&k=20&c=KLhACgXNCIFZrABILSbRtT7erpBMWZVHj_AO67g4PWs=" alt="Global translation network" />
            <div className="itc-floating-element itc-float-1">
              <Globe size={24} />
              <span>120+ Languages</span>
            </div>
            <div className="itc-floating-element itc-float-2">
              <Users size={24} />
              <span>Global Network</span>
            </div>
          </div>
        </div>
        <div className="itc-hero-stats">
          <div className="itc-stat animate">
            <span className="itc-stat-number">5000+</span>
            <span className="itc-stat-label">Translators</span>
          </div>
          <div className="itc-stat animate">
            <span className="itc-stat-number">120+</span>
            <span className="itc-stat-label">Languages</span>
          </div>
          <div className="itc-stat animate">
            <span className="itc-stat-number">98%</span>
            <span className="itc-stat-label">Satisfaction</span>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="itc-about">
        <div className="itc-section-header animate">
          <h2>About Us</h2>
          <p>Discover why we're the leading platform for language professionals</p>
        </div>

        <div className="itc-about-content">
          <div className="itc-about-image animate">
            <img src="https://t4.ftcdn.net/jpg/11/11/01/05/360_F_1111010555_cqd9mAOYvQrI0k8PE8J3hsIP3pYo7Jua.jpg" alt="About InterTransConnect" />
            <div className="itc-image-shape shape-1"></div>
            <div className="itc-image-shape shape-2"></div>
          </div>
          <div className="itc-about-text animate">
            <h3>Our Mission</h3>
            <p>
              Inter-TransConnect: Connecting translators and interpreters with businesses for seamless global communication.
            </p>

            <div className="itc-features">
              <div className="itc-feature">
                <div className="itc-feature-icon">
                  <Globe />
                </div>
                <div className="itc-feature-text">
                  <h4>Global Network</h4>
                  <p>Connect with certified translators & interpreters worldwide</p>
                </div>
              </div>

              <div className="itc-feature">
                <div className="itc-feature-icon">
                  <Users />
                </div>
                <div className="itc-feature-text">
                  <h4>Industry Expertise</h4>
                  <p>Specialists in legal, medical, technical, and marketing translations</p>
                </div>
              </div>

              <div className="itc-feature">
                <div className="itc-feature-icon">
                  <Award />
                </div>
                <div className="itc-feature-text">
                  <h4>Quality Assurance</h4>
                  <p>Every translation goes through rigorous quality control</p>
                </div>
              </div>

              <div className="itc-feature">
                <div className="itc-feature-icon">
                  <FileCheck />
                </div>
                <div className="itc-feature-text">
                  <h4>Certified Results</h4>
                  <p>Official certification available for all translations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="itc-services">
        <div className="itc-section-header animate">
          <h2>Our Services</h2>
          <p>Comprehensive language solutions for every need</p>
        </div>

        <div className="itc-tabs">
          <div className="itc-tab-headers animate">
            <button className={activeTab === 0 ? "active" : ""} onClick={() => setActiveTab(0)}>
              Translation
            </button>
            <button className={activeTab === 1 ? "active" : ""} onClick={() => setActiveTab(1)}>
              Interpretation
            </button>
            <button className={activeTab === 2 ? "active" : ""} onClick={() => setActiveTab(2)}>
              Localization
            </button>
            <button className={activeTab === 3 ? "active" : ""} onClick={() => setActiveTab(3)}>
              Content Creation
            </button>
          </div>

          <div className="itc-tab-content animate">
            {activeTab === 0 && (
              <div className="itc-tab-panel">
                <div className="itc-tab-image">
                  <img src="https://media.istockphoto.com/id/452753401/photo/hello.jpg?s=612x612&w=0&k=20&c=RBTDtJ0zrEqi8MjISgWXz7CW9OOVeHgZGrdxklphxAQ=" alt="Translation services" />
                  <div className="itc-image-accent"></div>
                </div>
                <div className="itc-tab-text">
                  <h3>Professional Translation Services</h3>
                  <p>
                    Our network of professional translators provides accurate and culturally appropriate translations
                    for all types of content, from technical documents to creative marketing materials.
                  </p>
                  <ul className="itc-check-list">
                    <li>
                      <Check /> Document Translation
                    </li>
                    <li>
                      <Check /> Website Translation
                    </li>
                    <li>
                      <Check /> Legal Translation
                    </li>
                    <li>
                      <Check /> Medical Translation
                    </li>
                    <li>
                      <Check /> Technical Translation
                    </li>
                    <li>
                      <Check /> Marketing Translation
                    </li>
                  </ul>
                  <button className="itc-btn-primary">
                    Learn More <ChevronRight />
                  </button>
                </div>
              </div>
            )}

            {activeTab === 1 && (
              <div className="itc-tab-panel">
                <div className="itc-tab-image">
                  <img src="https://www.lionbridge.com/content/lionbridge/en/content-transformation-services/interpretation-services/_jcr_content/root/responsivegrid/teaser_1366313247_co.coreimg.100.1440.jpeg/1746707209371/opi-web-healthcare-feature-800x694.jpeg" alt="Interpretation services" />
                  <div className="itc-image-accent"></div>
                </div>
                <div className="itc-tab-text">
                  <h3>Expert Interpretation Services</h3>
                  <p>
                    Our interpreters facilitate real-time communication across language barriers for conferences,
                    meetings, legal proceedings, and more.
                  </p>
                  <ul className="itc-check-list">
                    <li>
                      <Check /> Simultaneous Interpretation
                    </li>
                    <li>
                      <Check /> Consecutive Interpretation
                    </li>
                    <li>
                      <Check /> Conference Interpretation
                    </li>
                    <li>
                      <Check /> Legal Interpretation
                    </li>
                    <li>
                      <Check /> Medical Interpretation
                    </li>
                    <li>
                      <Check /> Remote Interpretation
                    </li>
                  </ul>
                  <button className="itc-btn-primary">
                    Learn More <ChevronRight />
                  </button>
                </div>
              </div>
            )}

            {activeTab === 2 && (
              <div className="itc-tab-panel">
                <div className="itc-tab-image">
                  <img src="https://www.crystalhues.com/images/UploadedImages/BlogDocuments/ef49d5c0af.jpg" alt="Localization services" />
                  <div className="itc-image-accent"></div>
                </div>
                <div className="itc-tab-text">
                  <h3>Complete Localization Solutions</h3>
                  <p>
                    We adapt your content to specific markets, ensuring it resonates with local audiences while
                    maintaining your brand's identity and message.
                  </p>
                  <ul className="itc-check-list">
                    <li>
                      <Check /> Website Localization
                    </li>
                    <li>
                      <Check /> Software Localization
                    </li>
                    <li>
                      <Check /> App Localization
                    </li>
                    <li>
                      <Check /> Game Localization
                    </li>
                    <li>
                      <Check /> E-commerce Localization
                    </li>
                    <li>
                      <Check /> Multimedia Localization
                    </li>
                  </ul>
                  <button className="itc-btn-primary">
                    Learn More <ChevronRight />
                  </button>
                </div>
              </div>
            )}

            {activeTab === 3 && (
              <div className="itc-tab-panel">
                <div className="itc-tab-image">
                  <img src="https://keycontent.com/wp-content/uploads/2023/06/AdobeStock_288510230.jpg" alt="Content creation services" />
                  <div className="itc-image-accent"></div>
                </div>
                <div className="itc-tab-text">
                  <h3>Multilingual Content Creation</h3>
                  <p>
                    Our content creators develop original, engaging content in multiple languages tailored to your
                    target audience and marketing goals.
                  </p>
                  <ul className="itc-check-list">
                    <li>
                      <Check /> Multilingual Copywriting
                    </li>
                    <li>
                      <Check /> Blog Content
                    </li>
                    <li>
                      <Check /> Social Media Content
                    </li>
                    <li>
                      <Check /> SEO Content
                    </li>
                    <li>
                      <Check /> Product Descriptions
                    </li>
                    <li>
                      <Check /> Email Campaigns
                    </li>
                  </ul>
                  <button className="itc-btn-primary">
                    Learn More <ChevronRight />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="itc-how-it-works">
        <div className="itc-section-header animate">
          <h2>How It Works</h2>
          <p>Simple steps to start your journey with InterTransConnect</p>
        </div>

        <div className="itc-process">
          <div className="itc-process-step animate">
            <div className="itc-step-number">1</div>
            <div className="itc-step-content">
              <h3>Create Your Account</h3>
              <p>
                Sign up and complete your professional profile with your language pairs, specializations, and
                experience.
              </p>
            </div>
          </div>

          <div className="itc-process-connector animate"></div>

          <div className="itc-process-step animate">
            <div className="itc-step-number">2</div>
            <div className="itc-step-content">
              <h3>Upload Credentials</h3>
              <p>Submit your certifications, portfolio, and references to verify your qualifications.</p>
            </div>
          </div>

          <div className="itc-process-connector animate"></div>

          <div className="itc-process-step animate">
            <div className="itc-step-number">3</div>
            <div className="itc-step-content">
              <h3>Find Opportunities</h3>
              <p>Browse available projects that match your skills and interests in our job marketplace.</p>
            </div>
          </div>

          <div className="itc-process-connector animate"></div>

          <div className="itc-process-step animate">
            <div className="itc-step-number">4</div>
            <div className="itc-step-content">
              <h3>Apply and Connect</h3>
              <p>Submit proposals for projects and connect with clients from around the world.</p>
            </div>
          </div>
        </div>

        <div className="itc-video-preview animate">
          <div className="itc-video-thumbnail">
            <img src="/placeholder.svg?height=500&width=900" alt="How it works video" />
            <div className="itc-play-button">
              <Play />
            </div>
          </div>
          <h3>Watch how InterTransConnect works for language professionals</h3>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="itc-testimonials">
        <div className="itc-section-header animate">
          <h2>Success Stories</h2>
          <p>Hear from translators and interpreters who have grown their careers with us</p>
        </div>

        <div className="itc-testimonial-grid">
          <div className="itc-testimonial animate">
            <div className="itc-testimonial-content">
              <p>
                "InterTransConnect has transformed my freelance translation career. I now have a steady stream of
                projects in my specialized field of medical translation."
              </p>
            </div>
            <div className="itc-testimonial-author">
              <img src="/placeholder.svg?height=60&width=60" alt="Maria Rodriguez" />
              <div>
                <h4>Maria Rodriguez</h4>
                <p>Medical Translator, Spanish-English</p>
              </div>
            </div>
          </div>

          <div className="itc-testimonial animate">
            <div className="itc-testimonial-content">
              <p>
                "As a conference interpreter, finding consistent work was challenging until I joined InterTransConnect.
                Their platform connects me with global events and conferences."
              </p>
            </div>
            <div className="itc-testimonial-author">
              <img src="/placeholder.svg?height=60&width=60" alt="Jean Dupont" />
              <div>
                <h4>Jean Dupont</h4>
                <p>Conference Interpreter, French-English-German</p>
              </div>
            </div>
          </div>

          <div className="itc-testimonial animate">
            <div className="itc-testimonial-content">
              <p>
                "The specialized projects available through InterTransConnect have allowed me to focus exclusively on
                legal translation, which is my passion and expertise."
              </p>
            </div>
            <div className="itc-testimonial-author">
              <img src="/placeholder.svg?height=60&width=60" alt="Hiroshi Tanaka" />
              <div>
                <h4>Hiroshi Tanaka</h4>
                <p>Legal Translator, Japanese-English</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="itc-faq">
        <div className="itc-section-header animate">
          <h2>Frequently Asked Questions</h2>
          <p>Find answers to common questions about InterTransConnect</p>
        </div>

        <div className="itc-faq-container">
          <div className="itc-faq-list animate">
            <div className={`itc-faq-item ${activeFaq === 0 ? "active" : ""}`} onClick={() => toggleFaq(0)}>
              <div className="itc-faq-question">
                <h3>How can I join InterTransConnect as a translator or interpreter?</h3>
                <span className="itc-faq-icon">{activeFaq === 0 ? <X /> : <ChevronRight />}</span>
              </div>
              <div className="itc-faq-answer">
                <p>
                  To join our platform, create an account on our website, complete your professional profile with your
                  language pairs, specializations, and experience, upload your credentials for verification, and once
                  approved, you can start browsing and applying for projects.
                </p>
              </div>
            </div>

            <div className={`itc-faq-item ${activeFaq === 1 ? "active" : ""}`} onClick={() => toggleFaq(1)}>
              <div className="itc-faq-question">
                <h3>What types of projects are available on InterTransConnect?</h3>
                <span className="itc-faq-icon">{activeFaq === 1 ? <X /> : <ChevronRight />}</span>
              </div>
              <div className="itc-faq-answer">
                <p>
                  Our platform offers a wide range of projects including document translation, website localization,
                  conference interpretation, legal translation, medical interpretation, technical documentation,
                  marketing content, subtitling, and more across various industries and language pairs.
                </p>
              </div>
            </div>

            <div className={`itc-faq-item ${activeFaq === 2 ? "active" : ""}`} onClick={() => toggleFaq(2)}>
              <div className="itc-faq-question">
                <h3>How do I get paid for completed projects?</h3>
                <span className="itc-faq-icon">{activeFaq === 2 ? <X /> : <ChevronRight />}</span>
              </div>
              <div className="itc-faq-answer">
                <p>
                  We offer multiple payment options including direct deposit, PayPal, and wire transfers. Payments are
                  processed bi-weekly for all completed and approved work. You can track your earnings and payment
                  status in your account dashboard.
                </p>
              </div>
            </div>

            <div className={`itc-faq-item ${activeFaq === 3 ? "active" : ""}`} onClick={() => toggleFaq(3)}>
              <div className="itc-faq-question">
                <h3>Is there a certification requirement to join?</h3>
                <span className="itc-faq-icon">{activeFaq === 3 ? <X /> : <ChevronRight />}</span>
              </div>
              <div className="itc-faq-answer">
                <p>
                  While certification is preferred, we also consider experience and skill level. All applicants undergo
                  a thorough vetting process including language proficiency tests. For certain specialized fields like
                  legal or medical translation, specific certifications may be required.
                </p>
              </div>
            </div>

            <div className={`itc-faq-item ${activeFaq === 4 ? "active" : ""}`} onClick={() => toggleFaq(4)}>
              <div className="itc-faq-question">
                <h3>How can I increase my chances of getting more projects?</h3>
                <span className="itc-faq-icon">{activeFaq === 4 ? <X /> : <ChevronRight />}</span>
              </div>
              <div className="itc-faq-answer">
                <p>
                  Maintain a high quality score by delivering excellent work, respond promptly to job offers, specialize
                  in high-demand fields, keep your availability calendar updated, complete your profile with portfolio
                  samples, and obtain positive reviews from clients.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="itc-cta">
        <div className="itc-cta-content animate">
          <h2>Ready to Start Your Journey?</h2>
          <p>Join thousands of language professionals who have found success with InterTransConnect</p>
          <div className="itc-cta-buttons">
            <button className="itc-btn-primary">Create Account</button>
            <button className="itc-btn-secondary">Contact Us</button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default InterTransConnect
