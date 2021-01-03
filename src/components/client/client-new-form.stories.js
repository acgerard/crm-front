import React from 'react';

import {ClientNewForm} from "./client-new-form";

export default {
    title: 'Client/New Client Form',
    component: ClientNewForm,
    argTypes: {
        onClose: {action: "onClose"},
        handleCreate: {action: "handleCreate"}
    }
};

const Template = (args) => <ClientNewForm {...args}/>;

export const Default = Template.bind({});
Default.args = {
    open: true
};