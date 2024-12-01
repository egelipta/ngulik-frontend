import React, { memo, useState, useEffect } from 'react';
import ProForm, { ModalForm } from '@ant-design/pro-form';
import { message, Row, Col } from 'antd';
// import { dataLine } from '../datas';
import { homeAssistantAddApiV1HomeAssistantHomeassistantAddDataPost } from '@/services/pjvms/homeAssistant';
import FormGauge from '../FormAddComponent/form-gauge';
import FormLine from '../FormAddComponent/form-line';
import FormLiquid from '../FormAddComponent/form-liquid';
import FormRing from '../FormAddComponent/form-ring';
import FormTexts from '../FormAddComponent/form-text';
import FormPie from '../FormAddComponent/form-pie';

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
        data: [],
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

    const renderForm = () => {
        if (componentType === 'ChartGauge') {
            return <FormGauge config={config} handleChange={handleChange} />;
        } else if (componentType === 'ChartLine') {
            return <FormLine config={config} handleChange={handleChange} />;
        } else if (componentType === 'ChartLiquid') {
            return <FormLiquid config={config} handleChange={handleChange} />;
        } else if (componentType === 'ChartRing') {
            return <FormRing config={config} handleChange={handleChange} />;
        } else if (componentType === 'Texts') {
            return <FormTexts config={config} handleChange={handleChange} />;
        } else if (componentType === 'ChartPie') {
            return <FormPie config={config} handleChange={handleChange} />;
        }
        return null;
    };

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
        form.setFieldsValue({ [field]: value }); //value dataTunggal
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
                    {/* Form Add Component */}
                    {renderForm()}
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
