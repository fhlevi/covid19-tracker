import React from 'react';
import { useDispatch } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Report from '../api/Report';
import { Moment } from '../helper/moment';
import Emitter from '../helper/eventBus';
import logoHeader from '../assets/picture/logo/Header-logo.png';

const TheHeader = () => {
    const dispatch = useDispatch()
    const [selectItem, setSelectItem] = React.useState('');
    const [dataSelect, setDataSelect] = React.useState([]);
    const [dataCovid, setDataCovid] = React.useState(null)
    const [moment, setMoment] = React.useState(null)
    const [reportModel, setReportModel] = React.useState(null);
    const classes = useStyles();

    const handleChange = (event) => {
        setSelectItem(event.target.value);
    };

    React.useEffect(() => {
        if(!!reportModel) {
            fetchDataCovidByCountry(selectItem)
        }
    }, [selectItem])

    const iniModel = () => {
        const report = new Report()
        const moment = new Moment()
        setMoment(moment)
        setReportModel(report)
    }

    React.useEffect(() => {
        iniModel();
    }, []);

    const fetchFirstReport = async () => {
        try {
            let result = await reportModel.getContries()
            setDataSelect(result.data.countries)
        } catch (err) {
            console.log("🚀 ~ file: TheHeader.js ~ line 43 ~ fetchFirstReport ~ err", err)
        }
    }

    const fetchDataCovidByCountry = async (country=null) => {
        try {
            let result = await reportModel.fetchDataCovid(country)
            setDataCovid(result.data)
            dispatch({ type: 'set', covidListData: result.data })
        } catch (err) {
            console.log("🚀 ~ file: TheHeader.js ~ line 52 ~ fetchDataCovid ~ err", err)
        }
    }
    
    React.useEffect(() => {
        if(!!reportModel) {
            fetchFirstReport();
            fetchDataCovidByCountry();
        }
    }, [reportModel]);

    return (
        <>
            <header className="container">
                <div className="wave water"></div>
                <div className="wave water"></div>
                <div className="wave water"></div>
                <div className="el-center">
                    <img src={logoHeader} className={classes.imageBanner} />
                </div>
                <div className={`${classes.midText} el-center text-muted`}>
                    Last Updated : { (!!dataCovid) ? moment.format(dataCovid.lastUpdate, 'dddd, DD MMMM YYYY') : 'Invalid date' }
                </div>
                <FormControl className={classes.formSelect}>
                    <Select
                    labelId="demo-simple-select-placeholder-label-label"
                    id="demo-simple-select-placeholder-label"
                    value={selectItem}
                    onChange={handleChange}
                    displayEmpty
                    className={classes.selectEmpty}
                    inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <MenuItem value="">
                            <em>Global</em>
                        </MenuItem>
                        {dataSelect.map((item, idx) => (
                            <MenuItem value={item} key={idx}>{item.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </header>
        </>
    )
}


const useStyles = makeStyles((theme) => ({
    formSelect: {
        position: 'absolute',
        zIndex: 99,
        top: '62%',
        left: '49.3%',
        width: 300,
        transform: 'translate(-50%,-50%)',
        margin: theme.spacing(1),
        minWidth: 120,
        '& .MuiInputBase-root': {
            background: '#FFFFFF',
            borderRadius: '3px',
            padding: '0px 5px',
        },
        '& .MuiInput-underline:after, .MuiInput-underline:before': {
            borderBottom: 'none !important'
        }
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    imageBanner: {
        marginTop: 15,
        width: 320,
        '@media screen and (max-width: 960px)': {
            width: '250px'
        }
    },
    midText: {
        // position: 'absolute',
        // zIndex: 99,
        marginTop: '15px',
        // transform: 'translate(-50%,-50%)'
    }
}));

export default TheHeader;