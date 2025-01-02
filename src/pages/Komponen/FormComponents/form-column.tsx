import React from 'react';
import ProForm, { ProFormText, ProFormSelect, ProFormDigit } from '@ant-design/pro-form';
import { Space, ColorPicker } from 'antd';
import { dataColumn } from '../Datas/data';

interface IProps {
    config: any;
    handleChange: (field: string, value: any, index?: number) => void;
}

const FormColumn: React.FC<IProps> = ({ config, handleChange }) => {
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
            <ProForm.Group>
                <ProFormSelect
                    showSearch
                    width="sm"
                    name="devid"
                    label="Device"
                    placeholder="Choose what you want!"
                    initialValue={config.devid}
                    options={dataColumn.map((dc) => ({
                        value: dc.id,
                        label: dc.name,
                    }))}
                    onChange={(value) => {
                        const selectedDevice = dataColumn.find((dc) => dc.id === value);
                        handleChange('devid', value);
                        if (selectedDevice) {
                            handleChange('data', selectedDevice.value);
                        } else {
                            handleChange('data', null);
                        }
                    }}
                    rules={[{ required: true, message: 'Cannot be empty!' }]}
                />
            </ProForm.Group>
        </>
    );
};

export default FormColumn;
