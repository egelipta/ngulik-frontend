import React from 'react';
import { ProFormText, ProFormSelect } from '@ant-design/pro-form';
import { dataLine } from '../datas';

interface IProps {
    config: any;
    handleChange: (field: string, value: any, index?: number) => void;
}

const FormLine: React.FC<IProps> = ({ config, handleChange }) => {
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
            <ProFormSelect
                showSearch
                width="sm"
                name="devid"
                label="Device"
                placeholder="Choose the best!"
                options={dataLine.map((device) => ({
                    value: device.id,
                    label: device.name,
                }))}
                onChange={(value) => {
                    const selectedDevice = dataLine.find((device) => device.id === value);
                    if (selectedDevice) {
                        handleChange('data', selectedDevice.value);
                        console.log(selectedDevice.value)
                    }
                }}
            />
        </>
    );
};

export default FormLine;
