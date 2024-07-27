import React, { useState } from "react";
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    try {
      await addDoc(collection(db, "contacts"), {
        name: name,
        email: email,
        message: message,
      });
      setLoader(false);
      alert("Your message has been submitted👍");
    } catch (error) {
      alert(error.message);
      setLoader(false);
    }

    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <form className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg mt-10" onSubmit={handleSubmit}>
      <h1 className="text-2xl font-bold mb-4 text-center">Contact Us 🤳</h1>

      <label className="block mb-2 text-sm font-medium text-gray-700">Name</label>
      <input
        className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
      <input
        className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label className="block mb-2 text-sm font-medium text-gray-700">Message</label>
      <textarea
        className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>

      <button
        type="submit"
        className={`w-full px-4 py-2 font-semibold text-white rounded-lg transition-colors duration-300 ${
          loader ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        Submit
      </button>
    </form>
  );
};

export default Contact;
