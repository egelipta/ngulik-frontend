import React, { memo } from 'react';
import ProForm, { ProFormText, ProFormSelect, ProFormDigit } from '@ant-design/pro-form';
import { Space, Button } from 'antd';
import { ColorPicker } from 'antd';
import { dataTunggal } from '../Datas/data';

interface IProps {
    config: any;
    handleChange: (field: string, value: any, index?: number) => void;
}

const FormRing = memo(({ config, handleChange }: IProps) => {

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
                    options={dataTunggal.map((dt) => ({
                        value: dt.id,
                        label: dt.name,
                    }))}
                    onChange={(value) => {
                        const selectedDevice = dataTunggal.find((dt) => dt.id === value);
                        if (selectedDevice) {
                            handleChange('percent', selectedDevice.value);
                        }
                    }}
                    rules={[{ required: true, message: 'Cannot be empty!' }]}
                />
            </ProForm.Group>
            <ProForm.Item label="Color" name="color">
                <Space>
                    {config.color?.map((color: string, index: number) => (
                        <ColorPicker
                            value={color}
                            onChange={(value) => {
                                const updatedColors = [...config.color];
                                updatedColors[index] = value.toHexString();
                                handleChange('color', updatedColors);
                            }}
                        />
                    ))}
                </Space>
            </ProForm.Item>
        </>
    );
})
export default FormRing;
