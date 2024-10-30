import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import s from './LoginForm.module.css';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/auth/operations';
import toast from 'react-hot-toast';

const LoginForm = () => {
  const dispatch = useDispatch();
  const initialValues = {
    email: '',
    password: '',
  };

  const handleSubmit = (values, options) => {
    dispatch(login(values))
      .unwrap()
      .then(res => {
        toast(`Welcome, ${res.user.name}!`);
      })
      .catch(() => {
        toast.error('invalid credentials');
      });
    options.resetForm();
  };

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const loginFormSchema = Yup.object().shape({
    email: Yup.string()
      .matches(emailRegex, 'Invalid email')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password is too short!')
      .max(50, 'Password should contain max 50 symbols')
      .required('Password is required'),
  });
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={loginFormSchema}
    >
      <Form className={s.formWrapper}>
        <label className={s.label}>
          <span>Email</span>
          <Field type="email" name="email" className={s.input}></Field>
          <ErrorMessage name="email" component="span" className={s.error} />
        </label>
        <label className={s.label}>
          <span>Password</span>
          <Field type="password" name="password" className={s.input}></Field>
          <ErrorMessage name="password" component="span" className={s.error} />
        </label>

        <button type="submit" className={s.button}>
          Log in
        </button>
      </Form>
    </Formik>
  );
};

export default LoginForm;
