import { Theme, alpha } from '@mui/material/styles';
import { listClasses } from '@mui/material/List';
import { paperClasses } from '@mui/material/Paper';
import { buttonClasses } from '@mui/material/Button';
import { listItemIconClasses } from '@mui/material/ListItemIcon';
import { tablePaginationClasses } from '@mui/material/TablePagination';
import { paper } from '../../css';

export function dataGrid(theme: Theme) {
  const paperStyles = paper({ theme, dropdown: true });

  return {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          borderWidth: 0,
          [`& .${tablePaginationClasses.root}`]: {
            borderTop: 0,
          },
          [`& .${tablePaginationClasses.toolbar}`]: {
            height: 'auto',
          },
        },
        cell: {
          borderBottom: `1.2px dashed ${theme.palette.divider}`,
        },
        selectedRowCount: {
          whiteSpace: 'nowrap',
        },
        columnSeparator: {
          color: theme.palette.divider,
        },
        toolbarContainer: {
          padding: theme.spacing(1.8),
          borderBottom: `1.2px dashed ${theme.palette.divider}`,
          backgroundColor: theme.palette.background.neutral,
        },
        paper: {
          ...paperStyles,
          padding: 0,
        },
        menu: {
          [`& .${paperClasses.root}`]: {
            ...paperStyles,
          },
          [`& .${listClasses.root}`]: {
            padding: 0,
            [`& .${listItemIconClasses.root}`]: {
              minWidth: 0,
              marginRight: theme.spacing(1.8),
            },
          },
        },
        columnHeaders: {
          borderRadius: 0,
          backgroundColor: theme.palette.background.neutral,
        },
        panelHeader: {
          padding: theme.spacing(1.8),
        },
        panelFooter: {
          padding: theme.spacing(1.8),
          justifyContent: 'flex-end',
          borderTop: `dashed 1.2px ${theme.palette.divider}`,
          [`& .${buttonClasses.root}`]: {
            '&:first-of-type': {
              border: `solid 1.2px ${alpha(theme.palette.grey[500], 0.26)}`,
            },
            '&:last-of-type': {
              marginLeft: theme.spacing(1.2),
              color: theme.palette.background.paper,
              backgroundColor: theme.palette.text.primary,
            },
          },
        },
        filterForm: {
          padding: theme.spacing(1.8),
        },
        filterFormValueInput: {
          marginLeft: theme.spacing(1.8),
        },
        filterFormColumnInput: {
          marginLeft: theme.spacing(1.8),
        },
        filterFormOperatorInput: {
          marginLeft: theme.spacing(1.8),
        },
      },
    },
  };
}
