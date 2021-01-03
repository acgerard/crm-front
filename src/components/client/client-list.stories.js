import React from 'react';

import {ClientList} from "./client-list";

export default {
    title: 'Client/Client List',
    component: ClientList,
    argTypes: {
        handleSelectClient: {action: "handleSelect"}
    }
};

const Template = (args) => <ClientList {...args}/>;

export const WithClients = Template.bind({});
WithClients.args = {
    clients: [
        {
            _id: 1,
            name: {first: "Tony", last: "Stark"},
            active: true,
            company: "Stark Enterprises",
            dtcf_contact: "Nick Fury",
            country: "USA",
            comment: "Magnificent comment"
        },
        {
            _id: 2,
            name: {first: "Steven", last: "Rogers"},
            active: true,
            company: "Stark Enterprises",
            dtcf_contact: "Nick Fury",
            country: "USA",
            comment: "Magnificent comment"
        },
    ]
};

export const Empty = Template.bind({});
Empty.args = {
    clients: []
};

export const WithLongComment = Template.bind({});
WithLongComment.args = {
    clients: [
        {
            _id: 1,
            name: {first: "Tony", last: "Stark"},
            active: true,
            company: "Stark Enterprises",
            dtcf_contact: "Nick Fury",
            country: "USA",
            comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam non nunc sed elit consequat placerat sed bibendum lectus. Nulla diam magna, eleifend ac libero sed, fermentum convallis est. Aliquam sollicitudin sem eu lorem ullamcorper porttitor. Fusce sit amet lorem urna. In nulla magna, tempus vitae commodo quis, ullamcorper vitae magna. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce maximus interdum ante ac congue. Interdum et malesuada fames ac ante ipsum primis in faucibus. Phasellus efficitur erat id sapien bibendum, sed vestibulum massa commodo. Integer sit amet metus eget libero luctus lacinia. Curabitur in odio vitae ligula dignissim rutrum eu non erat. Aliquam rhoncus pretium varius. Morbi semper augue quis purus faucibus vehicula. Donec quis elit a urna hendrerit tempor. Suspendisse orci velit, interdum euismod rhoncus eu, facilisis nec dolor. "
        }
    ]
};
