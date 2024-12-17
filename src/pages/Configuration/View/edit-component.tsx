import React, { memo, useEffect, useState } from 'react';
import { ModalForm } from '@ant-design/pro-form';
import TheComponent from '../Components/theComponent';
import { dataTunggal, dataLine, dataPie, dataMultiLine } from '../Datas/data';
import { Row, Col, message } from 'antd';
import { renderForm } from '../FormComponent/renderForm';
import { homeAssistantUpdateApiV1HomeAssistantHomeassistantUpdateDataPut } from '@/services/pjvms/homeAssistant';

interface IProps {
    visible: boolean;
    onClose: () => void;
    dataSelected: any;
    reload: () => void;
}

const EditComponent = memo(({ visible, onClose, dataSelected, reload }: IProps) => {
    const type = dataSelected?.datachart?.type;
    const RenderComponent = type ? TheComponent[type] : null;

    // Mendapatkan data berdasarkan `devid`
    const singleValue = dataTunggal.find((dt) => dt.id === dataSelected?.datachart?.devid);
    const lineValue = dataLine.find((dl) => dl.id === dataSelected?.datachart?.devid);
    const pieValue = dataPie.find((dp) => dp.id === dataSelected?.datachart?.devid);
    const multiLine = dataMultiLine.find((dml) => dml.id === dataSelected?.datachart?.devid);

    // Konfigurasi default berdasarkan dataSelected
    const defaultConfig = {
        name: dataSelected?.datachart?.name,
        type: dataSelected?.datachart?.type,
        devid: dataSelected?.datachart?.devid,
        unit: dataSelected?.datachart?.unit,
        percent: singleValue?.value,
        data: lineValue?.value || pieValue?.value || multiLine?.value,
        conditions: dataSelected?.datachart?.datas?.conditions,
        color: dataSelected?.datachart?.datas?.color,
        min: dataSelected?.datachart?.datas?.min,
        max: dataSelected?.datachart?.datas?.max,
        lower: dataSelected?.datachart?.datas?.lower,
        normallower: dataSelected?.datachart?.datas?.normallower,
        normalupper: dataSelected?.datachart?.datas?.normalupper,
        upper: dataSelected?.datachart?.datas?.upper,
        stepType: dataSelected?.datachart?.datas?.stepType,
        shape: dataSelected?.datachart?.datas?.shape,
    };

    // State untuk menyimpan konfigurasi
    const [config, setConfig] = useState(defaultConfig);

    // Reset config setiap kali dataSelected berubah
    useEffect(() => {
        setConfig(defaultConfig);
    }, [dataSelected, type]); // Ketergantungan pada dataSelected


    let condBerubah: string = dataSelected?.datachart?.datas?.conditions;

    const updateColorByCondition = (condition: string) => {
        // Ambil warna default dari dataSelected atau kosongkan array jika tidak ada
        const dataColor = dataSelected?.datachart?.datas?.color || [];

        // Jika kondisi berubah dari 'min' ke 'max' atau sebaliknya, gunakan fallback warna
        if ((condBerubah === 'min' && condition === 'max') ||
            (condBerubah === 'max' && condition === 'min')) {
            condBerubah = condition;
            return condition === 'max'
                ? ['#30BF78', '#FAAD14', '#F4664A']
                : ['#F4664A', '#FAAD14', '#30BF78'];
        }

        // Jika tidak ada perubahan, kembali ke warna berdasarkan kondisi saat ini
        switch (condition) {
            case 'min-max':
                return dataColor.length === 5
                    ? dataColor
                    : ['#F4664A', '#FAAD14', '#30BF78', '#FAAD14', '#F4664A'];
            case 'min':
                return dataColor.length === 3
                    ? dataColor
                    : ['#F4664A', '#FAAD14', '#30BF78'];
            case 'max':
                return dataColor.length === 3
                    ? dataColor
                    : ['#30BF78', '#FAAD14', '#F4664A'];
            default:
                return config.color;
        }
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
                unit: val.unit,
                datas: {
                    shape: val.shape,
                    stepType: val.stepType,
                    color: config.color,
                    min: val.min,
                    max: val.max,
                    conditions: val.conditions,
                    ...(val.conditions === 'min-max'
                        ? {
                            lower: val.lower,
                            normallower: val.normallower,
                            normalupper: val.normalupper,
                            upper: val.upper,
                        }
                        : {
                            lower: val.lower,
                            upper: val.upper,
                        }),
                },
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
                        <Col>
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
