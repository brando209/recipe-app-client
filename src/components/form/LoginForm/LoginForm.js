import { Formik, Field, Form } from 'formik';
import { Button } from 'react-bootstrap';
import * as Inputs from '../../input';

function LoginForm({ onSubmit, ...props }) {
    return (
        <Formik
            initialValues={{ userName: "", password: "" }}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                onSubmit(values, () => setSubmitting(false));
            }}
        >
            {({ isSubmitting }) => (
                <Form>
                    <Inputs.InputContainer name="userName" label="Username">
                        <Field name="userName" type="input" placeholder="Enter your username" />
                    </Inputs.InputContainer>

                    <Inputs.InputContainer name="password" label="Password">
                        <Field name="password" type="password" placeholder="Enter your password" autoComplete="off"/>
                    </Inputs.InputContainer>

                    {props.error && <div className="form-error">{props.error}</div>}

                    <Button type="submit" variant="secondary" disabled={isSubmitting}>
                        Submit
                    </Button>
                </Form>
            )}
        </Formik>
    )
}

export default LoginForm;