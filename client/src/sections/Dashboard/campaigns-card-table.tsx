import { styled } from '@mui/material/styles';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Typography,
} from '@mui/material';
import TableRow from '@mui/material/TableRow';
import { tableCellClasses } from '@mui/material/TableCell';
import { fDateTime } from 'src/utils/format-time';
import { useRouter } from 'src/routes/hooks';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.black,
    backgroundColor: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function campaignData(id: string, name: string, views: number, budget: number, createdAt: Date) {
  return { id, name, views, budget, createdAt };
}

const rows = [
  campaignData('1', 'Campaign 1', 10, 100, new Date()),
  campaignData('2', 'Campaign 2', 20, 200, new Date()),
  campaignData('3', 'Campaign 3', 30, 300, new Date()),
  campaignData('4', 'Campaign 4', 40, 400, new Date()),
  campaignData('5', 'Campaign 5', 50, 500, new Date()),
];

export default function CampaignsCardTable() {
  const { push } = useRouter();

  const handleButtonClick = () => {
    push('/dashboard/campaign/id');
  };

  return (
    <>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell> Campaign Name </StyledTableCell>
              <StyledTableCell align="center">Advertisements Views</StyledTableCell>
              <StyledTableCell align="center">Budget</StyledTableCell>
              <StyledTableCell align="center">Created At </StyledTableCell>
              <StyledTableCell align="center"> </StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="center">{row.views}</StyledTableCell>
                <StyledTableCell align="center">{row.budget}</StyledTableCell>
                <StyledTableCell align="center">{fDateTime(row.createdAt)}</StyledTableCell>
                <StyledTableCell align="center">
                  <Button variant="contained" onClick={handleButtonClick}>
                    <Typography variant="body2">View</Typography>
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
