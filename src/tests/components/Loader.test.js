import React from 'react';
import {shallow} from 'enzyme';
import Loader from '../../components/LoadingPage'

test("Should render Loader", ()=> {
   const wrapper = shallow(<Loader/>);
   expect(wrapper).toMatchSnapshot();
});