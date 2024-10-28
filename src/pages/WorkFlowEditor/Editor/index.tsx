import { useEffect, useState } from 'react';
import { FlowEditor, FlowEditorProvider, FlowPanel, useFlowEditor } from '@ant-design/pro-flow';
import { DrawerForm, PageContainer, ProCard, ProForm, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { DeleteOutlined } from '@ant-design/icons';
import useStyles from '../css/styles';
import { useCallback } from 'react';
import { Button, Input, message, Select, Space } from 'antd';
import {
    workfloweditorUpdateApiV1WorkfloweditorWorkfloweditorUpdateDataPut,
    workfloweditorApiV1WorkfloweditorWorkfloweditorGetDataGet
}
    from '@/services/pjvms/workflowEditor';

import Sidebar from './sidebar';

import IkonSatu from '../Components/Satu/ikonSatu';
import IkonDua from '../Components/Satu/ikonDua';
import Server from '../Components/Dua/server';
import RackServer from '../Components/Dua/rackServer';
import Cloud from '../Components/Dua/cloud';
import Pc from '../Components/Dua/pc';
import Tree from '../Components/Tiga/tree';
import Car from '../Components/Tiga/car';
import Electricity from '../Components/Tiga/electricity';
import Generator from '../Components/Tiga/generator';
import Building from '../Components/Tiga/building';
import Circle1 from '../Components/Empat/circle1';
import Circle2 from '../Components/Empat/circle2';
import Circle3 from '../Components/Empat/circle3';
import ChartGauge from '../Components/Charts/gauge';
import ProgressCircle from '../Components/Charts/progress-circle';
import ChartLiquid from '../Components/Charts/liquid';

import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';


let id = 1;
const getId = () => `${id++}`;
// const getId = () => `${Math.floor(new Date().getTime() / 1000)}`;

const nodeTypes = {
    IkonSatu: IkonSatu,
    IkonDua: IkonDua,
    Server: Server,
    RackServer: RackServer,
    Cloud: Cloud,
    Pc: Pc,
    Tree: Tree,
    Car: Car,
    Electricity: Electricity,
    Generator: Generator,
    Building: Building,
    Circle1: Circle1,
    Circle2: Circle2,
    Circle3: Circle3,
    ChartGauge: ChartGauge,
    ProgressCircle: ProgressCircle,
    ChartLiquid: ChartLiquid,
};

const ProFlowDemo = () => {
    const editor = useFlowEditor();
    const { styles } = useStyles();
    const navigate = useNavigate();
    const { idParam } = useParams();

    const [dataNodes, setDataNodes] = useState<any[]>([]);
    const [dataEdges, setDataEdges] = useState<any[]>([]);
    const [name, setName] = useState('');

    const [drawerVisible, setDrawerVisible] = useState(false);
    const [selectedNode, setSelectedNode] = useState<any>(null);

    const getDataWorkflow = async () => {
        try {
            const result = await workfloweditorApiV1WorkfloweditorWorkfloweditorGetDataGet({ id: idParam });

            const fetchName = result[0]?.name;
            setName(fetchName);

            const nodesData = result.map((item: any) => item.nodesjson).flat();
            setDataNodes(nodesData);

            const edgesData = result.map((item: any) => item.edgesjson).flat();
            setDataEdges(edgesData);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        getDataWorkflow();
    }, []);


    const onDragOver = useCallback((event: any) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    // Function to drop node to the drop zone
    const onDrop = useCallback(
        (event: any) => {
            event.preventDefault();
            if (!editor) return;

            const type = event.dataTransfer.getData('application/reactflow');
            if (typeof type === 'undefined' || !type) {
                return;
            }

            const position = editor.screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });
            const newNode = {
                id: getId(),
                type,
                position,
                data: {
                    title: `${type} node`,
                },
            };

            editor.addNode(newNode);
        },
        [editor],
    );

    // MEnampilkan data node dan edge*****
    useEffect(() => {
        if (!editor) return;
        const nodes = dataNodes;
        const edges = dataEdges;

        nodes.forEach(node => {
            editor.addNode(node);
        });

        edges.forEach(edge => {
            editor.addEdge(edge);
        });
    }, [editor]);

    const updateData = async (value: API.UpdateWorkflowEditor) => {
        try {
            const result = await workfloweditorUpdateApiV1WorkfloweditorWorkfloweditorUpdateDataPut(value);
            if (result.code === 200) {
                message.success(result.message);
                return result; // Return the result to the caller
            } else {
                message.error(result.message || 'Update failed.');
                return null; // Return null if the update failed
            }
        } catch (error) {
            console.error('Error updating data:', error);
            message.error('An error occurred during the update. Please try again.');
            return null; // Return null if an exception occurred
        }
    };

    const saveData = useCallback(async () => {
        if (!editor) return;

        const workflowName = name.trim() === '' ? `Untitled${Math.floor(new Date().getTime() / 1000)}` : name;

        const nodes = editor.reactflow?.getNodes() || [];
        const edges = editor.reactflow?.getEdges() || [];

        const strukturData = {
            id: Number(idParam),
            name: workflowName,
            nodesjson: nodes.map((node) => ({
                id: node.id,
                type: node.type,
                position: node.position,
                data: node.data,
            })),
            edgesjson: edges.map((edge) => ({
                id: edge.id,
                type: edge.type,
                animated: edge.animated,
                style: edge.style,
                source: edge.source,
                target: edge.target,
                sourceHandle: edge.sourceHandle,
                targetHandle: edge.targetHandle,
                selected: edge.selected,
            })),
        };

        try {
            const result = await updateData(strukturData);
            if (result && result.code === 200) {
                // message.success('Saved successfully');
                navigate('/workflow-editor');
            } else {
                message.error(result?.message || 'Failed to save');
            }
        } catch (error) {
            message.error('Error, try again later!');
        }
    }, [editor, name, idParam, updateData]);

    //fungsi hapus Node dan Edge
    const hapusNodeEdge = () => {
        if (!editor || !editor.reactflow) return;

        editor.getSelectedKeys().forEach((id) => {
            //ketika hapus node, edge yang terkoneksi ikut terhapus
            const connectedEdges = editor.reactflow?.getEdges().filter(edge => edge.source === id || edge.target === id) || [];
            connectedEdges.forEach((edge) => {
                editor.deleteEdge(edge.id);
            });
            // hapus node dan edge satu persatu
            editor.deleteNode(id);
            editor.deleteEdge(id);
        });
    }

    const handleNodeClick = useCallback((_event: React.MouseEvent, node: any) => {
        setSelectedNode(node); // Store the clicked node
        setDrawerVisible(true); // Show the drawer
    }, []);

    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };

    return (
        <div className={styles.container}>
            <FlowEditor
                defaultViewport={{
                    x: 0,
                    y: 0,
                    zoom: 0.7,
                }}
                nodeTypes={nodeTypes}
                flowProps={{
                    onDrop,
                    onDragOver,
                    onNodeClick: handleNodeClick, // Attach the node click handler
                    defaultEdgeOptions: {
                        type: 'smoothstep',
                        animated: true,
                        style: { strokeWidth: 8 },
                    },
                }}
                miniMap={false}
                devtools={true}
                background={true}
            >
                <Sidebar />
                <FlowPanel position="top-left">
                    <ProCard size='small'>
                        <Space direction="vertical">
                            <Input
                                name="name"
                                placeholder="Name..."
                                value={name}
                                onChange={(e) => setName(e.target.value || '')}
                                autoComplete='off'
                            />
                            <Space>
                                <Button
                                    // disabled
                                    danger
                                    type="primary"
                                    size="small"
                                    onClick={hapusNodeEdge}
                                >
                                    Hapus <DeleteOutlined />
                                </Button>
                                <Button
                                    type="primary"
                                    size="small"
                                    onClick={saveData}
                                >
                                    Simpan
                                </Button>
                            </Space>
                        </Space>
                    </ProCard>
                </FlowPanel>
            </FlowEditor>

            <DrawerForm
                onOpenChange={setDrawerVisible}
                open={drawerVisible}
                title="Basic Setup"
                resize={{
                    maxWidth: window.innerWidth * 0.8,
                    minWidth: 400,
                }}
                autoFocusFirstInput
                drawerProps={{
                    destroyOnClose: true,
                }}
                submitTimeout={2000}
                onFinish={async (values) => {
                    console.log(values.name);
                    message.success('Berhasil disimpan');
                    return true;
                }}
            >
                {selectedNode && (
                    <ProForm.Group>
                        <ProFormText
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                            width="md"
                            name="title"
                            label="Title"
                            placeholder="Title..."
                            initialValue={selectedNode.data.title}
                        />
                        <ProFormSelect
                            width={"md"}
                            showSearch
                            name={'perangkat'}
                            label={'Perangkat'}
                            placeholder={'Pilih yang terbaik!'}
                            initialValue={selectedNode.data.perangkat}
                            // rules={[
                            //     {
                            //         required: true,
                            //         message: 'Status harus diisi!',
                            //     },
                            // ]}
                            options={[
                                { label: 'Device 1', value: 1 },
                                { label: 'Device Dua', value: 2 },
                                { label: 'Device 3', value: 3 },
                                { label: 'Device Empat', value: 4 },
                                { label: 'Device Full', value: 5 },
                            ]}
                        />
                        {/* <ProFormSelect
                            width={"md"}
                            showSearch
                            name={'idperangkat'}
                            label={'Label'}
                            placeholder={'Pipih yang terbaik!'}
                            rules={[
                                {
                                    required: true,
                                    message: 'Status harus diisi!',
                                },
                            ]}
                            options={[
                                { label: 'All', value: 0 },
                                { label: 'Open', value: 1 },
                                { label: 'Closed', value: 2 },
                                { label: 'Processing', value: 3 },
                            ]}
                        /> */}
                    </ProForm.Group>
                )}
            </DrawerForm>
        </div>
    );
};

const Editor = () => {
    return (
        <PageContainer>
            <FlowEditorProvider>
                <ProFlowDemo />
            </FlowEditorProvider>
        </PageContainer>
    );
};

export default Editor;
