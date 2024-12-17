import React from 'react';
import { ProFormText, ProFormSelect } from '@ant-design/pro-form';
import { dataMultiLine } from '../Datas/data';

interface IProps {
    config: any;
    handleChange: (field: string, value: any, index?: number) => void;
}

const FormRadar: React.FC<IProps> = ({ config, handleChange }) => {
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
        </>
    );
};

export default FormRadar;
