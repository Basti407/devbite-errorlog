import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Row from './Row';

type Data = {
  id: number;
  date: any;
  level: string;
  src: string;
  status: number;
  companyId: number;
  userId: number;
  dataId: number;
  carId: number;
  protoId: number;
  portalId: number;
  msg: string;
  history: {
    date: string;
    customerId: string;
    amount: number;
  }[];
}[];

export default function CollapsibleTable(props: { data: Data }) {
  const { data } = props;
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Datum</TableCell>
            <TableCell>Level</TableCell>
            <TableCell>Quelle</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Firma</TableCell>
            <TableCell>User</TableCell>
            <TableCell>Fahrzeug ID</TableCell>
            <TableCell>Data ID</TableCell>
            <TableCell>Protokoll ID</TableCell>
            <TableCell>Portal</TableCell>
            <TableCell>Beschreibung</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
