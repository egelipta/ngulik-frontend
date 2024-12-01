import React from 'react';
import { ProFormText, ProFormTextArea } from '@ant-design/pro-form';

interface IProps {
    config: any;
    handleChange: (field: string, value: any, index?: number) => void;
}

const FormTexts: React.FC<IProps> = ({ config, handleChange }) => {
    return (
        <>
            <ProFormText
                label="Name"
                name="name"
                initialValue={config.name}
                fieldProps={{
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleChange('name', e.target.value),
                }}
            />
            <ProFormTextArea
                width="xl"
                label="Texts"
                name="texts"
                initialValue={config.texts}
                fieldProps={{
                    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => handleChange('texts', e.target.value),
                }}
            />
        </>
    );
};

export default FormTexts;
