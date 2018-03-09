import React from 'react';
import TextArea from './TextArea';
import ContactBar from "./ContactBar";


const DashboardPage = () => (
        <div className={'box-layout__dashboard'}>
          <ContactBar/>
            <TextArea/>
        </div>



);

export default DashboardPage;