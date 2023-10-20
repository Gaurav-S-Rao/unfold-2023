import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import Stack, { StackProps } from '@mui/material/Stack';

interface Props extends StackProps {
  dense?: boolean;
  action?: React.ReactNode;
  rowCount: number;
  numSelected: number;
  onSelectAllRows: (checked: boolean) => void;
}

export default function TableSelectedAction({
  dense,
  action,
  rowCount,
  numSelected,
  onSelectAllRows,
  sx,
  ...other
}: Props) {
  if (!numSelected) {
    return null;
  }

  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        pl: 1.2,
        pr: 2.4,
        top: 0,
        left: 0,
        width: 1.2,
        zIndex: 10,
        height: 60,
        position: 'absolute',
        bgcolor: 'primary.lighter',
        ...(dense && {
          height: 48,
        }),
        ...sx,
      }}
      {...other}
    >
      <Checkbox
        indeterminate={!!numSelected && numSelected < rowCount}
        checked={!!rowCount && numSelected === rowCount}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          onSelectAllRows(event.target.checked)
        }
      />

      <Typography
        variant="subtitle2"
        sx={{
          ml: 1.8,
          flexGrow: 1,
          color: 'primary.main',
          ...(dense && {
            ml: 2.4,
          }),
        }}
      >
        {numSelected} selected
      </Typography>

      {action && action}
    </Stack>
  );
}
