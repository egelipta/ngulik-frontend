import React, { memo, useEffect, useState, useRef } from 'react';
import { ActionType, ModalForm, PageContainer, ProColumns, ProFormDateTimePicker, ProFormGroup, ProFormText, ProTable } from '@ant-design/pro-components';
import {
    projectApiV1TugasTugasProjectGet,
    dataSubprojectApiV1TugasTugasDataSubprojectGet,
    tugasAddApiV1TugasTugasPost,
    hapusDataApiV1TugasTugasHapusDataDelete,
    tugasUpdateApiV1TugasTugasUpdatePut
} from '@/services/pjvms/tugas'
import { Button, Input, Popconfirm, Progress, Space, Tooltip, message } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { FormattedMessage, useIntl } from '@umijs/max';

export default memo(() => {
    const intl = useIntl();
    const actionRef = useRef<ActionType>();
    const [dataProject, setDataProject] = useState([]);
    const [dataUpdateProject, setDataUpdateProject] = useState<any>([]);
    const [dataSubProject, setDataSubProject] = useState([]);
    const [expandedRowKey, setExpandedRowKey] = useState<string | number | undefined>(undefined);
    const [visibleProject, setVisibleProject] = useState(false);
    const [visibleEditProject, setVisibleEditProject] = useState(false);
    const [visibleSubProject, setVisibleSubProject] = useState(false);
    const [searchText, setSearchText] = useState('');

    const [projectId, setProjectId] = useState<string | number | undefined>(undefined); // State untuk menyimpan projectId

    const getDataProject = async () => {
        try {
            const response = await projectApiV1TugasTugasProjectGet();
            setDataProject(response);
            setDataUpdateProject(response);
        } catch (error) {
            console.error('Error fetching dataProject:', error);
        }
    };

    const getDataSubProject = async (value: API.dataSubprojectApiV1TugasTugasDataSubprojectGetParams) => {
        try {
            const response = await dataSubprojectApiV1TugasTugasDataSubprojectGet(value);
            setDataSubProject(response);
        } catch (error) {
            console.error('Error fetching dataSubProject:', error);
        }
    };

    const createProject = async (values: API.CreateTugas) => {
        values.tipe = 'project';
        values.project = '0';
        values.progress = 0;
        values.dependencies = '0';
        const result = await tugasAddApiV1TugasTugasPost(values);
        if (result.code === 200) {
            setVisibleProject(false);
            getDataProject();//refresh table jika berhasil tambah data
            message.success(result.message);
            actionRef.current?.reload();
        } else {
            message.error(result.message);
        }
    };

    const createSubProject = async (values: API.CreateTugas) => {
        values.tipe = 'task';
        values.project = `${projectId}`;
        values.progress = 0;
        values.dependencies = '0';
        const result = await tugasAddApiV1TugasTugasPost(values);
        if (result.code === 200) {
            setVisibleSubProject(false);
            getDataSubProject({ id: projectId });
            getDataProject();
            message.success(result.message);
            actionRef.current?.reload();
        } else {
            message.error(result.message);
        }
    };

    // HAPUS DATA PROJECT
    const deleteProject = async (value: API.hapusDataApiV1TugasTugasHapusDataDeleteParams) => {
        const result = await hapusDataApiV1TugasTugasHapusDataDelete({ id: value.id });
        if (result.code === 200) {
            // refresh the list
            getDataProject();
            message.success(result.message);
        } else {
            message.error(result.message);
        }
    };

    console.table(dataUpdateProject)

    const updateProject = async (value: API.UpdateTugas) => {
        if (dataUpdateProject) {
            value.id = dataUpdateProject.id;
            value.progress = 0;
            value.tipe = dataUpdateProject.tipe;
            value.project = '0';
            value.dependencies = '0';
            const result = await tugasUpdateApiV1TugasTugasUpdatePut(value);
            if (result.code === 200) {
                setVisibleEditProject(false);
                getDataProject();
                message.success(result.message);
            } else {
                message.error(result.message);
            }
        }
    };



    useEffect(() => {
        getDataProject();
    }, []);

    const columns: ProColumns[] = [
        {
            title: <FormattedMessage id="pages.gantt-task.name" />,
            dataIndex: 'name',
        },
        {
            title: <FormattedMessage id="pages.gantt-task.start" />,
            dataIndex: 'start',
            valueType: 'date'
        },
        {
            title: <FormattedMessage id="pages.gantt-task.end" />,
            dataIndex: 'end',
            valueType: 'date'
        },
        {
            title: <FormattedMessage id="pages.gantt-task.progress" />,
            dataIndex: 'progress',
            render: (_dom: React.ReactNode, entity: any) => (
                <Progress percent={entity.progress} status="active" strokeColor={{ from: '#108ee9', to: '#87d068' }} />
            ),
        },
        {
            title: 'Actionable',
            valueType: 'option',
            width: 200,
            render: (_dom, d) => {
                return [
                    <Space>
                        <Tooltip title="Tambah Sub Project">
                            <Button
                                size='small'
                                key={'add-sub-project'}
                                type='primary'
                                onClick={() => {
                                    setVisibleSubProject(true)
                                    console.log('DATA: ', d.id)
                                    setProjectId(d.id);
                                }}
                            >
                                <PlusOutlined />
                            </Button>
                        </Tooltip>
                        <Button
                            size='small'
                            key={'edit'}
                            onClick={() => {
                                setVisibleEditProject(true)
                                console.log('DATA: ', d)
                                setDataUpdateProject(d)
                            }}
                        >
                            <EditOutlined />
                        </Button>
                        <Popconfirm
                            key={'delete'}
                            title={[
                                <p>Dengan menghapus data ini<br /> anda akan menghapus data <br /> Sub Project juga.<br /> Anda yakin?</p>
                            ]}
                            onConfirm={() => deleteProject(d)}
                            placement="leftTop"
                        >
                            <Button size='small' danger type="primary" shape="default">
                                <DeleteOutlined />
                            </Button>
                        </Popconfirm>
                    </Space>
                ];
            },
        },

    ];

    const searchData = dataProject.filter((item: any) =>
        (item.name && item.name.toLowerCase().includes(searchText.toLowerCase())) ||
        (item.start && item.start.toString().includes(searchText)) ||
        (item.end && item.end.toString().includes(searchText))
        // (typeof item.user_status === 'string' && item.user_status.toLowerCase().includes(searchText.toLowerCase()))
    );

    const expandedRowRender = () => {
        // if (dataSubProject.length === 0) {
        //     return <ProTable
        //         search={false}
        //         options={false}
        //     />
        // }

        return (
            <ProTable
                columns={[
                    { title: 'Sub Project', dataIndex: 'name' },
                    { title: 'Start', dataIndex: 'start', valueType: 'date' },
                    { title: 'End', dataIndex: 'end', valueType: 'date' },
                    {
                        title: 'Progress',
                        dataIndex: 'progress',
                        key: 'progress',
                        render: (_dom: React.ReactNode, entity: any) => (
                            <Progress percent={entity.progress} steps={10} />
                        ),
                    },
                ]}
                headerTitle={false}
                search={false}
                options={false}
                dataSource={dataSubProject}
                pagination={false}
            />
        );
    };

    return (
        <PageContainer>
            <ProTable
                actionRef={actionRef}
                defaultSize='small'
                columns={columns}
                dataSource={searchData}
                rowKey="id"
                pagination={{
                    defaultPageSize: 10,
                    showSizeChanger: true,
                    pageSizeOptions: ['10', '25', '50', '100'],
                }}
                expandable={{
                    onExpand: (expanded, record) => {
                        if (expanded) {
                            setExpandedRowKey(record.id);
                            getDataSubProject({ id: record.id });
                        } else {
                            setExpandedRowKey(undefined);
                            setDataSubProject([]);
                        }
                    },
                    expandedRowRender: expandedRowRender,
                    expandedRowKeys: expandedRowKey ? [expandedRowKey] : undefined,
                }}
                search={false}
                dateFormatter="string"
                headerTitle={intl.formatMessage({ id: 'pages.gantt-task.all' })}
                toolBarRender={() => [
                    <Space>
                        <Input.Search
                            placeholder={intl.formatMessage({ id: 'pages.gantt-task.search' })}
                            allowClear
                            enterButton
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                        <Button type='primary'
                            onClick={() => setVisibleProject(true)}
                        >
                            <PlusOutlined />
                            <FormattedMessage id="pages.gantt-task.add" />
                        </Button>
                    </Space>
                ]}
            />

            <ModalForm
                title="Add Data"
                open={visibleProject}
                width={500}
                labelAlign="right"
                layout="vertical"
                submitter={{ searchConfig: { submitText: 'Simpan', resetText: 'Batal' } }}
                onFinish={createProject}
                modalProps={{
                    destroyOnClose: true,
                    mask: true,
                    okButtonProps: { disabled: true, 'aria-disabled': true },
                    cancelButtonProps: { 'aria-disabled': true },
                    onCancel: () => setVisibleProject(false),
                }}
            >
                <ProFormText
                    name="name"
                    label="Proyek"
                    placeholder="Masukkan nama proyek"
                    width="lg"
                />
                <ProFormGroup>
                    <ProFormDateTimePicker
                        name="start"
                        label="Mulai"
                        width="lg"
                    />
                    <ProFormDateTimePicker
                        name="end"
                        label="Selesai"
                        width="lg"
                    />
                </ProFormGroup>
            </ModalForm>


            <ModalForm
                title="Add Data"
                open={visibleSubProject}
                width={500}
                labelAlign="right"
                layout="vertical"
                submitter={{ searchConfig: { submitText: 'Simpan', resetText: 'Batal' } }}
                onFinish={createSubProject}
                modalProps={{
                    destroyOnClose: true,
                    mask: true,
                    okButtonProps: { disabled: true, 'aria-disabled': true },
                    cancelButtonProps: { 'aria-disabled': true },
                    onCancel: () => setVisibleSubProject(false),
                }}
            >
                <ProFormText
                    name="name"
                    label="Proyek"
                    placeholder="Masukkan nama proyek"
                    width="lg"
                />
                <ProFormGroup>
                    <ProFormDateTimePicker
                        name="start"
                        label="Mulai"
                        width="lg"
                    />
                    <ProFormDateTimePicker
                        name="end"
                        label="Selesai"
                        width="lg"
                    />
                </ProFormGroup>
            </ModalForm>


            <ModalForm
                initialValues={dataUpdateProject}
                title="Update Data"
                open={visibleEditProject}
                width={500}
                labelAlign="right"
                layout="vertical"
                submitter={{ searchConfig: { submitText: 'Simpan', resetText: 'Batal' } }}
                onFinish={updateProject}
                modalProps={{
                    destroyOnClose: true,
                    mask: true,
                    okButtonProps: { disabled: true, 'aria-disabled': true },
                    cancelButtonProps: { 'aria-disabled': true },
                    onCancel: () => setVisibleEditProject(false),
                }}
            >
                <ProFormText
                    name="name"
                    label="Proyek"
                    placeholder="Masukkan nama proyek"
                    width="lg"
                />
                <ProFormGroup>
                    <ProFormDateTimePicker
                        name="start"
                        label="Mulai"
                        width="lg"
                    />
                    <ProFormDateTimePicker
                        name="end"
                        label="Selesai"
                        width="lg"
                    />
                </ProFormGroup>
            </ModalForm>
        </PageContainer>
    );
});
