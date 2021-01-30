import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import AnimatedNumber from "animated-number-react";
import {toNumber} from '../../helper/stringToCurrency';
import Emitter from '../../helper/eventBus';

let cardGrouping = [
    {confirmed: {}, color: 'purple'},
    {recovered: {}, color: 'green'},
    {deaths: {}, color: 'red'}
]


const Dashboard = () => {
    const classes = useStyles();
    const [cardGroup, setCardGroup] = React.useState([])
    const formatValue = value => `${toNumber(value)}`;

    const filterCounterVal = val => {
        if(val.color === 'purple') {
            return val.confirmed.value
        } else if (val.color === 'green') {
            return val.recovered.value 
        } else {
            return val.deaths.value
        }
    }

    const filterNameCard = val => {
        if(val.color === 'purple') {
            return 'Kasus';
        } else if (val.color === 'green') {
            return 'Sembuh';
        } else {
            return 'Meninggal';
        }
    }
    
    React.useEffect(() => {
        document.title = 'Dashboard | Covid Tracker'
        Emitter.on('DATA_COVID', (newValue) => {
            cardGrouping = cardGrouping.map(_item => {
                return {
                    ...newValue,
                    color: _item.color
                }
            });
            setCardGroup(cardGrouping)
        });
    }, [cardGroup])

    return (
        <>
            <div className={classes.dashboardBody}>
                {cardGroup.map((_item, idx) => (
                    <Card className={[classes.root, _item.color].join(' ')} key={idx}>
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                { filterNameCard(_item) }
                            </Typography>
                            <Typography variant="h5" component="h2">
                            <AnimatedNumber
                                value={filterCounterVal(_item)}
                                formatValue={formatValue}
                                duration="4000"
                            />
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary">
                                Orang
                            </Typography>
                            <Typography variant="body2" component="p">
                                Jumlah Angka Kasus COVID-19
                            </Typography>
                        </CardContent>
                    </Card>

                ))}
            </div>
        </>
    )
}

const useStyles = makeStyles({
    root: {
      minWidth: 235,
      width: 235,
      height: 150,
      margin: '0px 10px',
      boxShadow: '0px 2px 8px #00000029',
      '&.purple': {
          '&:hover': {
              boxShadow: '0px 2px 8px rgba(0,0,255,.5)'
          }
      },
      '&.green': {
            '&:hover': {
                boxShadow: '0px 2px 8px rgba(0,255,0,.5)',
            }
        },
        '&.red': {
            '&:hover': {
                boxShadow: '0px 2px 8px rgba(255,0,0,.5)',
            }
        },
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 0,
    },
    dashboardBody: {
        minHeight: '35vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 'calc(10px + 2vmin)',
        color: '#000000',
        overflowX: 'auto',
        '@media screen and (max-width: 960px)': {
            justifyContent: 'unset',
            '&::before': {
                height: '150px',
                content: "''",
                padding: '14px !important',
            },
            '&::after': {
                height: '150px',
                content: "''",
                padding: '5px !important',
            }
        }
    }
});

export default Dashboard;