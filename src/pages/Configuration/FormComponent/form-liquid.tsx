import React from 'react';
import ProForm, { ProFormText, ProFormSelect } from '@ant-design/pro-form';
import { dataTunggal } from '../Datas/data';
import { Space, ColorPicker } from 'antd';

interface IProps {
    config: any;
    handleChange: (field: string, value: any, index?: number) => void;
}

const FormLiquid: React.FC<IProps> = ({ config, handleChange }) => {
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
            <Space>
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
                <ProFormSelect
                    showSearch
                    width="sm"
                    name="shape"
                    label="Shape"
                    placeholder="Select type"
                    initialValue={config.shape}
                    options={[
                        { value: '', label: 'Default' },
                        { value: 'rect', label: 'Rect' },
                        { value: 'diamond', label: 'Diamond' }
                    ]}
                    onChange={(value) => handleChange('shape', value)}
                />
            </Space>
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
                    {/* jika color tunggal */}
                    <ColorPicker
                        value={typeof config.color === 'string' ? config.color : undefined}
                        onChange={(value) =>
                            handleChange('color', value.toHexString())
                        }
                    />
                </Space>
            </ProForm.Item>
        </>
    );
};

export default FormLiquid;
