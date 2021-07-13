import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import FolderfulForm from './FolderfulForm'

describe(`FolderfulForm component`, () => {
  const props = {
    className: 'test-class-name',
    children: <p>test children</p>,
    'data-other': 'test-other-prop'
  }

  it('renders a form.FolderfulForm by default', () => {
    const wrapper = shallow(<FolderfulForm />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('renders the FolderfulForm given props', () => {
    const wrapper = shallow(<FolderfulForm {...props} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
