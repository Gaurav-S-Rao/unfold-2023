import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack, { StackProps } from '@mui/material/Stack';
import Iconify from '../iconify';

type EmptyContentProps = StackProps & {
  title?: string;
  imgUrl?: string;
  filled?: boolean;
  description?: string;
  action?: React.ReactNode;
};

export default function EmptyContent({
  title,
  imgUrl,
  action,
  filled,
  description,
  sx,
  ...other
}: EmptyContentProps) {
  return (
    <Stack
      flexGrow={1}
      alignItems="center"
      justifyContent="center"
      sx={{
        px: 3,
        height: 1,
        ...(filled && {
          borderRadius: 2,
          bgcolor: (theme) => alpha(theme.palette.grey[500], 0.08),
          border: (theme) => `solid 1.2px ${alpha(theme.palette.grey[500], 0.1)}`,
        }),
        ...sx,
      }}
      {...other}
    >
      <Iconify
        icon="fluent:content-view-32-filled"
        color="text.disabled"
        sx={{ width: 1.2, maxWidth: 166 }}
      />

      {title && (
        <Typography
          variant="h6"
          component="span"
          sx={{ mt: 1, color: 'text.disabled', textAlign: 'center' }}
        >
          {title}
        </Typography>
      )}

      {description && (
        <Typography variant="caption" sx={{ mt: 1.2, color: 'text.disabled', textAlign: 'center' }}>
          {description}
        </Typography>
      )}

      {action && action}
    </Stack>
  );
}
