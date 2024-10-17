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

import { workfloweditorUpdateApiV1WorkfloweditorWorkfloweditorUpdateDataPut, workfloweditorApiV1WorkfloweditorWorkfloweditorGetDataGet } from '@/services/pjvms/workflowEditor';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';


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
    const navigate = useNavigate();
    const { idParam } = useParams();

    const [dataNodes, setDataNodes] = useState<any[]>([]);
    const [dataEdges, setDataEdges] = useState<any[]>([]);
    const [name, setName] = useState('');
    const [allData, setAllData] = useState();


    const getDataWorkflow = async () => {
        try {
            const result = await workfloweditorApiV1WorkfloweditorWorkfloweditorGetDataGet({ id: idParam });
            setAllData(result)

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
            });// Menggunakan useNavigate untuk navigasi
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
