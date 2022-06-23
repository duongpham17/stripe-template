import {useState, useEffect} from 'react';

export const useForm = (initalState: any, callback: CallableFunction, validation: any) => {

    const [values, setValues] = useState<typeof initalState>(initalState);

    const [errors, setErrors] = useState<{[key: string]: any}>({});

    const [loading, setLoading] = useState<boolean>(false);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({...values, [event.target.name] : event.target.value});
    };

    const onClear = () => {
        setValues(initalState);
    }

    useEffect(() => {
        return () => setLoading(false);
    }, [])

    const onSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();

        if(loading) return;

        const errors = validation(values);

        const noErrors = Object.keys(errors).length === 0;

        if(noErrors) {
            setLoading(true);
            await callback();
            setLoading(false);
        };

        setErrors(errors);
    };

    return {
        values,
        setValues,
        errors,
        onChange, 
        onSubmit,
        setLoading,
        loading,
        onClear
    }
}

export default useForm;