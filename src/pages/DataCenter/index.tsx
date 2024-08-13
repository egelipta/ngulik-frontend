import { ActionType, PageContainer, ProColumnType, ProTable } from '@ant-design/pro-components';
import React, { memo, useRef, useState } from 'react';
import { rackServerListApiV1RackServerRackServerGet } from '@/services/pjvms/rackServer';
import { Button, Empty } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import AddRackServer from './Components/add-rack-server'

export default memo(() => {
    const actionRef = useRef<ActionType>();
    const [addRackServer, setAddRackServer] = useState(false);



    const columns: ProColumnType<API.RackServerItem>[] = [
        {
            title: 'Nama',
            dataIndex: 'name',
        },
        {
            title: 'Lebar',
            dataIndex: 'width',
            hideInSearch: true,
        },
        {
            title: 'Tinggi',
            dataIndex: 'height',
            hideInSearch: true,
        },
        {
            title: 'Panjang',
            dataIndex: 'depth',
            hideInSearch: true,
        },
        // {
        //   title: 'Actionable',
        //   valueType: 'option',
        //   width: 200,
        //   render: (_dom, d) => {
        //     return [
        //       <Button
        //         key={'edit'}
        //         type="dashed"
        //         shape="round"
        //         onClick={() => {
        //           setDataKoneksi(d);
        //           setEditVisible(true);
        //           getPerangkatOption();
        //         }}
        //       >
        //         Ubah
        //       </Button>,
        //       <Popconfirm
        //         key={'delete'}
        //         title="Anda yakin?"
        //         onConfirm={() => deleteData(d)}
        //         placement="leftTop"
        //       >
        //         <Button danger type="primary" shape="default">
        //           <DeleteOutlined />
        //         </Button>
        //       </Popconfirm>,
        //     ];
        //   },
        // },
    ];


    return (
        <PageContainer>
            <ProTable
                bordered
                headerTitle=""
                actionRef={actionRef}
                columns={columns}
                defaultSize='small'
                cardProps={{ bodyStyle: { paddingBottom: 20, paddingTop: 0 } }}
                pagination={{ defaultPageSize: 10, showSizeChanger: true }}
                locale={{ emptyText: <Empty /> }}
                request={async (params) => rackServerListApiV1RackServerRackServerGet({ ...params })}
                toolBarRender={() => [
                    <Button
                        key="add_data"
                        type="primary"
                        onClick={() => {
                            setAddRackServer(true);
                            // getPerangkatOption();
                        }}
                    >
                        <PlusOutlined />
                        Tambah
                    </Button>,
                ]}
            />

            <AddRackServer
                visible={addRackServer}
                setVisible={setAddRackServer}
                actionRef={actionRef}
            />
        </PageContainer>
    );
});