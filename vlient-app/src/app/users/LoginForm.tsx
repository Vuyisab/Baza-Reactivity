import { ErrorMessage, Form, Formik } from "formik";
import MyTextInput from "../common/form/MyTextInput";
import { Button, Header, Label } from "semantic-ui-react";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

const LoginForm = () => {
  const { userStore } = useStore();
  return (
    <Formik
      initialValues={{ email: "", password: "", erro: null }}
      onSubmit={(values, { setErrors }) =>
        userStore
          .login(values)
          .catch((error) => setErrors({ erro: "Imvalid email or password" }))
      }
    >
      {({ handleSubmit, isSubmitting, errors }) => (
        <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
          <Header
            as="h2"
            content="Login to Reactivities"
            color="teal"
            textAlign="center"
          />
          <MyTextInput placeholder="Email" name="email" />
          <MyTextInput placeholder="Password" name="password" type="password" />
          <ErrorMessage
            name="erro"
            render={() => (
              <Label
                style={{ marginBottom: 10 }}
                basic
                color="red"
                content={errors.erro}
              />
            )}
          />
          <Button
            positive
            content="Login"
            type="submit"
            loading={isSubmitting}
            fluid
          />
        </Form>
      )}
    </Formik>
  );
};

export default observer(LoginForm);
