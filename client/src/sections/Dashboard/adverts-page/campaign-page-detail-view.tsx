import { styled } from '@mui/material/styles';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  TableHead,
  Typography,
} from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import CampaignDetailRow from 'src/components/campaign-details-row';
import { ICampaignItem } from 'src/types/campaigns';

const rows: ICampaignItem[] = [
  {
    id: 'string',
    name: 'string',
    views: 0,
    clicks: 0,
    budget: 0,
    startDate: "Date",
    endDate: "Date",
    advertisementId: "string",
    campaignTopicsIds:"string",
  },
];

export default function CampaignPageDetailView({ id }: { id?: string }) {
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
  return (
    <TableContainer>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell> Campaign Name </StyledTableCell>
            <StyledTableCell align="center">Advertisements Views</StyledTableCell>
            <StyledTableCell align="center">Advertisement Clicks</StyledTableCell>
            <StyledTableCell align="center">Budget</StyledTableCell>
            <StyledTableCell align="center">Start Date</StyledTableCell>
            <StyledTableCell align="center">End Date</StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row) => (
            <CampaignDetailRow row={row}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
