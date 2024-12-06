import React from 'react';
import { ProFormText, ProFormSelect } from '@ant-design/pro-form';
import { dataPie } from '../Datas/data';

interface IProps {
    config: any;
    handleChange: (field: string, value: any, index?: number) => void;
}

const FormPie: React.FC<IProps> = ({ config, handleChange }) => {
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
                initialValue={config.devid}
                options={dataPie.map((dp) => ({
                    value: dp.id,
                    label: dp.name,
                }))}
                onChange={(value) => {
                    const selectedDevice = dataPie.find((dp) => dp.id === value);
                    if (selectedDevice) {
                        handleChange('data', selectedDevice.value);
                        console.log(selectedDevice.value)
                    }
                }}
            />
        </>
    );
};

export default FormPie;
