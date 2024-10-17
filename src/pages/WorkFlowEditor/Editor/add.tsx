import { useEffect, useState } from 'react';
import { Background, BackgroundVariant, FlowEditor, FlowEditorProvider, FlowPanel, useFlowEditor } from '@ant-design/pro-flow';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { DeleteOutlined } from '@ant-design/icons';
import useStyles from '../css/styles';
import { useCallback } from 'react';
import { Button, Input, message, Space } from 'antd';
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

import { workfloweditorAddApiV1WorkfloweditorWorkfloweditorAddDataPost } from '@/services/pjvms/workflowEditor';
import { useNavigate } from 'react-router-dom';

// let id = 0;
const getId = () => `${Math.floor(new Date().getTime() / 1000)}`;

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
};

const ProFlowDemo = () => {
    const editor = useFlowEditor();
    const { styles } = useStyles();
    const [name, setName] = useState('');
    const navigate = useNavigate(); // Menggunakan useNavigate untuk navigasi


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

    const createData = async (values: API.CreateWorkflowEditor) => {
        try {
            const result = await workfloweditorAddApiV1WorkfloweditorWorkfloweditorAddDataPost(values);
            return result; // Pastikan mengembalikan hasil respons API
        } catch (error) {
            console.error('Error during API call:', error);
            throw error;
        }
    };


    const saveData = useCallback(async () => {
        if (!editor) return;

        const workflowName = name.trim() === '' ? 'Untitled' : name;

        const nodes = editor.reactflow?.getNodes();
        if (!nodes || nodes.length === 0) {
            message.warning('Tidak ada node yang ditemukan untuk disimpan.');
            return;
        }

        const edges = editor.reactflow?.getEdges();
        if (!edges || edges.length === 0) {
            message.warning('Tidak ada edge yang ditemukan untuk disimpan.');
            return;
        }

        // Persiapkan data yang akan dikirim sesuai format yang diharapkan oleh backend
        const strukturData = {
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

        console.log('Saved Data:', strukturData);

        try {
            const result = await createData(strukturData);
            if (result && result.code === 200) {
                message.success('Data berhasil disimpan.');
                navigate('/workflow-editor')
            } else {
                message.error(result?.message || 'Gagal menyimpan data.');
            }
        } catch (error) {
            console.error('Kesalahan saat menyimpan data:', error);
            message.error('Terjadi kesalahan saat menyimpan data. Silakan coba lagi.');
        }
    }, [editor, name, createData]);


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
                    defaultEdgeOptions: {
                        type: 'smoothstep',
                        animated: true,
                        style: { strokeWidth: 3 },
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
                            />
                            <Space>
                                <Button
                                    danger
                                    type="primary"
                                    size="small"
                                    onClick={() => {
                                        editor.getSelectedKeys().forEach((id) => {
                                            editor.deleteNode(id);
                                        });
                                    }}
                                >
                                    Node <DeleteOutlined />
                                </Button>
                                <Button
                                    danger
                                    type="primary"
                                    size="small"
                                    onClick={() => {
                                        editor.getSelectedKeys().forEach((id) => {
                                            editor.deleteEdge(id);
                                        });
                                    }}
                                >
                                    Edge <DeleteOutlined />
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
        </div>
    );
};

const AddData = () => {
    return (
        <PageContainer>
            <FlowEditorProvider>
                <ProFlowDemo />
            </FlowEditorProvider>
        </PageContainer>
    );
};

export default AddData;
