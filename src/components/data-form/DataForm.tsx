import {SubmitHandler, useForm} from "react-hook-form";
import {Button, Form, Spinner} from "react-bootstrap";
import React from "react";
import FormLoader from "../loaders/FormLoader";

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
    onSubmit: SubmitHandler<any>,
    submitButtonText?: DataFormSubmitButtonText,
    saving?: boolean,
    loading?: boolean,
    initialData?: any
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

const DataForm: React.FC<DataFormProps> = ({fields, onSubmit, submitButtonText, loading, saving, initialData}) => {
    const {register, handleSubmit, formState: {errors}, setValue} = useForm();

    React.useEffect(() => {
        if (initialData) {
            Object.keys(initialData).forEach((key: any) => {
                setValue(key, initialData[key]);
            });
        }
    }, [initialData, setValue])

    const getLoadingText = () => {
        return submitButtonText?.saving || 'Loading...';
    }

    if (loading) {
        return (
            <FormLoader />
        )
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            {
                fields.map(field => renderField(field, register, errors))
            }
            <Button variant="primary" type="submit" disabled={saving}>
                {
                    saving && (
                        <Spinner animation="border" role="status" size="sm" className={"mr-1"}>
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    )
                }
                {
                    saving ? getLoadingText() : 'Submit'
                }
            </Button>
        </Form>
    );
}

export default DataForm;