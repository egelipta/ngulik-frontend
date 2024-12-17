import React from 'react';
import { ProFormText, ProFormSelect } from '@ant-design/pro-form';
import { dataMultiLine } from '../Datas/data';

interface IProps {
    config: any;
    handleChange: (field: string, value: any, index?: number) => void;
}

const FormMultiLine: React.FC<IProps> = ({ config, handleChange }) => {
    return (
        <>
            <ProFormText
                label="Name"
                name="name"
                initialValue={config.name}
                fieldProps={{
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleChange('name', e.target.value),
                }}
                rules={[{ required: true, message: 'Cannot be empty!' }]}
            />
            <ProFormSelect
                showSearch
                width="sm"
                name="devid"
                label="Device"
                placeholder="Choose the best!"
                initialValue={config.devid}
                options={dataMultiLine.map((dml) => ({
                    value: dml.id,
                    label: dml.name,
                }))}
                onChange={(value) => {
                    const valDevice = dataMultiLine.find((dml) => dml.id === value);
                    if (valDevice) {
                        handleChange('data', valDevice.value);
                        console.log(valDevice.value)
                    }
                }}
                rules={[{ required: true, message: 'Cannot be empty!' }]}
            />
            <ProFormSelect
                showSearch
                width="sm"
                name="stepType"
                label="Type"
                placeholder="Select type"
                initialValue={config.stepType}
                options={[
                    { value: '', label: 'Default' },
                    { value: 'hvh', label: 'Step' }
                ]}
                onChange={(value) => handleChange('stepType', value)}
            // rules={[{ required: true, message: 'Cannot be empty!' }]}
            />
        </>
    );
};

export default FormMultiLine;
