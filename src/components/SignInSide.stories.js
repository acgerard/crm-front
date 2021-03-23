import React from 'react';

import SignInSide from "./SignInSide";

export default {
    title: 'Common/SignIn',
    component: SignInSide,
    argTypes: {
        handleSignIn: {action: "handleSignIn"}
    }
};

const Template = (args) => <SignInSide {...args}/>;

export const Default = Template.bind({});
Default.args = {
};
