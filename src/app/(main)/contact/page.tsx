"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  return (
    <div className="font-sans text-gray-800">
      {/* Top Header Section */}
      <div className="justify-center bg-gradient-to-r from-white to-primary h-48 flex items-center px-10 sm:h-64 lg:h-96 relative">
        <div className="w-full h-full flex items-center justify-center">
          <h1 className=" text-xl sm:text-4xl lg:text-5xl font-semibold tracking-wider uppercase">
            Contact Us
          </h1>
        </div>
      </div>

      {/* Contact Section */}
      <div className="flex justify-between px-[10%] py-16 gap-12 flex-wrap">
        {/* Contact Info */}
        <div className="flex-1 min-w-[300px]">
          <h2 className="text-2xl text-secondary mb-3 font-semibold">
            Let's talk with us
          </h2>
          <p className="text-gray-600 mb-5">
            Questions, comments, or suggestions? Simply fill in the form and
            we'll be in touch shortly.
          </p>
          <ul className="list-none p-0 text-gray-700">
            <li className="mb-3 text-base flex items-start">
              <span className="mr-2">📍</span>
              <strong>
                1055 Arthur ave Elk Groot, 67. <br /> New Palmas South Carolina.
              </strong>
            </li>
            <li className="mb-3 text-base flex items-center">
              <span className="mr-2">📞</span>
              +1 234 678 9108 99
            </li>
            <li className="mb-3 text-base flex items-center">
              <span className="mr-2">✉️</span>
              Contact@moralizer.com
            </li>
          </ul>
        </div>

        {/* Contact Form */}
        <div className="flex-1 min-w-[300px] bg-white p-8 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex gap-3">
              <input
                type="text"
                name="firstName"
                placeholder="First Name*"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name*"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email*"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number*"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <textarea
              name="message"
              placeholder="Your message..."
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <Button type="submit">Send Message</Button>
          </form>
        </div>
      </div>
      <div className="p-6 sm:p-8 lg:p-10 grid grid-cols-1 max-w-7xl mx-auto lg:grid-cols-2 gap-8 items-center">
        <div className="p-10 rounded-lg bg-primary/10">
          <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-4">
            Are You Looking <br />
            for Loft Manager?
          </h3>
          <p className="text-gray-600 mb-6 text-sm sm:text-base max-w-sm">
            We are committed to providing our customers with exceptional
            service.
          </p>
          <Button className="mt-8">Get Started</Button>
        </div>
        <div className="p-10 rounded-lg bg-pink-100">
          <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-4">
            Best Place for <br />
            Pigeon Race
          </h3>
          <p className="text-gray-600 mb-6 text-sm sm:text-base max-w-sm">
            We are committed to providing our customers with exceptional
            service.
          </p>
          <Button className="mt-8">Get Started</Button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
