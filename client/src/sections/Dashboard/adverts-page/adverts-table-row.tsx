import {
  Avatar,
  Box,
  Button,
  IconButton,
  Link,
  ListItemButton,
  ListItemText,
  TableCell,
  TableRow,
  Tooltip,
} from '@mui/material';
import { format } from 'date-fns';
import Iconify from 'src/components/iconify';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import { IAdvertItem } from 'src/types/adverts';

type Props = {
  row: IAdvertItem;
  selected: boolean;
  onViewRow: VoidFunction;
  onSelectRow: VoidFunction;
};

export default function AdvertsTableRow({ row, selected, onViewRow, onSelectRow }: Props) {
  const { id, title, description, image, link, category, createdAt, updatedAt } = row;

  const { push } = useRouter();

  return (
    <>
      <TableRow>
        {/* Advertisement image */}
        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar alt={title} src={image} variant="rounded" sx={{ width: 64, height: 64, mr: 2 }} />

          <ListItemText
            disableTypography
            primary={
              <Link
                noWrap
                color="inherit"
                variant="subtitle2"
                onClick={onViewRow}
                sx={{ cursor: 'pointer' }}
              >
                {title}
              </Link>
            }
            secondary={
              <Box component="div" sx={{ typography: 'body2', color: 'text.disabled' }}>
                {description}
              </Box>
            }
          />
        </TableCell>

        {/* Create at */}
        <TableCell>
          <ListItemText
            primary={format(new Date(createdAt), 'dd MMM yyyy')}
            secondary={format(new Date(createdAt), 'p')}
            primaryTypographyProps={{ typography: 'body2', noWrap: true }}
            secondaryTypographyProps={{
              mt: 0.5,
              component: 'span',
              typography: 'caption',
            }}
          />
        </TableCell>

        {/* Link */}
        <TableCell>
          <ListItemText
            primary={link}
            primaryTypographyProps={{ typography: 'body2', noWrap: true }}
            sx={{
              maxWidth: 200,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          />
        </TableCell>

        {/* CTA */}
        <TableCell>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              push(paths.dashboard.campaign.new(id));
            }}
          >
            Start Campaign
          </Button>
        </TableCell>

        {/* Actions */}
        <TableCell align="right" sx={{ pr: 1 }}>
          <Tooltip title="View More Details">
            <IconButton color="primary" onClick={onViewRow}>
              <Iconify icon="fluent:info-16-regular" width={32} height={32} />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
    </>
  );
}
