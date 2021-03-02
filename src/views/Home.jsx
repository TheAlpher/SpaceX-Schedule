import React from "react";
import Header from "components/Header/Header";
import SubHeader from "components/SubHeader/SubHeader";
import Table from "components/Table/Table";
import PaginationHOC from "components/Pagination/Pagination";
import TableContextProvider from "context/TableContextProvider";
export default function Home() {
  return (
    <div>
      <TableContextProvider>
        <Header />
        <SubHeader />
        <Table />
        <PaginationHOC />
      </TableContextProvider>{" "}
    </div>
  );
}
