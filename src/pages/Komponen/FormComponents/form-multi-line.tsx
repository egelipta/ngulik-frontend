import React, { useState, useEffect } from 'react';
import ProForm, { ProFormText, ProFormSelect } from '@ant-design/pro-form';
import { Space, ColorPicker } from 'antd';
import { dataMultiLine } from '../Datas/data';

interface IProps {
    config: any;
    handleChange: (field: string, value: any, index?: number) => void;
}

const FormMultiLine: React.FC<IProps> = ({ config, handleChange }) => {
    const [isDeviceSelected, setIsDeviceSelected] = useState<boolean>(false); // State untuk memeriksa apakah devid telah dipilih
    const [uniqueKeyCount, setUniqueKeyCount] = useState<number>(0); // State untuk menyimpan jumlah key unik

    // Fungsi untuk menghitung jumlah key unik berdasarkan deviceId
    const countUniqueKeys = (deviceId: number) => {
        const selectedDevice = dataMultiLine.find((dml) => dml.id === deviceId);
        if (selectedDevice) {
            const uniqueKeys = new Set(selectedDevice.value.map((v: any) => v.key)); // Ambil properti key
            setUniqueKeyCount(uniqueKeys.size); // Set jumlah key unik
        }
    };

    // useEffect untuk menghitung jumlah key unik saat pertama kali komponen di-render
    useEffect(() => {
        if (config.devid) {
            const selectedDevice = dataMultiLine.find((dml) => dml.id === config.devid);
            if (selectedDevice) {
                countUniqueKeys(config.devid); // Hitung jumlah key unik jika devid sudah ada
                setIsDeviceSelected(true); // Tandai bahwa device telah dipilih
            }
        } else {
            setIsDeviceSelected(false); // Reset jika devid kosong
        }
    }, [config.devid]); // Akan berjalan setiap kali `config.devid` berubah

    const handleDeviceChange = (value: any) => {
        const selectedDevice = dataMultiLine.find((dml) => dml.id === value);
        if (selectedDevice) {
            handleChange('data', selectedDevice.value); // Set data perangkat yang dipilih
            countUniqueKeys(value); // Hitung jumlah key unik
            setIsDeviceSelected(true); // Tandai bahwa device telah dipilih
        } else {
            handleChange('data', []); // Reset data jika device tidak dipilih
            setIsDeviceSelected(false); // Reset status device
        }
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
                    width="sm"
                    name="devid"
                    label="Device"
                    placeholder="Choose what you want!"
                    initialValue={config.devid}
                    options={dataMultiLine.map((dml: any) => ({
                        value: dml.id,
                        label: dml.name,
                    }))}
                    onChange={handleDeviceChange}
                    rules={[{ required: true, message: 'Cannot be empty!' }]}
                />
                <ProFormSelect
                    showSearch
                    width="sm"
                    name="dType"
                    label="Type"
                    placeholder="Select type"
                    initialValue={config.dType}
                    options={[
                        { value: 'line', label: 'Line' },
                        { value: 'area', label: 'Area' },
                        { value: 'line-area', label: 'Line and Area' },
                    ]}
                    disabled={!isDeviceSelected} // Disabled jika device belum dipilih
                    onChange={(value) => handleChange('dType', value)}
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
                    disabled={!isDeviceSelected} // Disabled jika device belum dipilih
                    onChange={(value) => handleChange('smooth', value)}
                />
            </ProForm.Group>

            {/* Tampilkan ColorPicker berdasarkan jumlah key unik */}
            {(isDeviceSelected) && (
                <ProForm.Item label="Color" name="color">
                    <Space>
                        {Array.from({ length: uniqueKeyCount }).map((_, index) => (
                            <ColorPicker
                                key={index}
                                value={config.color ? config.color[index] : ''}
                                onChange={(value) => {
                                    const updatedColors = [...config.color];
                                    updatedColors[index] = value.toHexString();
                                    handleChange('color', updatedColors);
                                }}
                            />
                        ))}
                    </Space>
                </ProForm.Item>
            )}
        </>
    );
};

export default FormMultiLine;
