import React from 'react'

import { AddressForm } from './address-form'

export default {
  title: 'Client Subform/Address Form',
  component: AddressForm,
  argTypes: {
    update: { action: 'update' },
  },
}

const Template = args => <AddressForm {...args} />

export const AddressWithValues = Template.bind({})
AddressWithValues.args = {
  label: 'Personal Address',
  description: '1 rue de test',
  zipCode: '66 666',
  town: 'Ville',
  country: 'France',
}

export const AddressEmpty = Template.bind({})
AddressEmpty.args = {
  label: 'Personal Address',
  description: undefined,
  zipCode: undefined,
  town: undefined,
  country: undefined,
}
