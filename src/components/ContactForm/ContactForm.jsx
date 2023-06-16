import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/operations';
import { selectContacts } from 'redux/selectors';
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';
import css from './ContactForm.module.css';


export const ContactForm = () => {
  const dispatch = useDispatch(); 
  const contacts = useSelector(selectContacts);

  
  const handleInputChange = e => {
    e.preventDefault();
    const contact = {
      id: nanoid(),
      name: e.currentTarget.elements.name.value,
      number: e.currentTarget.elements.number.value,
    };

    const isExist = contacts.find(
      ({ name }) => name.toLowerCase() === contact.name.toLowerCase() 
    );

    if (isExist) {
      return toast.warn(`${contact.name} is already in contacts.`);
    }
    dispatch(addContact(contact)); 
    e.currentTarget.reset();
  };

      return (
      <>
        <form
          className={css.formstyle}
          onSubmit={handleInputChange}
        >
          <label className={css.label}>
            Name
            <br />
            <input
              className={css.input}
              onChange={handleInputChange} 
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
            />
          </label>
          <br />
          <label htmlFor={nanoid()}>
            Number
            <br />
            <input
              className={css.input}
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              id={nanoid()}
                required
            />
          </label>
          <br />
          <button className={css.button} type="submit">
            Add contact
          </button>
        </form>
      </>
    );
  }


