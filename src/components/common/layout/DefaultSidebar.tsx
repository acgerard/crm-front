import { makeStyles } from '@material-ui/core'
import React, { ReactNode } from 'react'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import { CloseOutlined } from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
    rowGap: theme.spacing(2),
  },
  header: {
    display: 'grid',
    rowGap: theme.spacing(1),
  },
  title: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridTemplateColumns: '1fr auto',
    alignItems: 'center',
  },
  actions: {
    justifySelf: 'end',
  },
}))

export function DefaultSidebar(props: React.PropsWithChildren<{ name: string; backAction: () => void; toolbarActions?: ReactNode }>) {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div className={classes.title}>
          <Typography variant={'h4'}>{props.name}</Typography>
          <IconButton onClick={props.backAction}>
            <CloseOutlined />
          </IconButton>
        </div>
        {props.toolbarActions && <div className={classes.actions}>{props.toolbarActions}</div>}
      </div>
      {props.children}
    </div>
  )
}
