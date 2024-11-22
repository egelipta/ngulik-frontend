import ProCard from '@ant-design/pro-card';
import React, { memo } from 'react';

const Image = memo(() => {

    return (
        <ProCard
            bordered
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
            }}
        >
            <img src="https://randomuser.me/api/portraits/men/14.jpg" alt="image" height={150} width={150} />
        </ProCard>

    );
});

export default Image;
