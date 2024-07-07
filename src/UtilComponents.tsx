import { Stack, StackProps } from '@mui/material';

export function RowStack(props: StackProps): JSX.Element {
  return (
    <Stack direction="row" justifyContent="space-between">
      {props.children}
    </Stack>
  );
}
