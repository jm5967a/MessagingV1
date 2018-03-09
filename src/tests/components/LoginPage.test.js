import React from 'react';
import {LoginPage} from '../../components/LoginPage';
import {shallow} from "enzyme";

test('should render login page', ()=> {
    const wrapper = shallow(<LoginPage/>);
    expect(wrapper).toMatchSnapshot()
});

test('should call startLogout on button click', ()=>{
    const startLogin = jest.fn();
    const wrapper = shallow(<LoginPage startLogin={startLogin}/>);
    wrapper.find('button').simulate('click');
    expect(startLogin).toHaveBeenCalled();
});
