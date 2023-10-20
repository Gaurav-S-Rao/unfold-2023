import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';
import TableCell from '@mui/material/TableCell';
import TableRow, { TableRowProps } from '@mui/material/TableRow';

export default function TableSkeleton({ ...other }: TableRowProps) {
  return (
    <TableRow {...other}>
      <TableCell colSpan={12}>
        <Stack spacing={3} direction="row" alignItems="center">
          <Skeleton sx={{ borderRadius: 1.4, width: 52, height: 52, flexShrink: 0 }} />
          <Skeleton sx={{ width: 1, height: 14 }} />
          <Skeleton sx={{ width: 160, height: 14 }} />
          <Skeleton sx={{ width: 180, height: 14 }} />
          <Skeleton sx={{ width: 150, height: 14 }} />
        </Stack>
      </TableCell>
    </TableRow>
  );
}
