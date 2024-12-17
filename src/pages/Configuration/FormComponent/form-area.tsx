import React from 'react';
import { ProFormText, ProFormSelect } from '@ant-design/pro-form';
import { dataLine } from '../Datas/data';

interface IProps {
    config: any;
    handleChange: (field: string, value: any, index?: number) => void;
}

const FormArea: React.FC<IProps> = ({ config, handleChange }) => {
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
                options={dataLine.map((dl) => ({
                    value: dl.id,
                    label: dl.name,
                }))}
                onChange={(value) => {
                    const valDevice = dataLine.find((dl) => dl.id === value);
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

export default FormArea;
