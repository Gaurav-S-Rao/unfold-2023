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

function campaignData(name: string, advtCount: number, creditsLeft: number) {
  return { name, advtCount, creditsLeft };
}

const rows = [
  campaignData('Campaign 1', 10, 100),
  campaignData('Campaign 2', 20, 200),
  campaignData('Campaign 3', 30, 300),
  campaignData('Campaign 4', 40, 400),
  campaignData('Campaign 5', 50, 500),
];

export default function CampaignsCardTable() {
  return (
    <>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell> Campaign Name </StyledTableCell>
              <StyledTableCell align="center">Advertisements Count</StyledTableCell>
              <StyledTableCell align="center">Credits Left</StyledTableCell>
              <StyledTableCell align="center"> </StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="center">{row.advtCount}</StyledTableCell>
                <StyledTableCell align="center">{row.creditsLeft}</StyledTableCell>
                <StyledTableCell align="center">
                  <Button
                    variant="contained"
                    onClick={() => {
                      console.log('View Campaign');
                    }}
                  >
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
