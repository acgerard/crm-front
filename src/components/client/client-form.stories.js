import React from 'react'

import { ClientForm } from './ClientForm'
import { AddressWithValues } from './AddressForm/address-form.stories'

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
