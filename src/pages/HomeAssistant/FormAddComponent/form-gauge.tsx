import React from 'react';
import ProForm, { ProFormText, ProFormSelect, ProFormDigit } from '@ant-design/pro-form';
import { ColorPicker, Space } from 'antd';
import { dataTunggal } from '../datas';

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
                initialValue={config.name}
                fieldProps={{
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleChange('name', e.target.value),
                }}
            />
            <ProForm.Group>
                <ProFormSelect
                    showSearch
                    width={"sm"}
                    name={'conditions'}
                    label={'Conditions'}
                    initialValue={'default'}
                    options={[
                        { value: 'default', label: 'MIN or MAX' },
                        { value: 'min-max', label: 'MIN and MAX' }
                    ]}
                    onChange={(value) => handleChange('conditions', value)}
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
