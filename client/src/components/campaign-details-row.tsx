import { styled } from '@mui/material/styles';

import { tableCellClasses } from '@mui/material/TableCell';
import { ICampaignItem } from 'src/types/campaigns';

import TableCell from '@mui/material/TableCell';

import TableRow from '@mui/material/TableRow';

type ICampaignDetailRow = {
  row: ICampaignItem;
};

export default function CampaignDetailRow({ row }: ICampaignDetailRow) {
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
    <>
      {row && <StyledTableRow key={row.name}></StyledTableRow>}
      <StyledTableCell component="th" scope="row">
        {row.name}
      </StyledTableCell>
      <StyledTableCell align="center">{row.views}</StyledTableCell>
      <StyledTableCell align="center">{row.clicks}</StyledTableCell>
      <StyledTableCell align="center">{row.budget}</StyledTableCell>
      <StyledTableCell align="center"> {row.startDate}</StyledTableCell>
      <StyledTableCell align="center">{row.endDate}</StyledTableCell>
    </>
  );
}
