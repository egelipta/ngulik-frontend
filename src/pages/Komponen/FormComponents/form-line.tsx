import React from 'react';
import ProForm, { ProFormText, ProFormSelect, ProFormDigit } from '@ant-design/pro-form';
import { Space, ColorPicker } from 'antd';
import { dataLine } from '../Datas/data';

interface IProps {
    config: any;
    handleChange: (field: string, value: any, index?: number) => void;
}

const FormLine: React.FC<IProps> = ({ config, handleChange }) => {
    const isDeviceSelected = Boolean(config.devid)
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
                    options={dataLine.map((dt) => ({
                        value: dt.id,
                        label: dt.name,
                    }))}
                    onChange={(value) => {
                        const selectedDevice = dataLine.find((dt) => dt.id === value);
                        handleChange('devid', value);
                        if (selectedDevice) {
                            handleChange('data', selectedDevice.value);
                        } else {
                            handleChange('data', null);
                        }
                    }}
                    rules={[{ required: true, message: 'Cannot be empty!' }]}
                />
                <ProFormSelect
                    showSearch
                    width="sm"
                    name="dType"
                    label="Type"
                    placeholder="Select..."
                    initialValue={config.dType}
                    options={[
                        { value: 'line', label: 'Line' },
                        { value: 'area', label: 'Area' },
                        { value: 'line-area', label: 'Line and Area' },
                    ]}
                    onChange={(value) => handleChange('dType', value)}
                    disabled={!isDeviceSelected}
                />
                <ProFormSelect
                    showSearch
                    width="xs"
                    name="smooth"
                    label="Smooth?"
                    placeholder="Select..."
                    initialValue={config.smooth}
                    options={[
                        { value: 0, label: 'No' },
                        { value: 1, label: 'Yes' },
                    ]}
                    onChange={(value) => handleChange('smooth', value)}
                    disabled={!isDeviceSelected}
                />
            </ProForm.Group>
            <ProForm.Item
                hidden={!isDeviceSelected}
                label={'Color'}
                name={'color'}
                initialValue={config.color}
            >
                <Space>
                    <ColorPicker
                        value={config.color}
                        onChange={(value) =>
                            handleChange('color', value.toHexString())
                        }
                    />
                </Space>
            </ProForm.Item>
        </>
    );
};

export default FormLine;
