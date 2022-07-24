import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './Login.module.scss';
import { fetchRegister, selectIsAuth } from '../../redux/slices/auth';

export const Registration = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  const { 
    register, 
    handleSubmit, 
    setError,
    formState: { errors, isValid },
   } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));

    if (!data.payload) {
      return alert('Unable to authorize!');
    }
    if ('data' in data.payload) {
      window.localStorage.setItem('token', data.payload.data.token);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
          className={styles.field}
          label="Full Name"
          type="text"
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          {... register('fullName', {required: 'Enter full name'})}
          fullWidth
        />
        <TextField
          className={styles.field}
          label="E-Mail"
          type={"email"}
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {... register('email', {required: 'Enter email'})}
          fullWidth
        />
        <TextField
          className={styles.field}
          label="Password"
          type='password'
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {... register('password', {required: 'Enter password'})}
          fullWidth
        />
      <Button disabled={!isValid} type='submit' size="large" variant="contained" fullWidth>
        Register
      </Button>
      </form>
    </Paper>
  );
};
