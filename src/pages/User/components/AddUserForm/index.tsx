import { userAdd } from '@/services/user/api';
import ProForm, {
  ModalForm,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import type { ActionType } from '@ant-design/pro-table';
import { message } from 'antd';
import { memo } from 'react';

interface IProps {
  actionRef: ActionType | undefined;
  visible: boolean;
  setvisible: (e: boolean) => void;
}

export default memo(({ actionRef, visible, setvisible }: IProps) => {
  // Create users
  const createUser = async (values: API.CreateUser) => {
    console.log('Init Values : ', values);
    values.user_phone = '62' + values.user_phone;
    console.log('New Values : ', values);
    try {
      const result = await userAdd(values);
      if (result.code === 200) {
        // close the window
        setvisible(false);
        // refresh the list
        actionRef?.reload();
        message.success(result.message);
      } else {
        message.info(result.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ModalForm
      title={'Tambah Manajemen Pengguna'}
      open={visible}
      width={500}
      submitter={{ searchConfig: { resetText: 'Batal', submitText: 'Simpan' } }}
      onFinish={createUser}
      modalProps={{
        destroyOnClose: true,
        mask: true,
        onCancel: () => setvisible(false),
      }}
    >
      <ProFormText
        name={'full_name'}
        label={'Nama Lengkap'}
        placeholder={'Nama lengkap'}
        rules={[
          {
            required: false,
          },
          {
            min: 3,
            message: 'Nama minimal 3 karakter!',
          },
          {
            max: 255,
            message: 'Nama maksimal 255 karakter!',
          },
        ]}
      />
      <ProForm.Group>
        <ProFormText
          name={'username'}
          label={'Username'}
          tooltip={'username digunakan untuk login ke sistem'}
          placeholder={'username'}
          rules={[
            {
              required: true,
              message: 'Masukkan nama pengguna!',
            },
            {
              min: 3,
              message: 'Nama minimal 3 karakter!',
            },
            {
              max: 255,
              message: 'Nama maksimal 255 karakter!',
            },
          ]}
        />
        <ProFormText.Password
          name={'password'}
          label={'Password'}
          placeholder={'Password'}
          rules={[
            {
              required: true,
              message: 'Masukkan password!',
            },
            {
              min: 6,
              message: 'Password minimal 6 karakter!',
            },
          ]}
        />
      </ProForm.Group>
      <ProForm.Group>
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

        <ProFormSwitch
          label={'Status Pengguna'}
          tooltip={'Default: disabled'}
          name={'user_status'}
          initialValue={false}
        />
      </ProForm.Group>
      <ProFormText
        label="Email"
        name="user_email"
        // fieldProps={{ maxLength: 200, showCount: true }}
        rules={[{ max: 200, message: 'Format salah !', type: 'email' }]}
        placeholder={'Masukkan alamat email...'}
      />

      <ProFormTextArea
        label="Posisi"
        name="remarks"
        fieldProps={{ maxLength: 200, showCount: true }}
        rules={[{ max: 200, message: 'Posisi maksimal 200 karakter!' }]}
        placeholder={'Masukkan posisi...'}
      />
    </ModalForm>
  );
});
