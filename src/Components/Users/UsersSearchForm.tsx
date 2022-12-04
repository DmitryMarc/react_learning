import { Formik, Form, Field } from 'formik';
import { FC, memo } from 'react';
import { FilterType } from '../../Redux/users-reducer';

const usersSearchFormValidate = (values: any) => {
    const errors = {};
    return errors;
}

type UserSearchFormPropsType = {
    onFilterChanged: (filter: FilterType) => void
}

type FormType = {
    term: string,
    friend: string // "true" | "false" | "null" - c этими значениями у меня не работала типизация
}

export const UsersSearchForm: FC<UserSearchFormPropsType> = memo((props) => {
    const submit = (values: FormType, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        // setTimeout(() => {
        //     alert(JSON.stringify(values, null, 2));
        //     setSubmitting(false);
        // }, 400);
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === "null" ? null : values.friend === "true" ? true : false
        }
        props.onFilterChanged(filter);
        setSubmitting(false);
    }
    return (
        <div>
            <Formik
                initialValues={{ term: '', friend: "null"}}
                validate={usersSearchFormValidate}
                onSubmit={submit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Field type="text" name="term" />
                        <Field name="friend" as="select">
                            <option value="null">All</option>
                            <option value="true">Only followed</option>
                            <option value="false">Only unfollowed</option>
                        </Field>
                        <button type="submit" disabled={isSubmitting}>
                            Find
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
})


