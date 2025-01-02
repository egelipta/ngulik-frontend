import React, { memo } from 'react';
import ProForm, { ProFormText, ProFormSelect, ProFormDigit } from '@ant-design/pro-form';
import { Space, Button } from 'antd';
import { ColorPicker } from 'antd';
import { dataTunggal } from '../Datas/data';

interface IProps {
    config: any;
    handleChange: (field: string, value: any, index?: number) => void;
}

const FormGauge = memo(({ config, handleChange }: IProps) => {
    const ubahColorByCond = (condition: string) => {
        if (condition === 'min-max') {
            return ['#F4664A', '#FAAD14', '#30BF78', '#FAAD14', '#F4664A']; // 5 warna
        } else if (condition === 'min') {
            return ['#F4664A', '#FAAD14', '#30BF78']; // 3 warna
        } else if (condition === 'max') {
            return ['#30BF78', '#FAAD14', '#F4664A']; // 3 warna
        }
        return config.color;
    };

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
                    width="xs"
                    name="conditions"
                    label="Conditions"
                    placeholder="Select..."
                    initialValue={config.conditions}
                    options={[
                        { value: 'min', label: 'Min' },
                        { value: 'max', label: 'Max' },
                        { value: 'min-max', label: 'Min-Max' },
                    ]}
                    onChange={(value: any) => {
                        const updatedColors = ubahColorByCond(value);
                        handleChange('conditions', value);
                        handleChange('color', updatedColors);
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
                <ProFormSelect
                    showSearch
                    width="xs"
                    name="dType"
                    label="Type"
                    placeholder="Select type"
                    initialValue={config.dType}
                    options={[
                        { value: '', label: 'Default' },
                        { value: 'meter', label: 'Meter' },
                    ]}
                    onChange={(value) => handleChange('dType', value)}
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
            </ProForm.Group>
            <ProForm.Group title='Range'>
                <ProFormDigit
                    label={'Min'}
                    name={'min'}
                    width={'xs'}
                    min={-100}
                    max={1000}
                    placeholder={'Min...'}
                    initialValue={config.min}
                    fieldProps={{
                        onChange: (value: any) => handleChange('min', value),
                    }}
                    rules={[{ required: true, message: 'Cannot be empty!' }]}
                />
                <ProFormDigit
                    label={'Max'}
                    name={'max'}
                    width={'xs'}
                    min={-100}
                    max={1000}
                    placeholder={'Max...'}
                    initialValue={config.max}
                    fieldProps={{
                        onChange: (value: any) => handleChange('max', value),
                    }}
                    rules={[{ required: true, message: 'Cannot be empty!' }]}
                />
            </ProForm.Group>
            <ProForm.Group title='Limit'>
                <ProFormDigit
                    label={'Lower'}
                    name={'lower'}
                    width={'xs'}
                    min={-100}
                    max={1000}
                    placeholder={'Lower...'}
                    initialValue={config.lower}
                    fieldProps={{
                        onChange: (value: any) => handleChange('lower', value),
                    }}
                    rules={[{ required: true, message: 'Cannot be empty!' }]}
                />
                {config.conditions === 'min-max' && (
                    <>
                        <ProFormDigit
                            label="Lower Normal"
                            name="normallower"
                            width="xs"
                            min={-100}
                            max={1000}
                            placeholder="Normal Lower..."
                            initialValue={config.normallower}
                            fieldProps={{
                                onChange: (value: any) => handleChange('normallower', value),
                            }}
                            rules={[{ required: true, message: 'Cannot be empty!' }]}
                        />
                        <ProFormDigit
                            label="Upper Normal"
                            name="normalupper"
                            width="xs"
                            min={-100}
                            max={1000}
                            placeholder="Normal Upper..."
                            initialValue={config.normalupper}
                            fieldProps={{
                                onChange: (value: any) => handleChange('normalupper', value),
                            }}
                            rules={[{ required: true, message: 'Cannot be empty!' }]}
                        />
                    </>
                )}
                <ProFormDigit
                    label={'Upper'}
                    name={'upper'}
                    width={'xs'}
                    min={-100}
                    max={1000}
                    placeholder={'Upper...'}
                    initialValue={config.upper}
                    fieldProps={{
                        onChange: (value: any) => handleChange('upper', value),
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
export default FormGauge;
