import styled from "@emotion/styled";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const cols: GridColDef[] = [
  { field: "id", headerName: "ID" },
  { field: "date", headerName: "Datum" },
  { field: "lvl", headerName: "Level" },
  { field: "src", headerName: "Quelle" },
  { field: "status", headerName: "Status" },
  { field: "company", headerName: "Firma" },
  { field: "userCnt", headerName: "User" },
  { field: "vehicleId", headerName: "Fahrzeug ID" },
  { field: "dataId", headerName: "Data ID" },
  { field: "protocolId", headerName: "Protokoll ID" },
  { field: "portal", headerName: "Portal" },
  { field: "descr", headerName: "Kurzbeschreibung" },
];

const rows = [
  {
    id: 1,
    date: 1,
    lvl: 1,
    src: "nö",
    status: "tot",
    company: "banane",
    userCnt: 0,
    vehicleId: 0,
    dataId: 0,
    protocolId: 0,
    portal: "auch nich",
    descr: "vergiss es",
  },
];

const RootStyle = styled("div")(() => ({
  height: '100%',
}));

function DataTable() {
  return (
    <RootStyle>
      <DataGrid
        rows={rows}
        columns={cols}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </RootStyle>
  );
}

export default DataTable;
