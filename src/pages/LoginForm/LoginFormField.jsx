import React, { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

const LoginFormFields = ({ formData, errors, handleChange, handleSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <Form onSubmit={handleSubmit}>
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
      </div>

      <div className="forgot-password">
        <a href="/forgot-password">Forgot Password?</a>
      </div>

      <Button type="submit" className="login-btn">
        Sign In
      </Button>
    </Form>
  );
};

export default LoginFormFields;
