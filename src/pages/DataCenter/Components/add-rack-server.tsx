import { ActionType, ModalForm, ProForm, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { message } from 'antd';
import { memo, useEffect, useState } from 'react';
import {
    rackServerAddApiV1RackServerRackServerPost,
    dataRackServerApiV1RackServerRackServerDataRackServerGet
} from '@/services/pjvms/rackServer';
interface IProps {
    visible: boolean;
    setVisible: (e: boolean) => void;
    actionRef: React.MutableRefObject<ActionType | undefined>;
}

export default memo(({ actionRef, visible, setVisible }: IProps) => {
    const [data, setData] = useState<any[]>([]);

    const getData = async () => {
        try {
            const result = await dataRackServerApiV1RackServerRackServerDataRackServerGet();
            setData(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    console.log(data);

    useEffect(() => {
        getData();
    }, []);

    const createData = async (values: API.CreateRackServer) => {
        values.width = 600;
        values.height = 1900;
        values.depth = 1200;
        values.y = 0;
        values.z = 0;
        const result = await rackServerAddApiV1RackServerRackServerPost(values);
        if (result.code === 200) {
            setVisible(false);
            actionRef.current?.reload();
            message.success(result.message);
        } else {
            message.error(result.message);
        }
    };

    // Define options
    const options = [
        { value: 700 * -9, label: 'Posisi 1' },
        { value: 700 * -7, label: 'Posisi 2' },
        { value: 700 * -5, label: 'Posisi 3' },
        { value: 700 * -3, label: 'Posisi 4' },
        { value: 700 * -1, label: 'Posisi 5' },
        { value: 700 * 1, label: 'Posisi 6' },
        { value: 700 * 3, label: 'Posisi 7' },
        { value: 700 * 5, label: 'Posisi 8' },
        { value: 700 * 7, label: 'Posisi 9' },
        { value: 700 * 9, label: 'Posisi 10' },
    ];

    // Filter options based on data.x
    const filteredOptions = options.filter(option => !data.some(item => item.x === option.value));

    return (
        <ModalForm
            title="Add Data"
            open={visible}
            width={500}
            labelAlign="right"
            layout="vertical"
            submitter={{ searchConfig: { submitText: 'Simpan', resetText: 'Batal' } }}
            onFinish={createData}
            modalProps={{
                destroyOnClose: true,
                mask: true,
                okButtonProps: { disabled: true, 'aria-disabled': true },
                cancelButtonProps: { 'aria-disabled': true },
                onCancel: () => setVisible(false),
            }}
        >
            <ProFormText
                name="name"
                label="Nama Rack"
                placeholder="Masukkan nama rack!"
                width="lg"
            />
            {/* <ProForm.Group>
                <ProFormText
                    name="width"
                    label="Lebar"
                    placeholder="Masukkan nama rack!"
                    width="xs"
                />
                <ProFormText
                    name="height"
                    label="Tinggi"
                    placeholder="Masukkan nama rack!"
                    width="xs"
                />
                <ProFormText
                    name="depth"
                    label="Panjang"
                    placeholder="Masukkan nama rack!"
                    width="xs"
                />
            </ProForm.Group> */}
            <ProFormSelect
                showSearch
                name="x"
                label="Posisi"
                options={filteredOptions}
                width="lg"
                placeholder="Pilih posisi rack!"
            />
        </ModalForm>
    );
});
