import React from 'react'

import { ClientNewDialog } from './ClientNewDialog'

export default {
  title: 'Client/New Client Form',
  component: ClientNewDialog,
  argTypes: {
    onClose: { action: 'onClose' },
    handleCreate: { action: 'handleCreate' },
  },
}

const Template = args => <ClientNewDialog {...args} />

export const Default = Template.bind({})
Default.args = {
  open: true,
}
