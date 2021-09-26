const fs = require('fs/promises');
const { v4 } = require('uuid');

const path = require('path');
const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async contactId => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(
    contact => contact.id.toString() === contactId,
  );
  if (idx === -1) {
    return null;
  }
  return contacts[idx];
};

const removeContact = async contactId => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(
    contact => contact.id.toString() === contactId,
  );
  if (idx === -1) {
    return null;
  }
  const delContact = contacts[idx];
  contacts.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return delContact;
};

const addContact = async body => {
  const contacts = await listContacts();
  const newContact = { id: v4(), ...body };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(
    contact => contact.id.toString() === contactId,
  );
  if (idx === -1) {
    return null;
  }
  contacts[idx] = { ...contacts[idx], ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts));

  return contacts[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
