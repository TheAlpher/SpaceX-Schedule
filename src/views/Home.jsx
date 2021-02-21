import React from "react";
import Header from "components/Header/Header";
import SubHeader from "components/SubHeader/SubHeader";
import Table from "components/Table/Table";
import TableContextProvider from "../context/TableContextProvider";
import axios from "axios";
export default function Home(props) {
  React.useEffect(() => {
  });
  return (
    <TableContextProvider>
      <div>
        <Header />
        <SubHeader />
        <Table location={props.location} />
      </div>
    </TableContextProvider>
  );
}
