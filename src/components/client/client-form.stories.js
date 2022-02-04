import React from 'react'

import { ClientForm } from './client-form'
import { AddressWithValues } from './address-form.stories'

export default {
  title: 'Client/Client Form',
  component: ClientForm,
  argTypes: {
    update: { action: 'update' },
  },
}

const Template = args => <ClientForm {...args} />

export const Default = Template.bind({})
Default.args = {
  client: {
    title: 'Mr',
    name: { first: 'Tony', last: 'Stark' },
    address: {
      pro: { ...AddressWithValues },
      perso: { ...AddressWithValues },
    },
  },
}
