import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const Card = () => {
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchContacts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'contacts'));
      const contactsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log('Fetched contacts:', contactsData); // Logging fetched data
      setContacts(contactsData);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Messages</h2>
      <input
        type="text"
        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Search by name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContacts.length > 0 ? (
          filteredContacts.map((contact) => (
            <div key={contact.id} className="p-6 bg-white shadow-md rounded-lg">
              <h3 className="text-xl font-bold mb-2">{contact.name}</h3>
              <p className="text-sm text-gray-600">{contact.email}</p>
              <p className="mt-2 text-gray-800">{contact.message}</p>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full">No messages found.</p>
        )}
      </div>
    </div>
  );
};

export default Card;
