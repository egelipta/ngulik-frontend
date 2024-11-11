import { DrawerForm, ProForm, ProFormDigit, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { ColorPicker, Slider, Space } from 'antd';
import { AggregationColor } from 'antd/es/color-picker/color';
import { ColorValueType } from 'antd/es/color-picker/interface';
import React from 'react';

interface NodeDrawerProps {
    selectedNode: any; // Change this type according to your node structure
    drawerVisible: boolean;
    setDrawerVisible: (visible: boolean) => void;
    handleSaveUpdateNode: () => void;
    nodeData: {
        title: string;
        idDevice: number | null;
        size: number;
        nodeType: string;
        color: string | string[];
        min: number;
        max: number;
        batasBawah: number;
        batasAtas: number;
    };
    setNodeData: (data: {
        title: string;
        idDevice: number | null;
        size: number;
        nodeType: string;
        color: string | string[];
        min: number;
        max: number;
        batasBawah: number;
        batasAtas: number;
    }) => void;
}

const NodeDrawer: React.FC<NodeDrawerProps> = ({
    selectedNode,
    drawerVisible,
    setDrawerVisible,
    handleSaveUpdateNode,
    nodeData,
    setNodeData,
}) => {
    const nodeType = selectedNode ? selectedNode.type : '';

    return (
        <DrawerForm
            onOpenChange={setDrawerVisible}
            open={drawerVisible}
            title={"Basic Setup"}
            resize={{
                maxWidth: window.innerWidth * 0.8,
                minWidth: 400,
            }}
            autoFocusFirstInput
            drawerProps={{
                destroyOnClose: true,
            }}
            onFinish={async () => {
                handleSaveUpdateNode();
                return true;
            }}
        >
            <ProFormText
                width={"md"}
                name="title"
                label="Nama"
                placeholder="Enter node title"
                initialValue={nodeData.title}
                fieldProps={{
                    onChange: (e) => setNodeData({ ...nodeData, title: e.target.value || '' }),
                }}
            />
            <ProFormSelect
                width={"md"}
                showSearch
                name={'idDevice'}
                label={'Perangkat'}
                placeholder={'Pilih yang terbaik!'}
                fieldProps={{
                    value: nodeData.idDevice,
                    onChange: (value: number | null) => setNodeData({ ...nodeData, idDevice: value as number | null }),
                }}
                options={[
                    { label: 'Device 1 - 20', value: 1 },
                    { label: 'Device 2 - 40', value: 2 },
                    { label: 'Device 3 - 60', value: 3 },
                    { label: 'Device 4 - 80', value: 4 },
                    { label: 'Device 5 - 100', value: 5 },
                ]}
            />
            <ProForm.Item
                label={'Ukuran'}
                name={'size'}
            >
                <Slider
                    min={150}
                    max={300}
                    defaultValue={nodeData.size}
                    onChange={(value) => setNodeData({ ...nodeData, size: value })}
                />
            </ProForm.Item>

            {/* GAUGE */}
            {nodeType === 'ChartGauge' && (
                <ProForm.Group>
                    <Space>
                        <ProFormDigit
                            label="Nilai Min"
                            name="min"
                            initialValue={nodeData.min}
                            width={150}
                            min={-100}
                            max={100}
                            fieldProps={{
                                onChange: (value: number | null) => {
                                    setNodeData({ ...nodeData, min: value ?? 0 });
                                },
                            }}
                        />

                        <ProFormDigit
                            label="Nilai Max"
                            name="max"
                            initialValue={nodeData.max}
                            width={150}
                            min={0}
                            max={1000}
                            fieldProps={{
                                onChange: (value: number | null) => {
                                    setNodeData({ ...nodeData, max: value ?? 100 });
                                },
                            }}
                        />
                    </Space>
                    <ProForm.Item
                        name={'colorGauge'}
                        label={'Warna'}
                    >
                        <Space>
                            {Array.isArray(nodeData.color) && nodeData.color.map((color: ColorValueType | undefined, index) => (
                                <ColorPicker
                                    key={index}
                                    defaultValue={color}
                                    onChange={(_value: AggregationColor, css: string) => {
                                        const newColors = [...nodeData.color];
                                        newColors[index] = css;
                                        setNodeData({ ...nodeData, color: newColors });
                                    }}
                                />
                            ))}

                        </Space>
                    </ProForm.Item>
                    <Space>
                        <ProFormDigit
                            label="Batas Bawah"
                            name="batasbawah"
                            initialValue={nodeData.batasBawah}
                            width={150}
                            min={-100}
                            max={1000}
                            fieldProps={{
                                onChange: (value: number | null) => {
                                    setNodeData({ ...nodeData, batasBawah: value ?? 40 });
                                },
                            }}
                        />
                        <ProFormDigit
                            label="Batas Atas"
                            name="batasatas"
                            initialValue={nodeData.batasAtas}
                            width={150}
                            min={-100}
                            max={1000}
                            fieldProps={{
                                onChange: (value: number | null) => {
                                    setNodeData({ ...nodeData, batasAtas: value ?? 70 });
                                },
                            }}
                        />
                    </Space>
                </ProForm.Group>
            )}
            {/* PROGRESS */}
            {nodeType === 'ProgressCircle' && (
                <ProForm.Item
                    name={'colorCircle'}
                    label={'Warna'}
                >
                    <Space>
                        {Array.isArray(nodeData.color) && nodeData.color.map((color: ColorValueType | undefined, index) => (
                            <ColorPicker
                                key={index}
                                defaultValue={color}
                                onChange={(_value: AggregationColor, css: string) => {
                                    const newColors = [...nodeData.color];
                                    newColors[index] = css;
                                    setNodeData({ ...nodeData, color: newColors });
                                }}
                            />
                        ))}
                    </Space>
                </ProForm.Item>
            )}
            {/* LIQUID */}
            {nodeType === 'ChartLiquid' && (
                <ProForm.Item
                    name={'colorLiquid'}
                    label={'Warna'}
                >
                    <ColorPicker
                        defaultValue={typeof nodeData.color === 'string' ? nodeData.color : nodeData.color[0] || ''}
                        onChange={(_value: AggregationColor, css: string) => {
                            setNodeData({ ...nodeData, color: css });
                        }}
                    />

                </ProForm.Item>
            )}

        </DrawerForm>
    );
};

export default NodeDrawer;
