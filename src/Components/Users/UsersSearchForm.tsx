import { Formik, Form, Field } from 'formik';
import { FC, memo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { FilterType } from '../../Redux/users-reducer';
import { getUsersFilter } from '../../Redux/selectors/users-selectors';
import styles from './UsersSearchForm.module.css';
import { SearchOutlined } from '@ant-design/icons'

const usersSearchFormValidate = (values: any) => {
    const errors = {};
    return errors;
}

type UserSearchFormPropsType = {
    onFilterChanged: (filter: FilterType) => void
}

type FormType = {
    term: string,
    friend: "true" | "false" | "null"
}

export const UsersSearchForm: FC<UserSearchFormPropsType> = memo((props) => {

    const filter = useSelector(getUsersFilter);

    const submit = (values: FormType, { setSubmitting }:
        { setSubmitting: (isSubmitting: boolean) => void }) => {
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
                enableReinitialize
                initialValues={{
                    term: filter.term, friend: String(filter.friend) as
                        "true" | "false" | "null"
                }}
                validate={usersSearchFormValidate}
                onSubmit={submit}
            >
                {({ isSubmitting, values }) => (
                    <Form>
                        <Field class={styles.searchUsers} placeholder="input here"
                            type="text" name="term" />
                        <button className={styles.searchButton} type="submit"
                            disabled={isSubmitting || (values.term === filter.term && values.friend === String(filter.friend))}>
                            <SearchOutlined />
                        </button>
                        {/* <Field name="friend" as="select">
                            <option value="null">All</option>
                            <option value="true">Only followed</option>
                            <option value="false">Only unfollowed</option>
                        </Field> */}

                        <div className={styles.filterGroup}>
                            <h3 id="my-radio-group">Фильтр пользователей</h3>
                            <div role="group" aria-labelledby="my-radio-group">
                                <label className={styles.filterUsersItem}>
                                    <Field type="radio" name="friend" value="null" class={styles.filterRadioBtn} />
                                    All
                                </label>
                                <label className={styles.filterUsersItem}>
                                    <Field type="radio" name="friend" value="true" class={styles.filterRadioBtn} />
                                    Only followed
                                </label>
                                <label className={styles.filterUsersItem}>
                                    <Field type="radio" name="friend" value="false" class={styles.filterRadioBtn} />
                                    Only unfollowed
                                </label>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
})
