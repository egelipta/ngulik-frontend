/* eslint-disable @typescript-eslint/no-unused-vars */
import { PhoneOutlined, PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumnType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, Dropdown, Empty, MenuProps, Popconfirm, Space, message } from 'antd';
import { memo, useRef, useState } from 'react';
import {
  userDelApiV1AdminUserDelete,
  userListApiV1AdminUserGet,
  userUpdateApiV1AdminUserPut,
} from '@/services/pjvms/userManagement';
import AddUserForm from './adduser';




export default memo(() => {
  const actionRef = useRef<ActionType>();
  const [addVisible, setAddVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [roleVisible, setroleVisible] = useState(false);
  const [userData, setUserData] = useState<API.UserListItem>();

  // delete users
  const deleteUser = async (d: API.UserListItem) => {
    const result = await userDelApiV1AdminUserDelete({ user_id: d.id });
    if (result.code === 200) {
      // refresh the list
      actionRef.current?.reload();
      message.success(result.message);
    } else {
      message.info(result.message);
    }
  };

  // Modify the user status
  const changeUserStatus = async (d: API.UpdateUser) => {
    d.user_status = !d.user_status;
    const result = await userUpdateApiV1AdminUserPut(d);
    if (result.code === 200) {
      // refresh the list
      actionRef.current?.reload();
      message.success(result.message);
    } else {
      message.info(result.message);
    }
  };

  // Define the header
  const columns: ProColumnType<API.UserListItem>[] = [
    // {
    //   title: 'Avatar',
    //   dataIndex: 'header_img',
    //   search: false,
    //   width: 60,
    //   render: (_, d) => <Avatar src={d.header_img} />,
    // },
    {
      title: 'Username',
      // tooltip: 'Nama Pengguna',
      dataIndex: 'username',
      valueType: 'text',
      ellipsis: true,
      // width: 150,
    },
    {
      title: 'Nama Lengkap',
      dataIndex: 'full_name',
      valueType: 'text',
      search: false,
      ellipsis: true,
    },
    {
      title: 'Handphone',
      dataIndex: 'user_phone',
      valueType: 'text',
      search: false,
      // width: 150,
      copyable: true,
      render: (_, d) => {
        let link = `https://wa.me/${d.user_phone}`;
        return (
          <>
            <PhoneOutlined />{' '}
            <a href={link} rel="noopener noreferrer" target="_blank">
              {d.user_phone}
            </a>
          </>
        );
      },
    },
    {
      title: 'Posisi',
      dataIndex: 'remarks',
      valueType: 'text',
      search: false,
      ellipsis: true,
    },
    {
      title: 'Email',
      dataIndex: 'user_email',
      valueType: 'text',
      search: false,
      ellipsis: true,
      copyable: true,
    },

    {
      title: 'Status',
      dataIndex: 'user_status',
      // width: 100,
      valueEnum: {
        false: { text: 'Disabled', status: 'Error' },
        true: { text: 'Enabled', status: 'Success' },
      },
    },
    {
      title: 'Opsi',
      valueType: 'option',
      width: 50,
      render: (_, r: API.UserListItem) => {
        const items: MenuProps['items'] = [
          // {
          //   label: (
          //     <a onClick={() => changeUserStatus(r)}>{r.user_status ? 'Disable' : 'Enable'}</a>
          //   ),
          //   key: 'enable-disable',
          // },
          {
            label: (
              <a
                onClick={() => {
                  setUserData(r);
                  setroleVisible(true);
                }}
              >
                Peran
              </a>
            ),
            key: 'peran',
          },
          {
            type: 'divider',
          },
          {
            label: (
              <a
                onClick={() => {
                  setUserData(r);
                  setEditVisible(true);
                }}
              >
                Ubah
              </a>
            ),
            key: 'ubah',
          },

          {
            label: (
              <Popconfirm
                key={'delete'}
                title="Anda yakin?"
                onConfirm={() => deleteUser(r)}
                placement="leftTop"
                okText="Hapus"
                cancelText="Batal"
              >
                <a>Hapus</a>
              </Popconfirm>
            ),
            key: 'hapus',
          },
        ];

        return (
          <Dropdown menu={{ items }} trigger={['click']}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>...</Space>
            </a>
          </Dropdown>
        );
      },
    },
  ];

  return (
    <PageContainer>
      <ProTable
        headerTitle="Semua Data"
        rowKey={'key'}
        actionRef={actionRef}
        columns={columns}
        size="small"
        cardProps={{ bodyStyle: { paddingBottom: 20, paddingTop: 0 } }}
        pagination={{ defaultPageSize: 10, showSizeChanger: true }}
        locale={{ emptyText: <Empty /> }}
        request={async (params) => userListApiV1AdminUserGet({ ...params })}
        toolBarRender={() => [
          <Button key="add_user" type="primary" onClick={() => setAddVisible(true)}>
            <PlusOutlined />
            Tambah
          </Button>,
        ]}
      />
      <AddUserForm visible={addVisible} setvisible={setAddVisible} actionRef={actionRef.current} />
      {/* {userData && (
        <EditUserForm
          visible={editVisible}
          setvisible={setEditVisible}
          actionRef={actionRef.current}
          UserData={userData}
        />
      )}
      {userData && (
        <SetRole visible={roleVisible} setvisible={setroleVisible} UserData={userData} />
      )} */}
    </PageContainer>
  );
});
