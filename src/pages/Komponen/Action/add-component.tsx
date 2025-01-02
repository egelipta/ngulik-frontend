import React, { memo, useState, useEffect } from 'react';
import { ModalForm } from '@ant-design/pro-form';
import { Row, Col, message } from 'antd';
import exportComponent from '../Components/exportComponents';
import { renderForm } from '../FormComponents/renderForm';
import { homeAssistantAddApiV1HomeAssistantHomeassistantAddDataPost } from '@/services/pjvms/homeAssistant'

interface IProps {
    visible: boolean;
    onClose: () => void;
    SelectedComponent: { typeComponent: string; component: React.ElementType } | null;
    reload: () => void;
}

const AddComponent = memo(({ visible, onClose, SelectedComponent, reload }: IProps) => {
    const type = SelectedComponent?.typeComponent;
    const RenderComponent = SelectedComponent?.component;

    const defaultConfigs = exportComponent.defConf; // Default default untuk setiap jenis komponen
    const configs = defaultConfigs[type as keyof typeof defaultConfigs] || {}; // Get konfigurasi default berdasarkan jenis komponen
    const [config, setConfig] = useState(configs); // State untuk component config

    useEffect(() => {
        // Reset ke default jika `type` diubah
        setConfig(configs);
    }, [type]);

    //fungsi ubah data dari default ke actual
    const handleChange = (field: string, value: any, _index?: number) => {
        setConfig((prev) => {
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
                type: type ?? '',
                devid: val.devid,
                dataconfig: {
                    unit: val.unit,
                    color: config?.color,
                    min: val.min,
                    max: val.max,
                    conditions: val.conditions,
                    lower: val.lower,
                    normallower: val.normallower,
                    normalupper: val.normalupper,
                    upper: val.upper,
                    stepType: val.stepType,
                    border: val.border,
                    distance: val.distance,
                    smooth: val.smooth,
                    innerRadius: val.innerRadius,
                    dType: val.dType,
                }
            }
        };

        console.log('SAVE DATA:', formattedData);

        try {
            await createData(formattedData); // Pass formattedData to createData
            message.success('Berhasil simpan data!');
            setConfig(configs);
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
                    setConfig(configs);
                    onClose();
                },
            }}
            onFinish={onSave}
        >
            <Row gutter={[10, 10]}>
                <Col xxl={16} xl={16} md={16} sm={24} xs={24} style={{ backgroundColor: '#fafafa', padding: 15, height: '570px', overflowY: 'auto' }}>
                    {renderForm({ type, config, handleChange })}
                </Col>

                <Col xxl={8} xl={8} md={8} sm={24} xs={24}>
                    <Row style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                        <Col xxl={24} xs={24}>
                            {RenderComponent && (
                                <>
                                    {config?.name && <b>{config.name}</b>}
                                    <RenderComponent {...config} />
                                </>
                            )}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </ModalForm>
    );
});

export default AddComponent;
