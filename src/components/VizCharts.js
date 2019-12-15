import React from 'react';
import { Container, Grid, AppBar, Toolbar, Typography, Card, CardContent, makeStyles } from '@material-ui/core';
import AssessmentIcon from '@material-ui/icons/Assessment';
import LineChart from './LineChart';
import BarChart from './BarChart';

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  cardChart: {
    flexGrow: 1,
    height: "120%",
    paddingTop: theme.spacing(8),
    paddingLeft: theme.spacing(5)
  }
}));


export default function VizChart() {
    const classes = useStyles();
    return (
        <>
        <AppBar position="relative">
        <Toolbar>
          <AssessmentIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            Visualization
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textSecondary" gutterBottom>
              Visualization
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              The way to see how you contribute to tasks
            </Typography>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="lg">

          <Grid container spacing={6}>
    
              <Grid item key="text" xs={12} sm={6} md={6}>
                <Card className={classes.card}>
                  <CardContent className={classes.cardChart}>
                    <LineChart />
                  </CardContent>
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Line Charts
                    </Typography>
                    <Typography>
                      This shows which task you contributed each day. 
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item key="text" xs={12} sm={6} md={6}>
                <Card className={classes.card}>
                <CardContent className={classes.cardChart}>
                    <BarChart />
                  </CardContent>
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Bar Charts
                    </Typography>
                    <Typography>
                    This shows which task you contributed each day. 
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
    
          </Grid>
        </Container>
      </main>
        </>
    )
}