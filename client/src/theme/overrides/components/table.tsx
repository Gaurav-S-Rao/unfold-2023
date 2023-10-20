import { Theme, alpha } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import { tableRowClasses } from '@mui/material/TableRow';

export function table(theme: Theme) {
  return {
    MuiTableContainer: {
      styleOverrides: {
        root: {
          position: 'relative',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          [`&.${tableRowClasses.selected}`]: {
            backgroundColor: alpha(theme.palette.primary.dark, 0.09),
            '&:hover': {
              backgroundColor: alpha(theme.palette.primary.dark, 0.12),
            },
          },
          '&:last-of-type': {
            [`& .${tableCellClasses.root}`]: {
              borderColor: 'transparent',
            },
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottomStyle: 'dashed',
        },
        head: {
          fontSize: 16,
          color: theme.palette.text.secondary,
          fontWeight: theme.typography.fontWeightSemiBold,
          backgroundColor: theme.palette.background.neutral,
        },
        stickyHeader: {
          backgroundColor: theme.palette.background.paper,
          backgroundImage: `linear-gradient(to bottom, ${theme.palette.background.neutral} 0%, ${theme.palette.background.neutral} 100%)`,
        },
        paddingCheckbox: {
          paddingLeft: theme.spacing(1.2),
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          width: '100%',
        },
        toolbar: {
          height: 70,
        },
        actions: {
          marginRight: 9,
        },
        select: {
          paddingLeft: 9,
          '&:focus': {
            borderRadius: theme.shape.borderRadius,
          },
        },
        selectIcon: {
          right: 6,
          width: 20,
          height: 20,
          top: 'calc(50% - 12px)',
        },
      },
    },
  };
}
