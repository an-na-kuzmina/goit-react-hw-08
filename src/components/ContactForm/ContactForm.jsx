import s from './ContactForm.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contacts/operations';

const ContactForm = () => {
  const dispatch = useDispatch();
  const initialValues = {
    name: '',
    number: '',
  };

  const handleSubmit = (values, actions) => {
    dispatch(
      addContact({
        ...values,
      })
    );
    toast.success('New contact is added!');
    actions.resetForm();
  };

  const nameReg = /^[a-zA-Z\s]+$/;
  const numberReg = /^[0-9.-]*$/;

  const contactFormSchema = Yup.object().shape({
    name: Yup.string()
      .matches(nameReg, 'Invalid name')
      .min(3, 'Name is too short!')
      .max(50, 'Name should be max 50 symbols')
      .required('Name is required'),
    number: Yup.string()
      .matches(numberReg, 'Number is invalid')
      .min(3, 'Number is too short!')
      .max(50, 'Number should be max 50 symbols')
      .required('Number is required'),
  });

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={contactFormSchema}
      >
        <Form className={s.formWrap}>
          <label className={s.label}>
            <span>Name</span>
            <Field type="text" name="name" className={s.input}></Field>
            <ErrorMessage name="name" component="span" className={s.error} />
          </label>
          <label className={s.label}>
            <span>Number</span>
            <Field type="text" name="number" className={s.input}></Field>
            <ErrorMessage name="number" component="span" className={s.error} />
          </label>

          <button type="submit" className={s.button}>
            Add contact
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default ContactForm;
