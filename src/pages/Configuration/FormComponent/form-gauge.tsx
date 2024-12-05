import React from 'react';
import ProForm, { ProFormText, ProFormSelect, ProFormDigit } from '@ant-design/pro-form';
import { ColorPicker, Space } from 'antd';
import { dataTunggal } from '../Datas/data';

interface IProps {
    config: any;
    handleChange: (field: string, value: any, index?: number) => void;
}

const FormGauge: React.FC<IProps> = ({ config, handleChange }) => {
    return (
        <>
            <ProFormText
                label="Name"
                name="name"
                placeholder={'Fill the name'}
                initialValue={config.name}
                fieldProps={{
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleChange('name', e.target.value),
                }}
                rules={[{ required: true, message: 'Cannot be empty!' }]}
            />
            <ProForm.Group>
                <ProFormSelect
                    showSearch
                    width={"sm"}
                    name={'conditions'}
                    label={'Conditions'}
                    initialValue={config.conditions}
                    options={[
                        { value: 'min', label: 'MIN' },
                        { value: 'max', label: 'MAX' },
                        { value: 'min-max', label: 'MIN-MAX' }
                    ]}
                    onChange={(value) => handleChange('conditions', value)}
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
                        const valDevice = dataTunggal.find((dt) => dt.id === value);
                        if (valDevice) {
                            handleChange('percent', valDevice.value);
                        }
                    }}
                    rules={[{ required: true, message: 'Cannot be empty!' }]}
                />
            </ProForm.Group>
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
            <ProForm.Group>
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
            <ProForm.Item
                label={'Color'}
                name={'color'}
            >
                <Space>
                    {Array.isArray(config.color) ? (
                        config.color.map((color: any, index: number) => (
                            <ColorPicker
                                key={index}
                                value={color}
                                onChange={(value) => handleChange('color', value.toHexString(), index)}
                            />
                        ))
                    ) : (
                        <ColorPicker
                            value={config.color}
                            onChange={(value) => handleChange('color', value.toHexString())}
                        />
                    )}
                </Space>
            </ProForm.Item>
        </>
    );
};

export default FormGauge;
