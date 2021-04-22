import {SubmitHandler, useForm} from "react-hook-form";
import {Alert, Button, Form, Spinner} from "react-bootstrap";
import React from "react";
import FormLoader from "../loaders/FormLoader";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {fetchUserAsync, saveUserAsync} from "../../features/users/usersSlice";
import {fetchModelAsync, saveModelAsync, selectDataForm} from "../../features/data-form/dataFormSlice";
import {User} from "../../models/User";
import {Redirect} from "react-router-dom";

export interface DataFormFieldValidation {
    required?: boolean
}

export interface DataFormField {
    label: string,
    name: string,
    type: string,
    placeholder?: string,
    validation: DataFormFieldValidation,
    mutedText?: string,
    errorString?: string,
    additionalProps?: any // for things like min, etc on an input
}

export interface DataFormSubmitButtonText {
    idle: string,
    saving: string
}

export interface DataFormProps {
    fields: DataFormField[],
    onSubmitted?: Function,
    submitButtonText?: DataFormSubmitButtonText,
    id?: string,
    endpoint: string,
    errorMessage: string
}

export const FIELD_RENDERERS: any = {
    input: ({
                label,
                name,
                type,
                placeholder,
                validation,
                mutedText,
                errorString,
                additionalProps = {}
            }: DataFormField, register: Function, errors: any) => {
        return (
            <Form.Group controlId={name} key={name}>
                <Form.Label>{label}</Form.Label>
                <Form.Control type={type}
                              placeholder={placeholder ? placeholder : label}
                              isInvalid={!!errors[name]}
                              {...register(name, validation)}
                              {...additionalProps}
                />
                {
                    errors[name] && errorString &&
                    <Form.Text className="text-danger">
                        {errorString}
                    </Form.Text>
                }
                {
                    mutedText && (
                        <Form.Text className="text-muted">
                            {mutedText}
                        </Form.Text>
                    )
                }
            </Form.Group>
        )
    },
};

const renderField = (field: DataFormField, register: Function, errors: any) => {
    // Add different field types to the rendererTypes below to display fields like dropdowns and such.
    const rendererTypes: any = {
        'text': 'input',
        'password': 'input',
        'email': 'input',
    }

    if (!rendererTypes.hasOwnProperty(field.type)) {
        throw new Error(`Field type ${field.type} is not defined in field renderers.`);
    }

    return FIELD_RENDERERS[rendererTypes[field.type]](field, register, errors);
}

const DataForm: React.FC<DataFormProps> = ({
                                               fields,
                                               onSubmitted,
                                               submitButtonText,
                                               id,
                                               endpoint,
                                               errorMessage
                                           }) => {
    const dispatch = useAppDispatch();
    const dataFormState = useAppSelector(selectDataForm);
    const {register, handleSubmit, formState: {errors}, setValue} = useForm();

    React.useEffect(() => {
        const isNewUser = id === 'create';
        if (!isNewUser && id) {
            dispatch(fetchModelAsync({endpoint, id}))
        }
    }, [dispatch, endpoint, id]);

    React.useEffect(() => {
        if (dataFormState.currentModel) {
            fields.forEach((field) => {
                const fieldName: any = field.name;
                // @ts-ignore
                const fieldValue: any = dataFormState.currentModel[field.name]
                setValue(fieldName, fieldValue);
            })
        }
    }, [dataFormState.currentModel, fields, setValue])

    const getLoadingText = () => {
        return submitButtonText?.saving || 'Loading...';
    }

    if (dataFormState.loading) {
        return (
            <FormLoader/>
        )
    }

    const formSubmitted = (values: any) => {
        console.log('vals', values);
        dispatch(saveModelAsync({endpoint, model: {...dataFormState.currentModel, ...values}}));
    }

    if (dataFormState.modelSaved && onSubmitted) {
        onSubmitted();
    }

    return (
        <>
            <Form onSubmit={handleSubmit(formSubmitted)}>
                {
                    fields.map(field => renderField(field, register, errors))
                }
                <Button variant="primary" type="submit" disabled={dataFormState.saving}>
                    {
                        dataFormState.saving && (
                            <Spinner animation="border" role="status" size="sm" className={"mr-1"}>
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                        )
                    }
                    {
                        dataFormState.saving ? getLoadingText() : 'Submit'
                    }
                </Button>
            </Form>
            {dataFormState.error && (
                <Alert variant="danger" className="mt-3">
                    {errorMessage}
                </Alert>
            )}
        </>
    );
}

export default DataForm;