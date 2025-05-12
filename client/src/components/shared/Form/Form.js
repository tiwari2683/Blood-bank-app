import React, { useState } from "react";
import InputType from "./InputType";
import { Link } from "react-router-dom";
import { handleLogin, handleRegister } from "../../../services/authService";

const Form = ({ formType, submitBtn, formTitle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("donar");
  const [name, setName] = useState("");
  const [organisationName, setOrganisationName] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="w-full md:w-1/2 bg-gray-100">
        <img
          src="assets/images/banner1.jpg"
          alt="Form Background"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full md:w-1/2 p-6 flex items-center justify-center">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (formType === "login") {
              handleLogin(e, email, password, role);
            } else if (formType === "register") {
              handleRegister(
                e,
                name,
                role,
                email,
                password,
                phone,
                organisationName,
                address,
                hospitalName,
                website
              );
            }
          }}
          className="w-full max-w-md"
        >
          <h1 className="text-2xl font-bold text-center mb-6">{formTitle}</h1>
          <hr className="border-t border-gray-300 mb-6" />

          {/* Role Selection */}
          <div className="mb-6">
            {["donar", "admin", "hospital", "organisation"].map((r) => (
              <div key={r} className="flex items-center mb-2">
                <input
                  type="radio"
                  name="role"
                  id={`${r}Radio`}
                  value={r}
                  onChange={(e) => setRole(e.target.value)}
                  defaultChecked={r === "donar"}
                  className="mr-2"
                />
                <label htmlFor={`${r}Radio`} className="text-gray-700">
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </label>
              </div>
            ))}
          </div>

          {/* Input Fields */}
          <div className="space-y-4">
            {/* Show these fields ONLY for Registration */}
            {formType === "register" && (
              <>
                {/* Name Field (For Donar & Admin) */}
                {(role === "admin" || role === "donar") && (
                  <InputType
                    labelText="Name"
                    labelFor="forName"
                    inputType="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                )}

                {/* Organisation Name Field */}
                {role === "organisation" && (
                  <InputType
                    labelText="Organisation Name"
                    labelFor="forOrganisationName"
                    inputType="text"
                    name="organisationName"
                    value={organisationName}
                    onChange={(e) => setOrganisationName(e.target.value)}
                  />
                )}

                {/* Hospital Name Field */}
                {role === "hospital" && (
                  <InputType
                    labelText="Hospital Name"
                    labelFor="forHospitalName"
                    inputType="text"
                    name="hospitalName"
                    value={hospitalName}
                    onChange={(e) => setHospitalName(e.target.value)}
                  />
                )}

                {/* Phone Field */}
                <InputType
                  labelText="Phone"
                  labelFor="forPhone"
                  inputType="text"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />

                {/* Address Field */}
                <InputType
                  labelText="Address"
                  labelFor="forAddress"
                  inputType="text"
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />

                {/* Website (Only for Hospital & Organisation) */}
                {(role === "hospital" || role === "organisation") && (
                  <InputType
                    labelText="Website"
                    labelFor="forWebsite"
                    inputType="text"
                    name="website"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                )}
              </>
            )}

            {/* Always Show Email & Password for Both Login & Registration */}
            <InputType
              labelText="Email"
              labelFor="forEmail"
              inputType="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <InputType
              labelText="Password"
              labelFor="forPassword"
              inputType="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Form Footer */}
          <div className="mt-6 text-center">
            {formType === "login" ? (
              <p className="text-gray-600">
                Not registered yet?{" "}
                <Link to="/register" className="text-red-600 hover:underline">
                  Register Here!
                </Link>
              </p>
            ) : (
              <p className="text-gray-600">
                Already a user?{" "}
                <Link to="/login" className="text-red-600 hover:underline">
                  Login Here!
                </Link>
              </p>
            )}
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-2 px-4 rounded-md mt-4 hover:bg-red-700 transition-colors"
            >
              {submitBtn}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;