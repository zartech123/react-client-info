import {isMobileOnly, isTablet, browserVersion, browserName,  mobileModel, osName, osVersion} from  'react-device-detect';
import React, { useState, useEffect, Fragment, Component } from 'react';
import ReactDOM from 'react-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import FaceTwoToneIcon from '@material-ui/icons/FaceTwoTone';
import Paper from '@material-ui/core/Paper';
import MediaQuery from 'react-responsive';
import DashboardTwoToneIcon from '@material-ui/icons/DashboardTwoTone';
import FilterDramaTwoToneIcon from '@material-ui/icons/FilterDramaTwoTone';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import App from './App';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import BatteryUnknownIcon from '@material-ui/icons/BatteryUnknown';
import DevicesOtherIcon from '@material-ui/icons/DevicesOther';
import LanguageIcon from '@material-ui/icons/Language';
import NetworkCellIcon from '@material-ui/icons/NetworkCell';
import MemoryIcon from '@material-ui/icons/Memory';
import StorageIcon from '@material-ui/icons/Storage';

const useStyles = makeStyles((theme) => ({
   card: {
    maxWidth: 450,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: '#ff0000',
  },
  icon: {
    '& svg': {
      fontSize: 20
    },
    '&:hover': {
      backgroundColor: 'transparent'
    }
  },
  menu: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    '& > *': {
      margin: theme.spacing(0),
      height: theme.spacing(5),
    }
  }
}));

const Battery = () => {
  const [battery, setBattery] = useState({ level: 0, charging: false });
  const chargingText = {false:'Not Charging',true:'Charging'};
  const handleChange = ({ target: { level, charging } }) => {
     setBattery({ level, charging });
  }

  useEffect(() => {
  let battery;
    navigator.getBattery().then(bat => {
      battery = bat;
      battery.addEventListener("levelchange", handleChange);
      battery.addEventListener("chargingchange", handleChange);
      handleChange({ target: battery });
    });
    return () => {
      battery.removeEventListener("levelchange", handleChange);
      battery.removeEventListener("chargingchange", handleChange);
    };
  }, []);

  return (
	<>{battery.level*100} % ({chargingText[battery.charging]})</>
  );
};

const Network = () => {
  const [connection, setConnection] = useState({effectiveType:'',downlink:0,downlinkMax:0});
  const handleChange = ({ target: { effectiveType, downlink, downlinkMax } }) => {
     setConnection({ effectiveType, downlink, downlinkMax });
  }
  
  useEffect(() => {
    setConnection({effectiveType:navigator.connection.effectiveType,downlink:navigator.connection.downlink,downlinkMax:navigator.connection.downlinkMax});
    navigator.connection.addEventListener('change', handleChange);
    handleChange({target:navigator.connection});	
    return () => {
    };
  }, []);

  return (
        <>{connection.effectiveType} ({connection.downlink} up to {connection.downlinkMax}) Mbps</>
  );
};


const CurrentDateTime = () => {
  
  var dateFormat = require('dateformat');
  const datetime = dateFormat(new Date(), "dddd, mmmm dS, yyyy, HH:MM:ss");

  const [datetime2, setDatetime2] = useState(datetime);
  
  useEffect(() => {
  const intervalId = setInterval(() => {
    
  setDatetime2(datetime2 => dateFormat(new Date(), "dddd, mmmm dS, yyyy, HH:MM:ss"));
  
  }, 1000);
  
  return () => clearInterval(intervalId);
  }, [dateFormat]);
 

	return (
      <div>{datetime2}</div>
              );
  
  };



function CreateCard()
{
const classes = useStyles();
const batteryLevel = Battery();
const networkInfo = Network();
const [expanded, setExpanded] = React.useState(true);
const ipAddress = <App />;
const dateTime = CurrentDateTime();
let mobileDevice = "";
let memoryDevice = navigator.deviceMemory;
let platform = navigator.platform;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
	if((isMobileOnly) || (isTablet))
	{
		mobileDevice = <Typography variant="subtitle1" display="block"><DevicesOtherIcon style={{color:'#0275d8'}}/>&nbsp;&nbsp;{mobileModel}</Typography>
	}
	

return (
<Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            C
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Client Information"
        subheader={dateTime}
      />
      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {ipAddress}
          <Typography variant="subtitle1" display="block"><strong><span style={{color:'#0275d8'}}>OS</span></strong>&nbsp;&nbsp;{osName} {osVersion} ({platform})</Typography>
          <Typography variant="subtitle1" display="block"><LanguageIcon style={{color:'#0275d8'}}/>&nbsp;&nbsp;{browserName} {browserVersion}</Typography>
          {mobileDevice}
	  <Typography variant="subtitle1" display="block"><BatteryUnknownIcon style={{color:'#0275d8'}}/>&nbsp;&nbsp;{batteryLevel}</Typography>
	  <Typography variant="subtitle1" display="block"><NetworkCellIcon style={{color:'#0275d8'}}/>&nbsp;&nbsp;{networkInfo}</Typography>
	  <Typography variant="subtitle1" display="block"><MemoryIcon style={{color:'#0275d8'}}/>&nbsp;&nbsp;{memoryDevice} GB</Typography>
        </CardContent>
      </Collapse>
    </Card>
);
}

function SvgIconsSize() {
const classes = useStyles();
const custInfo = CreateCard();
  return (
	<React.Fragment>
                <MediaQuery minDeviceWidth={1224}>
			<div></div>
			<div className={classes.menu}>
			<Paper elevation={0} style={{display: 'flex', flexGrow: '1', justifyContent:'flex-end', backgroundColor: '#f4f9fd'}}><div>&nbsp;</div></Paper>
                        <Paper elevation={2} style={{display: 'flex', justifyContent:'flex-end', backgroundColor: '#e5f1fb'}}>
                                <IconButton className={classes.icon}>
                                        &nbsp;
					<DashboardTwoToneIcon style={{color:'#0275d8'}}/>&nbsp;<strong><span style={{color:'#0275d8', fontSize:'18px'}}>Service</span></strong>
				</IconButton>
			</Paper>&nbsp;
			<Paper elevation={2} style={{display: 'flex', justifyContent:'flex-end', backgroundColor: '#eef7ee'}}>
				<IconButton className={classes.icon}>
                                        &nbsp;
                                        <FilterDramaTwoToneIcon style={{color:'#5cb85c'}}/>&nbsp;<strong><span style={{color:'#5cb85c', fontSize:'18px'}}>Product</span></strong>
                                </IconButton>
                        </Paper>&nbsp;
                        <Paper elevation={2} style={{display: 'flex', justifyContent:'flex-end', backgroundColor: '#fdf6ed'}}>
                                <IconButton className={classes.icon}>
					&nbsp;
                                        <FaceTwoToneIcon style={{color:'#f0ad4e'}}/>&nbsp;<strong><span style={{color:'#f0ad4e', fontSize:'18px'}}>About Us</span></strong>&nbsp;
                                </IconButton>
                        </Paper>&nbsp;
                        </div>
                </MediaQuery>
                <MediaQuery maxDeviceWidth={1224}>
		<div></div>
                </MediaQuery>
                <MediaQuery orientation='portrait'>
		<div></div>
                </MediaQuery>
                <MediaQuery orientation='landscape'>
		<div></div>
                </MediaQuery>

                <MediaQuery minResolution='2dppx'>
		<div></div>
                </MediaQuery>
<CssBaseline />
      <Container maxWidth="lg">
	{custInfo}
      </Container>
            </React.Fragment>
	);
}

ReactDOM.render(
  // Try changing to isLoggedIn={true}:
  <SvgIconsSize />,
  document.getElementById('root')
);
