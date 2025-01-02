import React from 'react';
import FormLiquid from './form-liquid';
import FormGauge from './form-gauge';
import FormMultiLine from './form-multi-line';
import FormLine from './form-line';
import FormPie from './form-pie';
import FormColumn from './form-column';
import FormRing from './form-ring';

interface RenderFormProps {
    type: string | undefined;
    config: any;
    handleChange: (field: string, value: any, index?: number) => void;
}

export const renderForm = ({ type, config, handleChange }: RenderFormProps) => {
    switch (type) {
        case 'ChartLiquid':
            return <FormLiquid config={config} handleChange={handleChange} />;
        case 'ChartGauge':
            return <FormGauge config={config} handleChange={handleChange} />;
        case 'ChartMultiLine':
            return <FormMultiLine config={config} handleChange={handleChange} />;
        case 'ChartLine':
            return <FormLine config={config} handleChange={handleChange} />;
        case 'ChartPie':
            return <FormPie config={config} handleChange={handleChange} />;
        case 'ChartColumn':
            return <FormColumn config={config} handleChange={handleChange} />;
        case 'ChartRing':
            return <FormRing config={config} handleChange={handleChange} />;
        default:
            return null;
    }
};
