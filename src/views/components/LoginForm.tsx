import { FormikActions, FormikProps, validateYupSchema } from 'formik';
import { Button, Form, Input } from 'formik-semantic-ui';
import React from 'react';
import { Grid, GridColumn } from 'semantic-ui-react';
import * as Yup from 'yup';
import firebase from '../../client/Firebase';

interface FormValues {
  email: string;
  pass: string;
}

const initialValues: FormValues = {
  email: '',
  pass: '',
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  pass: Yup.string().required('Required'),
});

export interface Props {
  onLogin(): void;
  // handleSubmit(id: string, pass: string): void;
  // handleClose(): void;
  // isAuthenticated: boolean;
  // onLoginSuccess?(): void;
}

export const LoginForm: React.FC<Props> = props => {
  const { onLogin } = props;

  const handleSubmit = React.useCallback(
    async ({ email, pass }: FormValues, actions: FormikActions<FormValues>) => {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, pass);
        onLogin();
      } catch (error) {
        actions.setFieldError('pass', error.message);
      }
      actions.setSubmitting(false);
    },
    [onLogin],
  );

  return (
    <Form
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      validateOnChange={true}
    >
      <Input
        label="E-Mail"
        name="email"
        inputProps={{ type: 'email', placeholder: 'Input E-Mail' }}
      />
      <Input
        label="Password"
        name="pass"
        inputProps={{ type: 'password', placeholder: 'Input Password' }}
      />
      <Grid>
        <GridColumn textAlign="center">
          <Button.Submit>Login</Button.Submit>
        </GridColumn>
      </Grid>
    </Form>
  );
};
export default LoginForm;
