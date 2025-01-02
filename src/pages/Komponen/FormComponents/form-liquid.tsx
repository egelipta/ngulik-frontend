import React from 'react';
import ProForm, { ProFormText, ProFormSelect, ProFormDigit } from '@ant-design/pro-form';
import { Space, ColorPicker } from 'antd';
import { dataTunggal } from '../Datas/data';

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
                <ProFormSelect
                    showSearch
                    width="sm"
                    name="dType"
                    label="Shape"
                    placeholder="Select type"
                    initialValue={config.dType}
                    options={[
                        { value: 'circle', label: 'Default' },
                        { value: 'rect', label: 'Rect' },
                        { value: 'diamond', label: 'Diamond' }
                    ]}
                    onChange={(value) => handleChange('dType', value)}
                />
            </ProForm.Group>
            <ProForm.Group title={'Outline'}>
                <ProFormDigit
                    label={'Border'}
                    name={'border'}
                    width={'xs'}
                    min={1}
                    max={10}
                    placeholder={'Border...'}
                    initialValue={config.border}
                    fieldProps={{
                        onChange: (value: any) => handleChange('border', value),
                    }}
                    rules={[{ required: true, message: 'Cannot be empty!' }]}
                />
                <ProFormDigit
                    label={'Distance'}
                    name={'distance'}
                    width={'xs'}
                    min={1}
                    max={10}
                    placeholder={'Distance...'}
                    initialValue={config.distance}
                    fieldProps={{
                        onChange: (value: any) => handleChange('distance', value),
                    }}
                    rules={[{ required: true, message: 'Cannot be empty!' }]}
                />
            </ProForm.Group>
            <ProForm.Item
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

export default FormLiquid;
