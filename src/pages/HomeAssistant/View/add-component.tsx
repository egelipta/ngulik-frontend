import React, { memo, useState, useEffect } from 'react';
import ProForm, { ModalForm, ProFormDigit, ProFormSlider, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { message, ColorPicker, Row, Col, Space } from 'antd';

interface IProps {
    visible: boolean;
    onClose: () => void;
    SelectedComponent: { name: string; component: React.ElementType } | null;
}

const AddComponent = memo(({ visible, onClose, SelectedComponent }: IProps) => {
    const componentType = SelectedComponent?.name; // type komponen yang dipilih

    const initialConfig = {
        name: componentType,
        percent: 15,
        color: componentType === 'ChartLiquid' ? '#5B8FF9'
            : componentType === 'ChartRing' ? ['#5B8FF9', '#E8EDF3']
                : componentType === 'ChartGauge' ? ['#F4664A', '#FAAD14', '#30BF78']
                    : '',
        min: 0,
        max: 100,
        bawah: 30,
        atas: 60,
        unit: '%',
        texts: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum, reprehenderit.',
    };

    const [config, setConfig] = useState(initialConfig);

    // Update config when the SelectedComponent changes
    useEffect(() => {
        setConfig(initialConfig); // Update config saat komponen dipilih
    }, [SelectedComponent]);

    const handleChange = (field: string, value: any, index?: number) => {
        setConfig((prev) => {
            if (field === 'color') {
                if (Array.isArray(prev.color)) {
                    // Handle array case for ChartGauge
                    if (typeof index === 'number') {
                        const newColorRange = [...prev.color];
                        newColorRange[index] = value;
                        return { ...prev, color: newColorRange };
                    }
                } else {
                    // Handle single color case for ChartLiquid
                    return { ...prev, color: value };
                }
            }
            return { ...prev, [field]: value };
        });
    };

    const handleFinish = async (val: any) => {
        const formattedData = {
            name: val.name,
            percent: val.percent,
            unit: val.unit,
            type: componentType,
            data: componentType === 'ChartGauge'
                ? {
                    color: config.color,
                    min: val.min,
                    max: val.max,
                    bawah: val.bawah,
                    atas: val.atas,
                }
                : componentType === 'ChartLiquid'
                    ? {
                        color: config.color,
                    }
                    : componentType === 'ChartRing'
                        ? { color: config.color }
                        : componentType === 'Texts'
                            ? { texts: val.texts }
                            : {}
        };

        console.log('SAVE DATA:', formattedData);
        message.success('Data berhasil ditambahkan!');
        setConfig(initialConfig);
        onClose();
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
                <Col xxl={16} xl={16} md={16} sm={24} xs={24}>

                    {/* GENERAL */}
                    <ProFormText
                        label={'Name'}
                        name={'name'}
                        initialValue={componentType}
                        placeholder={'Fill the name...'}
                        fieldProps={{
                            onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleChange('name', e.target.value),
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
                    <ProFormSlider
                        name="percent"
                        label="Device"
                        min={0}
                        max={100}
                        initialValue={config.percent}
                        fieldProps={{
                            onChange: (value: any) => handleChange('percent', value),
                        }}
                    />

                    {/* GAUGE */}
                    {componentType === 'ChartGauge' && (
                        <>
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
                                <ProFormDigit
                                    label={'Batas Bawah'}
                                    name={'bawah'}
                                    width={'xs'}
                                    min={-100}
                                    max={1000}
                                    placeholder={'Batas Bawah...'}
                                    initialValue={config.bawah}
                                    fieldProps={{
                                        onChange: (value: any) => handleChange('bawah', value),
                                    }}
                                />
                                <ProFormDigit
                                    label={'Batas Atas'}
                                    name={'atas'}
                                    width={'xs'}
                                    min={-100}
                                    max={1000}
                                    placeholder={'Batas Atas...'}
                                    initialValue={config.atas}
                                    fieldProps={{
                                        onChange: (value: any) => handleChange('atas', value),
                                    }}
                                />
                            </ProForm.Group>
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

                    {/* LIQUID */}
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

                    {/* RING */}
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

                    {/* TEXTS */}
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
