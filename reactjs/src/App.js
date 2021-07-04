import React from 'react';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import PublicIcon from '@material-ui/icons/Public';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import WifiIcon from '@material-ui/icons/Wifi';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ipAddress: null,
	    country: null,
	    region: null,
	    city: null,
	    org: null,
	    asn: null,
	    version: null
        };
    }

    componentDidMount() {
        // Simple GET request using axios
        //axios.get('https://api.ipify.org?format=json')
	axios.get('https://ipapi.co/json')
            .then(response => this.setState({ version: response.data.version, ipAddress: response.data.ip, country: response.data.country_name, region: response.data.region, city: response.data.city, org: response.data.org, asn: response.data.asn }));
    
    }

    render() {
        const { ipAddress, country, region, city, asn, org, version} = this.state;

        return (
        	<>
		<Typography variant="subtitle1" display="block">&nbsp;<strong><span style={{color:'#0275d8'}}>IP</span></strong>&nbsp;&nbsp;{ipAddress} ({version})</Typography>
                <Typography variant="subtitle1" display="block"><PublicIcon style={{color:'#0275d8'}}/>&nbsp;&nbsp;{country}</Typography>
                <Typography variant="subtitle1" display="block"><LocationCityIcon style={{color:'#0275d8'}}/>&nbsp;&nbsp;{city} ({region})</Typography>
		<Typography variant="subtitle1" display="block"><WifiIcon style={{color:'#0275d8'}}/>&nbsp;&nbsp;{asn} ({org})</Typography></>
	);
    }
}
export default App;
