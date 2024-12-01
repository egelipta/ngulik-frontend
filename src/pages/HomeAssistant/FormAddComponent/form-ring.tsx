import React from 'react';
import ProForm, { ProFormText, ProFormSelect } from '@ant-design/pro-form';
import { dataTunggal } from '../datas';
import { Space, ColorPicker } from 'antd';

interface IProps {
    config: any;
    handleChange: (field: string, value: any, index?: number) => void;
}

const FormRing: React.FC<IProps> = ({ config, handleChange }) => {
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
                options={dataTunggal.map((device) => ({
                    value: device.id,
                    label: device.name,
                }))}
                onChange={(value) => {
                    const selectedDevice = dataTunggal.find((device) => device.id === value);
                    if (selectedDevice) {
                        handleChange('percent', selectedDevice.value);
                    }
                }}
            />
            <ProFormText
                label={'Unit'}
                name={'unit'}
                width={'xs'}
                placeholder={'Unit...'}
                initialValue={config.unit}
                fieldProps={{
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleChange('unit', e.target.value),
                }}
            />
            <ProForm.Item
                label={'Color'}
                name={'color'}
            >
                <Space>
                    {Array.isArray(config.color) // Cek jika color dalam bentuk array
                        ? config.color.map((color: any, index: number) => (
                            <ColorPicker
                                key={index}
                                value={color}
                                onChange={(value) =>
                                    handleChange('color', value.toHexString(), index)
                                }
                            />
                        ))
                        : (
                            <ColorPicker
                                value={config.color}
                                onChange={(value) =>
                                    handleChange('color', value.toHexString())
                                }
                            />
                        )}
                </Space>
            </ProForm.Item>
        </>
    );
};

export default FormRing;
