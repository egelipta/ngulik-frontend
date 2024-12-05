import React from 'react';
import FormGauge from './form-gauge';
import FormLine from './form-line';
import FormLiquid from './form-liquid';
import FormRing from './form-ring';
import FormPie from './form-pie';

interface RenderFormProps {
    type: string | undefined;
    config: any;
    handleChange: (field: string, value: any, index?: number) => void;
}

export const renderForm = ({ type, config, handleChange }: RenderFormProps) => {
    switch (type) {
        case 'ChartGauge':
            return <FormGauge config={config} handleChange={handleChange} />;
        case 'ChartLine':
            return <FormLine config={config} handleChange={handleChange} />;
        case 'ChartLiquid':
            return <FormLiquid config={config} handleChange={handleChange} />;
        case 'ChartRing':
            return <FormRing config={config} handleChange={handleChange} />;
        case 'ChartPie':
            return <FormPie config={config} handleChange={handleChange} />;
        default:
            return null;
    }
};
