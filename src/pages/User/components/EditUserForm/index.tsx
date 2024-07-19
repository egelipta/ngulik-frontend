import { userUpdate } from '@/services/user/api';
import type { FormInstance } from '@ant-design/pro-form';
import { DrawerForm, ProFormSwitch, ProFormText } from '@ant-design/pro-form';
import type { ActionType } from '@ant-design/pro-table';
import { message } from 'antd';
import { memo, useRef } from 'react';

interface IProps {
  actionRef: ActionType | undefined;
  visible: boolean;
  setvisible: (e: boolean) => void;
  UserData: API.UserListItem;
}

export default memo(({ actionRef, visible, setvisible, UserData }: IProps) => {
  const formRef = useRef<FormInstance>();
  // Modify the user
  const updateUser = async (d: API.UpdateUser) => {
    d.id = UserData.id;
    try {
      console.log('Ini data init d : ', d);
      const result = await userUpdate(d);
      if (result.code === 200) {
        // refresh the list
        actionRef?.reload();
        setvisible(false);
        message.success(result.message);
      } else {
        message.info(result.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DrawerForm
      title={'Ubah Manajemen Pengguna'}
      open={visible}
      formRef={formRef}
      width={500}
      submitter={{ searchConfig: { resetText: 'Batal', submitText: 'Ubah' } }}
      initialValues={UserData}
      onFinish={updateUser}
      drawerProps={{
        destroyOnClose: true,
        mask: true,
        onClose: () => setvisible(false),
      }}
    >
      <ProFormText
        label={'Nama Lengkap'}
        name={'full_name'}
        placeholder={'Nama Lengkap'}
        rules={[
          {
            required: false,
            message: 'Masukkan nama lengkap!',
          },
          {
            min: 3,
            message: 'Nama minimal 3 karakter!',
          },
        ]}
      />
      <ProFormText
        label={'Username'}
        name={'username'}
        placeholder={'Username'}
        rules={[
          {
            required: true,
            message: 'Masukkan nama pengguna!',
          },
          {
            min: 3,
            message: 'Nama minimal 3 karakter!',
          },
        ]}
      />
      <ProFormText.Password
        label={'Password'}
        name={'password'}
        placeholder={'Masukkan password!'}
        rules={[
          {
            min: 6,
            message: 'Password minimal 6 karakter!',
          },
        ]}
      />
      <ProFormText
        name="user_phone"
        placeholder="Nomor handphone"
        label={'Nomor Handphone'}
        fieldProps={{
          addonBefore: '+62',
        }}
        rules={[
          {
            pattern: /^\d{9,15}$/,
            message: 'Format : 628...',
          },
        ]}
      />
      <ProFormSwitch label={'Status Pengguna'} tooltip={'Default: disabled'} name={'user_status'} />
      <ProFormText
        label="Email"
        name="user_email"
        // fieldProps={{ maxLength: 200, showCount: true }}
        rules={[{ max: 200, message: 'Format salah !', type: 'email' }]}
        placeholder={'Masukkan alamat email...'}
      />
      <ProFormText
        name="remarks"
        label="Posisi"
        fieldProps={{ maxLength: 200, showCount: true }}
        rules={[{ max: 200, message: 'Posisi maksimal 200 karakter!' }]}
        placeholder={'Masukkan catatan...'}
      />
    </DrawerForm>
  );
});
