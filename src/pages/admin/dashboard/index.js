import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MenuAdmin from '../../../components/menu-admin'
import Footer from '../../../components/footer-admin';
import {getTipoUsuario} from '../../../services/auth'
import DashboardRH from './Rh'
import DashboardArmazem from './Armazem'
import DashboardAdmin from './Admin'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  
}));
function getDashboard(){
  if(getTipoUsuario() == 11){
    return <DashboardAdmin/>
  }else if(getTipoUsuario() == 7){
    return <DashboardRH/>
  }else if(getTipoUsuario() == 5){
    return <DashboardArmazem/>
  }
}
export default function Dashboard() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <MenuAdmin title={'DASHBOARD'}/>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          { getDashboard() } 
          </Grid>
          <Box pt={4}>
            <Footer />
          </Box>
        </Container>
      </main>
    </div>
  );
}