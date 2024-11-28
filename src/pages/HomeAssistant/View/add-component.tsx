import React, { memo, useState, useEffect } from 'react';
import ProForm, { ModalForm, ProFormDigit, ProFormSelect, ProFormSlider, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { message, ColorPicker, Row, Col, Space, Divider } from 'antd';
import { deviceData, dataLine } from '../datas';
// import { dataLine } from '../datas';
import { homeAssistantAddApiV1HomeAssistantHomeassistantAddDataPost } from '@/services/pjvms/homeAssistant';

interface IProps {
    visible: boolean;
    onClose: () => void;
    SelectedComponent: { name: string; component: React.ElementType } | null;
}

const AddComponent = memo(({ visible, onClose, SelectedComponent }: IProps) => {

    const componentType = SelectedComponent?.name; // AMBIL TYPE COMPONENT
    const getColor = (type: any) => {
        if (type === 'ChartGauge') {
            return ['#F4664A', '#FAAD14', '#30BF78']
        } else if (type === 'ChartRing') {
            return ['#5B8FF9', '#E8EDF3'];
        } else if (type === 'ChartLiquid') {
            return '#5B8FF9';
        } return '';
    };

    const initialConfig = {
        name: componentType,
        devid: 0,
        percent: 0,
        conditions: 'default',
        color: getColor(componentType),
        min: 0,
        max: 100,
        lower: 20,
        normallower: 40,
        normalupper: 60,
        upper: 80,
        unit: '%',
        texts: 'Lorem ipsum dolor sit amet consectetur, ChartGaugeadipisicing elit. Ipsum, reprehenderit.',
    };

    const [config, setConfig] = useState(initialConfig);

    // PERBARUI config KETIKA SelectedComponent BERUBAH
    useEffect(() => {
        setConfig(initialConfig); //PERBARUI config SAAT COMPONENT DIPILIH
    }, [SelectedComponent]);


    const updateColorByCondition = (condition: string) => {
        if (condition === 'min-max') {
            return ['#F4664A', '#FAAD14', '#30BF78', '#FAAD14', '#F4664A']; // 5 warna
        } else if (condition === 'default') {
            return ['#F4664A', '#FAAD14', '#30BF78']; // 3 warna
        }
        return config.color;
    };

    const [form] = ProForm.useForm();
    const handleChange = (field: string, value: any, index?: number) => {
        form.setFieldsValue({ [field]: value }); //value deviceData
        setConfig((prev) => {
            if (field === 'conditions') {
                const updatedColor = updateColorByCondition(value);
                return { ...prev, [field]: value, color: updatedColor };
            }

            if (field === 'color') {
                if (Array.isArray(prev.color)) {
                    // COLOR DALAM BENTUK ARRAY
                    if (typeof index === 'number') {
                        const newColorRange = [...prev.color];
                        newColorRange[index] = value;
                        return { ...prev, color: newColorRange };
                    }
                } else {
                    // COLOR DALAM BENTUK TUNGGAL
                    return { ...prev, color: value };
                }
            }
            return { ...prev, [field]: value };
        });
    };

    const createData = async (values: API.CreateHomeAssistant) => {
        try {
            const result = await homeAssistantAddApiV1HomeAssistantHomeassistantAddDataPost(values);
            return result;
        } catch (error) {
            console.error('Error during API call:', error);
            throw error;
        }
    };

    const handleFinish = async (val: any) => {
        // Prepare the formatted data
        const formattedData = {
            datachart: {
                name: val.name,
                devid: val.devid,
                unit: val.unit,
                type: componentType ?? '',
                datas: {
                    texts: val.texts,
                    color: config.color,
                    min: val.min,
                    max: val.max,
                    conditions: val.conditions,
                    ...(val.conditions === 'min-max' ? {
                        lower: val.lower,
                        normallower: val.normallower,
                        normalupper: val.normalupper,
                        upper: val.upper,
                    } : {
                        lower: val.lower,
                        upper: val.upper,
                    })
                },
                // ...(componentType === 'Texts' ? { data: { texts: val.texts } } : {}),
                // ...(componentType === 'ChartStatistic' ? { data: {} } : {}),
            }
        };

        console.log('SAVE DATA:', formattedData);

        try {
            await createData(formattedData); // Pass formattedData to createData
            message.success('Data berhasil ditambahkan!');
            setConfig(initialConfig);
            onClose();
        } catch (error) {
            console.error('Error saving data:', error);
            message.error('Gagal menambahkan data. Silakan coba lagi.');
        }

        return true;
    };

    return (
        <ModalForm
            width={1000}
            title="Add Component"
            open={visible}
            modalProps={{
                destroyOnClose: true,
                maskClosable: false,
                onCancel: () => {
                    setConfig(initialConfig);
                    onClose();
                },
            }}
            onFinish={handleFinish}
        >
            <Row gutter={[10, 10]}>
                {/* <Col xxl={16} xl={16} md={16} sm={24} xs={24} style={{ backgroundColor: '#fafafa', padding: 10 }}> */}
                <Col xxl={16} xl={16} md={16} sm={24} xs={24} style={{ backgroundColor: '#fafafa', padding: 15, height: '570px', overflowY: 'auto', }}>
                    {/* ================================================GENERAL================================================ */}
                    <ProFormText
                        label={'Name'}
                        name={'name'}
                        initialValue={componentType}
                        placeholder={'Fill the name...'}
                        fieldProps={{
                            onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleChange('name', e.target.value),
                        }}
                    />
                    <ProForm.Group>
                        {componentType === 'ChartGauge' && (
                            <>
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
                                    options={deviceData.map((device) => ({
                                        value: device.id,
                                        label: device.name,
                                    }))}
                                    onChange={(value) => {
                                        const selectedDevice = deviceData.find((device) => device.id === value);
                                        if (selectedDevice) {
                                            handleChange('percent', selectedDevice.value);
                                        }
                                    }}
                                />
                            </>
                        )}
                        {componentType === 'ChartLine' && (
                            <ProFormSelect
                                showSearch
                                width="sm"
                                name="devid"
                                label="Device"
                                placeholder="Choose the best!"
                                options={dataLine.map((device) => ({
                                    value: device.id,
                                    label: device.name,
                                }))}
                                onChange={(value) => {
                                    const selectedDevice = dataLine.find((device) => device.id === value);
                                    if (selectedDevice) {
                                        handleChange('percent', selectedDevice.value);
                                        console.log(selectedDevice.value)
                                    }
                                }}
                            />
                        )}
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
                    </ProForm.Group>
                    <Divider />

                    {/* ================================================GAUGE================================================ */}
                    {componentType === 'ChartGauge' && (
                        <>
                            <ProForm.Group title="Range">
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
                            <Divider />
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
                            <Divider />
                            <ProForm.Item
                                label={'Color'}
                                name={'color'}
                            >
                                <Space>
                                    {Array.isArray(config.color) // Cek jika color dalam bentuk array
                                        ? config.color.map((color, index) => (
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
                    )}

                    {/* ================================================LIQUID================================================ */}
                    {componentType === 'ChartLiquid' && (
                        <>
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
                    )}

                    {/* ================================================RING================================================ */}
                    {componentType === 'ChartRing' && (
                        <ProForm.Item
                            label={'Color'}
                            name={'color'}
                        >
                            <Space>
                                {Array.isArray(config.color) // Cek jika color dalam bentuk array
                                    ? config.color.map((color, index) => (
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
                    )}

                    {/* ================================================TEXTS================================================ */}
                    {componentType === 'Texts' && (
                        <ProFormTextArea
                            width="xl"
                            label="Texts"
                            name="texts"
                            initialValue={config.texts}
                            fieldProps={{
                                onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => handleChange('texts', e.target.value),
                            }}
                        />
                    )}

                </Col>
                <Col xxl={8} xl={8} md={8} sm={24} xs={24}>
                    <Row style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                        <Col>
                            {SelectedComponent?.component && (
                                <SelectedComponent.component {...config} />
                            )}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </ModalForm>
    );
});

export default AddComponent;
