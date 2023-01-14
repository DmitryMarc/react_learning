import React, { FC } from "react";
import { Field, WrappedFieldMetaProps, WrappedFieldProps } from "redux-form";
import { FieldValidatorType } from "../../../utils/validators/validators";
import styles from "./FormsControls.module.css";

type FormControlPropsType = {
    meta: WrappedFieldMetaProps,
    children: React.ReactNode
}

export const FormControl: FC<FormControlPropsType> = ({ meta: { touched, error }, children }) => {
    const hasError = touched && error;
    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )
}

export const Textarea: FC<WrappedFieldProps> = (props) => {
    const { input, meta, ...restProps } = props;
    return (
        <FormControl {...props}>
            <textarea className={styles.textarea} {...input} {...restProps} />
        </FormControl>
    )
}

export const Input: FC<WrappedFieldProps> = (props) => {
    const { input, meta, ...restProps } = props;
    return (
        <FormControl {...props}>
            <input className={styles.input} {...input} {...restProps} />
        </FormControl>
    )
}

export function createField<FormKeysType extends string>(
    placeholder: string | undefined,
    name: FormKeysType,
    validators: Array<FieldValidatorType>,
    component: FC<WrappedFieldProps>,
    props = {}, text = "") {
    return (
        <div>
            <Field placeholder={placeholder} validate={validators}
                name={name} component={component} {...props} /> {text}
        </div>
    )
}

export type GetStringKeysType<T> = Extract<keyof T, string>;