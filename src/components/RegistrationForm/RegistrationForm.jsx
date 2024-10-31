import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import s from './RegistrationForm.module.css';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operations';
import toast from 'react-hot-toast';

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  const handleSubmit = (values, actions) => {
    dispatch(register(values))
      .unwrap()
      .then(res => {
        toast(`Welcome, ${res.user.name}!`);
      })
      .catch(() => {
        toast.error('Email already exists');
      });
    actions.resetForm();
  };

  const nameRegex = /^[A-Za-z\s]+$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const registerFormSchema = Yup.object().shape({
    name: Yup.string()
      .matches(nameRegex, 'Invalid name')
      .min(3, 'Name is too short!')
      .max(50, 'Name should contain max 50 symbols')
      .required('Name is required'),
    email: Yup.string()
      .matches(emailRegex, 'Invalid email')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must contain at least 8 characters')
      .matches(
        /[a-z]/,
        'The password must contain at least 1 letter in lowercase'
      )
      .matches(
        /[A-Z]/,
        'The password must contain at leats 1 letter in uppercase'
      )
      .matches(/\d/, 'The password must contain at least 1 number')
      .required('Password is required'),
  });

  return (
    <div className={s.wrapp}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={registerFormSchema}
      >
        <Form className={s.form}>
          <h2>Registration Form</h2>
          <p>You need to register and then to work with contacts</p>

          <label className={s.label}>
            <span>Name</span>
            <Field
              type="text"
              name="name"
              className={s.input}
              placeholder="Enter name"
            ></Field>
            <ErrorMessage name="name" component="span" className={s.error} />
          </label>
          <label className={s.label}>
            <span>Email</span>
            <Field
              type="email"
              name="email"
              className={s.input}
              placeholder="Enter email"
            ></Field>
            <ErrorMessage name="email" component="span" className={s.error} />
          </label>
          <label className={s.label}>
            <span>Password</span>
            <Field
              type="password"
              name="password"
              className={s.input}
              placeholder="Enter password"
            ></Field>
            <ErrorMessage
              name="password"
              component="span"
              className={s.error}
            />
          </label>

          <button type="submit" className={s.button}>
            Register
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default RegistrationForm;
