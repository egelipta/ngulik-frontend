import {
  createRoleApiV1AdminRolePost,
  deleteRoleApiV1AdminRoleDelete,
  getAllRoleApiV1AdminRoleGet,
  updateRoleApiV1AdminRolePut,
} from '@/services/pjvms/roleManagement';
import { PlusOutlined } from '@ant-design/icons';
import {
  DrawerForm,
  ModalForm,
  ProForm,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumnType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { history } from '@umijs/max';
import { Button, Dropdown, Empty, MenuProps, Popconfirm, Space, message } from 'antd';
import moment from 'moment';
import { memo, useRef, useState } from 'react';

export default memo(() => {
  const actionRef = useRef<ActionType>();
  const [addVisible, setAddVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [RoleData, setRoleData] = useState<API.RoleItem>();

  // 创建角色
  const createRole = async (values: API.CreateRole) => {
    const result = await createRoleApiV1AdminRolePost(values);
    if (result.code === 200) {
      // 关闭窗口
      setAddVisible(false);
      // 刷新列表
      actionRef.current?.reload();
      message.success(result.message);
    } else {
      message.success(result.message);
    }
  };

  // 删除角色
  const deleteRole = async (d: API.RoleItem) => {
    const result = await deleteRoleApiV1AdminRoleDelete({ role_id: d.id });
    if (result.code === 200) {
      // 刷新列表
      actionRef.current?.reload();
      message.success(result.message);
    } else {
      message.success(result.message);
    }
  };

  // 修改角色
  const updateRole = async (d: API.UpdateRole) => {
    if (RoleData) {
      d.id = RoleData.id;
      const result = await updateRoleApiV1AdminRolePut(d);
      if (result.code === 200) {
        // 刷新列表
        actionRef.current?.reload();
        setEditVisible(false);
        message.success(result.message);
      } else {
        message.success(result.message);
      }
    }
  };

  // 修改角色状态
  const changeRoleStatus = async (d: API.RoleItem) => {
    d.role_status = !d.role_status;
    const result = await updateRoleApiV1AdminRolePut(d);
    if (result.code === 200) {
      // 刷新列表
      actionRef.current?.reload();
      message.success(result.message);
    } else {
      message.success(result.message);
    }
  };

  // column role
  const columns: ProColumnType<API.RoleItem>[] = [
    {
      title: 'Nama',
      tooltip: 'Nama Peran',
      dataIndex: 'role_name',
      valueType: 'text',
    },
    {
      title: 'Deskripsi',
      dataIndex: 'role_desc',
      valueType: 'text',
      search: false,
    },
    {
      title: 'Dibuat',
      tooltip: 'Waktu Pembuatan',
      dataIndex: 'create_time',
      // valueType: 'dateTime',
      width: 150,
      search: false,
      render: (_, r) => <p>{moment(r.create_time).locale('id-ID').format('DD MMMM, YYYY')}</p>,
    },
    {
      title: 'Status',
      dataIndex: 'role_status',
      width: 100,
      valueEnum: {
        false: { text: 'disabled', status: 'Error' },
        true: { text: 'enabled', status: 'Success' },
      },
    },
    {
      title: 'Opsi',
      valueType: 'option',
      width: 200,
      render: (_, r: API.RoleItem) => {
        // <a
        //   style={{ marginRight: 10 }}
        //   key="tambah"
        //   onClick={() => {
        //     setClickedRecord(record);
        //     console.log("Data record :",clickedRecord.id)
        //     setAddAnakRenstraVisible(true);
        //   }}
        //   hidden={!hasPermission('renstra_add')}
        // >
        //   Tambah
        // </a>,

        // <a
        //   key="hapus"
        //   title="Anda yakin?"
        //   // placement="leftTop"
        //   onClick={() => {
        //     setNamaRenstra(record);
        //     setHapusWarning(true);
        //   }}
        //   hidden={!hasPermission('renstra_delete')}
        // >
        //   Hapus
        // </a>,

        const items: MenuProps['items'] = [
          {
            label: (
              <a onClick={() => changeRoleStatus(r)}>{r.role_status ? 'Disable' : 'Enable'}</a>
            ),
            key: 'enable-disable',
          },
          {
            label: (
              <a
                onClick={() => {
                  setRoleData(r);
                  console.log(r);
                  history.push({ pathname: '/admin/set/access' }, r);
                }}
              >
                Akses
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
                  setRoleData(r);
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
                onConfirm={() => deleteRole(r)}
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
          <Dropdown menu={{ items }} trigger={['hover']}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>...</Space>
            </a>
          </Dropdown>
        );
      },
      // render: (_dom, d) => {
      //   return [
      //     <Button
      //       key={'disable'}
      //       type={d.role_status ? 'default' : 'primary'}
      //       ghost
      //       shape="round"
      //       danger={d.role_status}
      //       onClick={() => changeRoleStatus(d)}
      //     >
      //       {d.role_status ? 'Disable' : 'Enable'}
      //     </Button>,
      //     <Button
      //       key={'set_access'}
      //       // onClick={() => {history.push({ pathname: '/admin/set/access'}, d)})}
      //       onClick={() => {
      //         // setRoleData(d);
      //         // console.log(d);
      //         history.push({ pathname: '/admin/set/access' }, d);
      //       }}
      //       // onClick={() => history.push({ pathname: '/admin/set/access' })}
      //       type="primary"
      //       shape="round"
      //     >
      //       Akses
      //     </Button>,
      //     <Button
      //       key={'edit'}
      //       type="dashed"
      //       shape="round"
      //       onClick={() => {
      //         setRoleData(d);
      //         setEditVisible(true);
      //       }}
      //     >
      //       Ubah
      //     </Button>,
      //     <Popconfirm
      //       key={'delete'}
      //       title="Anda yakin?"
      //       onConfirm={() => deleteRole(d)}
      //       placement="leftTop"
      //       okText="Hapus"
      //       cancelText="Batal"
      //     >
      //       <Button type="dashed" shape="round">
      //         Hapus
      //       </Button>
      //     </Popconfirm>,
      //   ];
      // },
    },
  ];

  return (
    <PageContainer>
      <ProTable
        headerTitle="Semua Data"
        actionRef={actionRef}
        columns={columns}
        size="small"
        cardProps={{ bodyStyle: { paddingBottom: 20, paddingTop: 0 } }}
        pagination={{ defaultPageSize: 10, showSizeChanger: true }}
        locale={{ emptyText: <Empty /> }}
        request={async (params) => getAllRoleApiV1AdminRoleGet({ ...params })}
        toolBarRender={() => [
          <Button key="add_user" type="primary" onClick={() => setAddVisible(true)}>
            <PlusOutlined />
            Tambah
          </Button>,
        ]}
      />
      <ModalForm
        title={'Tambah Peran'}
        open={addVisible}
        width={500}
        submitter={{ searchConfig: { resetText: 'Batal', submitText: 'Simpan' } }}
        onFinish={createRole}
        modalProps={{
          destroyOnClose: true,
          mask: true,
          onCancel: () => setAddVisible(false),
        }}
      >
        <ProForm.Item>
          <ProFormText
            name={'role_name'}
            label={'Nama'}
            placeholder={'Nama terdiri dari 3-10 karakter!'}
            rules={[
              {
                required: true,
                message: 'Masukkan nama!',
              },
              {
                min: 3,
                message: 'Nama terdiri dari 3-10 karakter!',
              },
              {
                max: 15,
                message: 'Nama terdiri dari 3-10 karakter!',
              },
            ]}
          />
        </ProForm.Item>
        <ProFormSwitch
          label={'Tidak diaktifkan secara default'}
          name={'role_status'}
          initialValue={false}
        />
        <ProForm.Item label="Deskripsi">
          <ProFormTextArea
            name="role_desc"
            fieldProps={{ maxLength: 30, showCount: true }}
            rules={[{ max: 30, message: 'Panjang deskripsi maksimal 30 karakter!' }]}
            placeholder={'Masukkan Deskripsi...'}
          />
        </ProForm.Item>
      </ModalForm>
      <DrawerForm
        title={'Ubah Peran'}
        open={editVisible}
        width={500}
        submitter={{ searchConfig: { resetText: 'Batal', submitText: 'Ubah' } }}
        initialValues={RoleData}
        onFinish={updateRole}
        drawerProps={{
          destroyOnClose: true,
          mask: true,
          onClose: () => setEditVisible(false),
        }}
      >
        <ProForm.Item>
          <ProFormText
            name={'role_name'}
            label={'Nama'}
            placeholder={'Nama terdiri dari 3-10 karakter!'}
            rules={[
              {
                required: true,
                message: 'Masukkan Nama!',
              },
              {
                min: 3,
                message: 'Nama terdiri dari 3-10 karakter!',
              },
              {
                max: 15,
                message: 'Nama terdiri dari 3-10 karakter!',
              },
            ]}
          />
        </ProForm.Item>
        <ProFormSwitch
          label={'Tidak diaktifkan secara default'}
          name={'role_status'}
          initialValue={false}
        />
        <ProForm.Item label="Deskripsi">
          <ProFormTextArea
            name="role_desc"
            fieldProps={{ maxLength: 30, showCount: true }}
            rules={[{ max: 30, message: 'Panjang deskripsi maksimal 30 karakter!' }]}
            placeholder={'Masukkan Deskripsi...'}
          />
        </ProForm.Item>
      </DrawerForm>
    </PageContainer>
  );
});
