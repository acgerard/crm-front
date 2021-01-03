import React from 'react';

import {CrmInfoForm} from "./crmInfo-form";

export default {
    title: 'Client Subform/CRM Info Form',
    component: CrmInfoForm,
    argTypes: {
        update: {action: "update"}
    }
};

const Template = (args) => <CrmInfoForm {...args}/>;

export const WithValues = Template.bind({});
WithValues.args = {
    contact: "Nick Fury",
    newsletter: true,
    comment: "Comment that describes stuff",
};

export const Empty = Template.bind({});
Empty.args = {
    contact: undefined,
    newsletter: undefined,
    comment: undefined,
};