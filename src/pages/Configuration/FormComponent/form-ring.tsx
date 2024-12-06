import React from 'react';
import ProForm, { ProFormText, ProFormSelect } from '@ant-design/pro-form';
import { dataTunggal } from '../Datas/data';
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
                rules={[{ required: true, message: 'Cannot be empty!' }]}
            />
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
            <ProFormText
                label={'Unit'}
                name={'unit'}
                width={'xs'}
                placeholder={'Unit...'}
                initialValue={config.unit}
                fieldProps={{
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleChange('unit', e.target.value),
                }}
                rules={[{ required: true, message: 'Cannot be empty!' }]}
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
