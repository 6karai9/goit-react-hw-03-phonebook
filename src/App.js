import { Component } from 'react';
import './App.css';
import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactList/ContactList';
import Filter from './components/Filter/Filter';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  addContact = obj => {
    const { contacts } = this.state;
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === obj.name.toLowerCase(),
      )
    ) {
      return alert('This contact has already been added to the list');
    }

    this.setState(({ contacts }) => ({
      contacts: [obj, ...contacts],
    }));
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getFilteredContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const filteredContacts = this.getFilteredContacts();
    return (
      <div className="App mainWrap">
        <h1>Phonebook</h1>
        <ContactForm addContact={this.addContact}></ContactForm>
        <h2>Contacts</h2>
        <Filter
          id={this.state.id}
          value={this.state.filter}
          onChange={this.changeFilter}
        />
        <ContactList
          filteredContacts={filteredContacts}
          onDelete={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;
