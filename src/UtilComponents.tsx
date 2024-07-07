import {
  Link,
  LinkProps,
} from '@mui/material';

export function RowStack(props: StackProps): JSX.Element {
  return (
    <Stack direction="row" justifyContent="space-between">
      {props.children}
    </Stack>
  );
}

export function ExtLink(props: LinkProps): JSX.Element {
  return <Link {...props} target="_blank" rel="noopener noreferrer"></Link>;
}

