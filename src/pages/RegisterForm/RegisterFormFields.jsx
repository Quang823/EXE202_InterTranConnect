import React, { useState } from "react";
import { Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import {
  MdEmail,
  MdPerson,
  MdPhone,
  MdLocationOn,
  MdDarkMode,
  MdLightMode,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";

const RegisterFormFields = ({
  formData,
  errors,
  handleChange,
  handleSubmit,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="form-row">
        <Col md={6} className="form-col">
          <Form.Control
            type="text"
            placeholder="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            isInvalid={!!errors.firstName}
          />
          {errors.firstName && (
            <div className="invalid-feedback">{errors.firstName}</div>
          )}
        </Col>
        <Col md={6} className="form-col">
          <Form.Control
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            isInvalid={!!errors.lastName}
          />
          {errors.lastName && (
            <div className="invalid-feedback">{errors.lastName}</div>
          )}
        </Col>
      </Row>

      <div className="form-input">
        <Form.Control
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          isInvalid={!!errors.email}
        />
        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
      </div>

      <div className="form-input">
        <Form.Control
          type="text"
          placeholder="Phone Number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
          isInvalid={!!errors.phoneNumber}
        />
        {errors.phoneNumber && (
          <div className="invalid-feedback">{errors.phoneNumber}</div>
        )}
      </div>

      <Row className="form-row">
        <Col md={6} className="form-col">
          <InputGroup className="position-relative">
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              isInvalid={!!errors.password}
              className="password-input"
            />
            <span
              className="password-toggle-icon"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
            </span>
          </InputGroup>
          {errors.password && (
            <div className="invalid-feedback">{errors.password}</div>
          )}
        </Col>
        <Col md={6} className="form-col">
          <InputGroup className="position-relative">
            <Form.Control
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              isInvalid={!!errors.confirmPassword}
              className="password-input"
            />
            <span
              className="password-toggle-icon"
              onClick={toggleConfirmPasswordVisibility}
            >
              {showConfirmPassword ? <MdVisibilityOff /> : <MdVisibility />}
            </span>
          </InputGroup>
          {errors.confirmPassword && (
            <div className="invalid-feedback">{errors.confirmPassword}</div>
          )}
        </Col>
      </Row>

      <div className="form-input">
        <Form.Control
          as="select"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
          isInvalid={!!errors.gender}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </Form.Control>
        {errors.gender && (
          <div className="invalid-feedback">{errors.gender}</div>
        )}
      </div>

      <div className="form-input">
        <Form.Control
          type="text"
          placeholder="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          isInvalid={!!errors.address}
        />
        {errors.address && (
          <div className="invalid-feedback">{errors.address}</div>
        )}
      </div>

      <div className="form-check-custom">
        <Form.Check
          type="checkbox"
          label={
            <span>
              I agree to the{" "}
              <a href="/terms" target="_blank">
                terms & conditions
              </a>
            </span>
          }
          name="agree"
          checked={formData.agree}
          onChange={handleChange}
          required
          isInvalid={!!errors.agree}
        />
        {errors.agree && <div className="invalid-feedback">{errors.agree}</div>}
      </div>

      <Button type="submit" className="register-btn">
        Register
      </Button>
    </Form>
  );
};

export default RegisterFormFields;
