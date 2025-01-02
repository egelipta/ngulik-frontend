import React from 'react';
import ProForm, { ProFormText, ProFormSelect, ProFormDigit } from '@ant-design/pro-form';
import { Space, ColorPicker } from 'antd';
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
                rules={[{ required: true, message: 'Cannot be empty!' }]}
            />
            <ProFormSelect
                showSearch
                width="sm"
                name="devid"
                label="Device"
                placeholder="Choose what you want!"
                initialValue={config.devid}
                options={dataPie.map((dp) => ({
                    value: dp.id,
                    label: dp.name,
                }))}
                onChange={(value) => {
                    const selectedDevice = dataPie.find((dp) => dp.id === value);
                    if (selectedDevice) {
                        handleChange('data', selectedDevice.value);
                    }
                }}
                rules={[{ required: true, message: 'Cannot be empty!' }]}
            />
            <ProFormSelect
                showSearch
                width="xs"
                name="innerRadius"
                label="Type"
                placeholder="Select type"
                initialValue={config.innerRadius}
                options={[
                    { value: 0, label: 'Pie' },
                    { value: 0.5, label: 'Donut' },
                ]}
                onChange={(value) => handleChange('innerRadius', value)}
            />
        </>
    );
};

export default FormPie;
