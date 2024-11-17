import ContactForm from '../components/ContactForm/ContactForm';
import ContactList from '../components/ContactList/ContactList';
import SearchBox from '../components/SearchBox/SearchBox';
import Loader from '../components/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { selectError, selectLoading } from '../redux/contacts/selectors';
import { fetchContacts } from '../redux/contacts/operations';

const ContactsPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);
  const errorMessage = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  return (
    <div className="appWrap">
      <h1 className="appTitle">Contacts book</h1>
      <ContactForm />
      <SearchBox />
      {isLoading && !errorMessage && <Loader />}
      <ContactList />
    </div>
  );
};

export default ContactsPage;
