import React from 'react';

import {ContactForm} from "./contact-form";

export default {
    title: 'Client Subform/Contact Form',
    component: ContactForm,
    argTypes: {
        update: {action: "update"}
    }
};

const Template = (args) => <ContactForm {...args}/>;

export const WithValues = Template.bind({});
WithValues.args = {
    title: "Mr",
    firstName: "Tony",
    lastName: "Stark",
    company: "Stark Enterprises",
    proEmail: "tony.stark@starkenterprises.com",
    persoEmail: "tony.stark@gmail.com",
    phone:"0123456789",
};

export const Empty = Template.bind({});
Empty.args = {
    title: undefined,
    firstName: undefined,
    lastName: undefined,
    company: undefined,
    proEmail: undefined,
    persoEmail: undefined,
    phone: undefined,
};