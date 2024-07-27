import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, addDoc } from "firebase/firestore"; // Ensure addDoc is imported

const Contact = () => {
  const [contacts, setContacts] = useState([]);
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
      fetchContacts(); // Refresh the contacts after a new one is added
    } catch (error) {
      alert(error.message);
      setLoader(false);
    }

    setName("");
    setEmail("");
    setMessage("");
  };

  const fetchContacts = async () => {
    const querySnapshot = await getDocs(collection(db, "contacts"));
    const contactsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setContacts(contactsData);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <form
        className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg mt-10"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Contact Us 🤳</h1>

        <label className="block mb-2 text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="block mb-2 text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="block mb-2 text-sm font-medium text-gray-700">
          Message
        </label>
        <textarea
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>

        <button
          type="submit"
          className={`w-full px-4 py-2 font-semibold text-white rounded-lg transition-colors duration-300 ${
            loader
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          Submit
        </button>
      </form>

      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Messages</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contacts.map((contact) => (
            <div key={contact.id} className="p-6 bg-white shadow-md rounded-lg">
              <h3 className="text-xl font-bold mb-2">{contact.name}</h3>
              <p className="text-sm text-gray-600">{contact.email}</p>
              <p className="mt-2 text-gray-800">{contact.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
