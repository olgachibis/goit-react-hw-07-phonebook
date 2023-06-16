import { useDispatch, useSelector } from 'react-redux'; 
import { useEffect } from 'react';
import { ImPhone } from 'react-icons/im';
import {
  selectError,
  selectFilteredContacts,
  selectIsLoading,
} from 'redux/selectors';
import { fetchContacts, deleteContact } from 'redux/operations'; 
import css from './ContactList.module.css'; 


export const ContactList = () => {
 const filteredContacts = useSelector(selectFilteredContacts); 
  const isLoading = useSelector(selectIsLoading); 
  const error = useSelector(selectError); 
  const dispatch = useDispatch(); 

  useEffect(() => {
    dispatch(fetchContacts()); 
  }, [dispatch]);

   const onDeleteContact = id => {
    dispatch(deleteContact(id)); 
  };

  return (
    <>
      {isLoading && <b>Loading contacts...</b>}
      {!filteredContacts?.length && !error && !isLoading && (
        <b>No contacts found.</b>
      )}
      {error && <b>{error}</b>}
    <ul className={css.list}>
        {filteredContacts.map(({ id, name, number })  => 
        (<li className={css.item} key={id}>
          <ImPhone size={20} />
            <span>{name}:</span>
            <span className={css.number}>{number}</span>
            <button
              className={css.button}
              type="button"
                onClick={() => onDeleteContact(id)}>
              Delete
            </button>
          </li>
         ))}
      </ul>
      </>
  );
};


