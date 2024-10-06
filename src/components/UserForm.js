import React, { useState, useEffect } from "react";

function UserForm({
  isEditing,
  editingUser,
  onCreateUser,
  onUpdateUser,
  onCancel,
}) {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    username: "", // Removed random generation from here
    address: {
      street: "",
      city: "",
    },
    company: {
      name: "",
    },
    website: "",
  });

  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    if (isEditing && editingUser) {
      // Set the form data for editing
      setUser({
        ...editingUser,
      });
    } else {
      // Clear form for new user
      resetForm();
    }
  }, [isEditing, editingUser]);

  const resetForm = () => {
    setUser({
      name: "",
      email: "",
      phone: "",
      username: `USER-${Math.random().toString(36).substring(2, 5)}`, // Generate here
      address: {
        street: "",
        city: "",
      },
      company: {
        name: "",
      },
      website: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("address.") || name.includes("company.")) {
      const [section, field] = name.split(".");
      setUser((prevUser) => ({
        ...prevUser,
        [section]: {
          ...prevUser[section],
          [field]: value,
        },
      }));
    } else {
      setUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    }

    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!user.name || user.name.length < 3)
      errors.name = "Name is required and must be at least 3 characters.";
    if (!user.email || !/\S+@\S+\.\S+/.test(user.email))
      errors.email = "A valid email is required.";
    if (!user.phone || !/^\d{10}$/.test(user.phone))
      errors.phone = "Phone number must be exactly 10 digits.";
    if (!user.username || user.username.length < 3)
      errors.username =
        "Username is required and must be at least 3 characters.";
    if (!user.address.street) errors.street = "Street is required.";
    if (!user.address.city) errors.city = "City is required.";
    if (user.company.name && user.company.name.length < 3)
      errors.companyName =
        "If provided, company name must be at least 3 characters.";
    if (user.website && !/^https?:\/\/.+/.test(user.website))
      errors.website = "Website must be a valid URL.";

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length) {
      setValidationErrors(errors);
      return;
    }
    if (isEditing) {
      onUpdateUser(user); // Make sure the user data is correct
    } else {
      onCreateUser(user);
    }
    resetForm();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-8 max-w-lg mx-auto mt-10"
    >
      <h3 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
        {isEditing ? "Edit User" : "Create User"}
      </h3>

      <div className="mb-6">
        <label className="block text-gray-700 font-bold mb-2">Name:</label>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
          className={`w-full px-4 py-2 rounded-lg border focus:ring focus:ring-indigo-200 focus:outline-none ${
            validationErrors.name ? "border-red-500" : "border-gray-300"
          }`}
        />
        {validationErrors.name && (
          <p className="text-red-500 text-sm mt-1">{validationErrors.name}</p>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-bold mb-2">Email:</label>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          className={`w-full px-4 py-2 rounded-lg border focus:ring focus:ring-indigo-200 focus:outline-none ${
            validationErrors.email ? "border-red-500" : "border-gray-300"
          }`}
        />
        {validationErrors.email && (
          <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>
        )}
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 font-bold mb-2">Phone:</label>
        <input
          type="tel"
          name="phone"
          value={user.phone}
          onChange={handleChange}
          className={`w-full px-4 py-2 rounded-lg border focus:ring focus:ring-indigo-200 focus:outline-none ${
            validationErrors.phone ? "border-red-500" : "border-gray-300"
          }`}
        />
        {validationErrors.phone && (
          <p className="text-red-500 text-sm mt-1">{validationErrors.phone}</p>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-bold mb-2">Username:</label>
        <input
          type="text"
          name="username"
          value={user.username}
          readOnly
          className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-100 text-gray-500"
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 font-bold mb-2">Street:</label>
        <input
          type="text"
          name="address.street"
          value={user.address.street}
          onChange={handleChange}
          className={`w-full px-4 py-2 rounded-lg border focus:ring focus:ring-indigo-200 focus:outline-none ${
            validationErrors.street ? "border-red-500" : "border-gray-300"
          }`}
        />
        {validationErrors.street && (
          <p className="text-red-500 text-sm mt-1">{validationErrors.street}</p>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-bold mb-2">City:</label>
        <input
          type="text"
          name="address.city"
          value={user.address.city}
          onChange={handleChange}
          className={`w-full px-4 py-2 rounded-lg border focus:ring focus:ring-indigo-200 focus:outline-none ${
            validationErrors.city ? "border-red-500" : "border-gray-300"
          }`}
        />
        {validationErrors.city && (
          <p className="text-red-500 text-sm mt-1">{validationErrors.city}</p>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-bold mb-2">
          Company Name:
        </label>
        <input
          type="text"
          name="company.name"
          value={user.company.name}
          onChange={handleChange}
          className={`w-full px-4 py-2 rounded-lg border focus:ring focus:ring-indigo-200 focus:outline-none ${
            validationErrors.companyName ? "border-red-500" : "border-gray-300"
          }`}
        />
        {validationErrors.companyName && (
          <p className="text-red-500 text-sm mt-1">
            {validationErrors.companyName}
          </p>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-bold mb-2">Website:</label>
        <input
          type="url"
          name="website"
          value={user.website}
          onChange={handleChange}
          className={`w-full px-4 py-2 rounded-lg border focus:ring focus:ring-indigo-200 focus:outline-none ${
            validationErrors.website ? "border-red-500" : "border-gray-300"
          }`}
        />
        {validationErrors.website && (
          <p className="text-red-500 text-sm mt-1">{validationErrors.website}</p>
        )}
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {isEditing ? "Update User" : "Create User"}
        </button>
      </div>
    </form>
  );
}

export default UserForm;