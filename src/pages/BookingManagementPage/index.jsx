import React, { useState } from 'react'
import styles from "./bookingManagementPage.module.scss";
import cls from "classnames";
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane
} from 'mdb-react-ui-kit';

function BookingManagementPage() {
  const [basicActive, setBasicActive] = useState('editPersonelInfo');

  const handleBasicClick = (value) => {
    if (value === basicActive) {
      return;
    }
    setBasicActive(value);
  };

  return (
    <section>
      <MDBTabs tab justify className={cls("container mb-3")}>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('editPersonelInfo')} active={basicActive === 'editPersonelInfo'}>
            THÔNG TIN CÁ NHÂN
          </MDBTabsLink>
        </MDBTabsItem>

        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('tab2')} active={basicActive === 'tab2'}>
            LỊCH SỬ ĐẶT VÉ
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>
      <MDBTabsContent>
        {
          <>
            <MDBTabsPane show={basicActive === 'editPersonelInfo'}>
            </MDBTabsPane>

            <MDBTabsPane show={basicActive === 'tab2'}>
              
            </MDBTabsPane>
          </>
        }
      </MDBTabsContent>
    </section>
  );
}

export default BookingManagementPage;