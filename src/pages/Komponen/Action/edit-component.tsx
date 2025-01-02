import React, { memo, useEffect, useState } from 'react';
import { ModalForm } from '@ant-design/pro-form';
import exportComponent from '../Components/exportComponents';
import { dataTunggal, dataMultiLine, dataLine, dataPie, dataColumn } from '../Datas/data';
import { Row, Col, message } from 'antd';
import { renderForm } from '../FormComponents/renderForm';
import { homeAssistantUpdateApiV1HomeAssistantHomeassistantUpdateDataPut } from '@/services/pjvms/homeAssistant';

interface IProps {
    visible: boolean;
    onClose: () => void;
    dataSelected: any;
    reload: () => void;
}

const EditComponent = memo(({ visible, onClose, dataSelected, reload }: IProps) => {
    const type = dataSelected?.datachart?.type;
    const RenderComponent = type ? exportComponent.theComponent[type] : null;
    const inChart = dataSelected?.datachart;
    const inConfig = dataSelected?.datachart?.dataconfig;

    // Mendapatkan data berdasarkan `devid`
    const singleValue = dataTunggal.find((dt) => dt.id === inChart?.devid);
    const lineValue = dataLine.find((dl) => dl.id === inChart?.devid);
    const pieValue = dataPie.find((dp) => dp.id === inChart?.devid);
    const multiLine = dataMultiLine.find((dml) => dml.id === inChart?.devid);
    const columnValue = dataColumn.find((dc) => dc.id === inChart?.devid);

    // Konfigurasi default berdasarkan dataSelected
    const defaultConfig = {
        name: inChart?.name,
        type: inChart?.type,
        devid: inChart?.devid,

        unit: inConfig?.unit,

        percent: singleValue?.value,
        data:
            lineValue?.value ||
            pieValue?.value ||
            multiLine?.value ||
            columnValue?.value,
        conditions: inConfig?.conditions,
        color: inConfig?.color,
        min: inConfig?.min,
        max: inConfig?.max,
        lower: inConfig?.lower,
        normallower: inConfig?.normallower,
        normalupper: inConfig?.normalupper,
        upper: inConfig?.upper,
        stepType: inConfig?.stepType,
        border: inConfig?.border,
        distance: inConfig?.distance,
        smooth: inConfig?.smooth,
        innerRadius: inConfig?.innerRadius,
        dType: inConfig?.dType,

    };

    // State untuk menyimpan konfigurasi
    const [config, setConfig] = useState(defaultConfig);

    // Reset config setiap kali dataSelected berubah
    useEffect(() => {
        setConfig(defaultConfig);
    }, [dataSelected, type]); // Ketergantungan pada dataSelected

    //fungsi ubah data dari default ke actual
    const handleChange = (field: string, value: any, _index?: number) => {
        setConfig((prev) => {
            return { ...prev, [field]: value };
        });
    };

    const updateData = async (value: API.UpdateHomeAssistant) => {
        try {
            const result = await homeAssistantUpdateApiV1HomeAssistantHomeassistantUpdateDataPut(value);
            if (result.code === 200) {
                message.success(result.message);
                return result;
            } else {
                message.error(result.message || 'Update failed.');
                return null;
            }
        } catch (error) {
            message.error('An error occurred during the update. Please try again.');
            return null;
        }
    };

    const onSave = async (val: any) => {
        const formattedData = {
            id: dataSelected.id,
            datachart: {
                name: val.name,
                devid: val.devid,
                type: type ?? '',
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
            },
        };

        console.log('SAVE DATA:', formattedData);
        try {
            await updateData(formattedData);
            setConfig(defaultConfig);
            onClose();
            reload();
        } catch (error) {
            message.error('');
        }
        return true;
    };

    return (
        <ModalForm
            width={1000}
            title="Edit Component"
            open={visible}
            modalProps={{
                destroyOnClose: true,
                maskClosable: false,
                onCancel: () => {
                    onClose();
                    setConfig(defaultConfig);
                },
            }}
            onFinish={onSave}
        >
            <Row gutter={[10, 10]}>
                <Col
                    xxl={16}
                    xl={16}
                    md={16}
                    sm={24}
                    xs={24}
                    style={{
                        backgroundColor: '#fafafa',
                        padding: 15,
                        height: '570px',
                        overflowY: 'auto',
                    }}
                >
                    {renderForm({ type, config, handleChange })}
                </Col>
                <Col xxl={8} xl={8} md={8} sm={24} xs={24}>
                    <Row
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                        }}
                    >
                        <Col xxl={24} xs={24}>
                            {config?.name && <b>{config.name}</b>}
                            {RenderComponent && (
                                <RenderComponent {...config} />
                            )}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </ModalForm>
    );
});

export default EditComponent;
