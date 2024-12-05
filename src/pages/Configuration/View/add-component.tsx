import React, { memo, useState, useEffect } from 'react';
import ProForm, { ModalForm } from '@ant-design/pro-form';
import { message, Row, Col } from 'antd';
// import { dataLine } from '../datas';
import { homeAssistantAddApiV1HomeAssistantHomeassistantAddDataPost } from '@/services/pjvms/homeAssistant';
import ProCard from '@ant-design/pro-card';
import { renderForm } from '../FormComponent/renderForm';


interface IProps {
    visible: boolean;
    onClose: () => void;
    SelectedComponent: { typeComponent: string; component: React.ElementType } | null;
    reload: () => void;
}

const AddComponent = memo(({ visible, onClose, SelectedComponent, reload }: IProps) => {

    const type = SelectedComponent?.typeComponent;
    const RenderComponent = SelectedComponent?.component;

    const getColor = (jenis: any) => {
        if (jenis === 'ChartGauge') {
            return ['#F4664A', '#FAAD14', '#30BF78']
        } else if (jenis === 'ChartRing') {
            return ['#5B8FF9', '#E8EDF3'];
        } else if (jenis === 'ChartLiquid') {
            return '#5B8FF9';
        } return '';
    };

    //config data default komponen
    const defaultConfig = {
        name: type,
        devid: null,
        percent: 0,
        data: [],
        conditions: 'min',
        color: getColor(type),
        min: 0,
        max: 100,
        lower: 20,
        normallower: 40,
        normalupper: 60,
        upper: 80,
        unit: '%',
    };

    // State untuk component config
    const [config, setConfig] = useState(defaultConfig);

    useEffect(() => {
        // Reset ke default jika `type` diubah
        setConfig(defaultConfig);
    }, [type]);

    const updateColorByCondition = (condition: string) => {
        if (condition === 'min-max') {
            return ['#F4664A', '#FAAD14', '#30BF78', '#FAAD14', '#F4664A']; // 5 warna
        } else if (condition === 'min') {
            return ['#F4664A', '#FAAD14', '#30BF78']; // 3 warna
        } else if (condition === 'max') {
            return ['#30BF78', '#FAAD14', '#F4664A']; // 3 warna
        }
        return config.color;
    };

    //fungsi ubah data dari default ke actual
    const handleChange = (field: string, value: any, index?: number) => {
        setConfig((prev) => {
            if (field === 'conditions') {
                const updatedColor = updateColorByCondition(value);
                return { ...prev, [field]: value, color: updatedColor };
            }
            if (field === 'color') {
                if (Array.isArray(prev.color)) {
                    // color dalam bentuk array
                    if (typeof index === 'number') {
                        const newColorRange = [...prev.color];
                        newColorRange[index] = value;
                        return { ...prev, color: newColorRange };
                    }
                } else {
                    //color dalam bentuk tunggal
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

    const onSave = async (val: any) => {
        // Prepare the formatted data
        const formattedData = {
            datachart: {
                name: val.name,
                devid: val.devid,
                type: type ?? '',
                unit: val.unit,
                datas: {
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
            }
        };

        console.log('SAVE DATA:', formattedData);

        try {
            await createData(formattedData); // Pass formattedData to createData
            message.success('Berhasil simpan data!');
            setConfig(defaultConfig);
            onClose();
            reload(); //reload page
        } catch (error) {
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
                    setConfig(defaultConfig);
                    onClose();
                },
            }}
            onFinish={onSave}
        >
            <Row gutter={[10, 10]}>
                {/* <Col xxl={16} xl={16} md={16} sm={24} xs={24} style={{ backgroundColor: '#fafafa', padding: 10 }}> */}
                <Col xxl={16} xl={16} md={16} sm={24} xs={24} style={{ backgroundColor: '#fafafa', padding: 15, height: '570px', overflowY: 'auto', }}>
                    {renderForm({ type, config, handleChange })}
                </Col>
                <Col xxl={8} xl={8} md={8} sm={24} xs={24}>
                    <Row style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                        <Col>
                            {RenderComponent && (
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
