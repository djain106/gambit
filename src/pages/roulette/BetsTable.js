import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './Roulette.css'
import { Button } from '@material-ui/core'; //  
import { Alert } from 'react-bootstrap';

const useStyles = makeStyles({
    table: {
        minWidth: 100,
    },
});

function BetsTable(props) {
    const classes = useStyles();

    return (
        <div className="betsTable">
            <Alert hidden={props.netBet === undefined} variant="info">
                Total Earnings: {props.netBet}
            </Alert>
            <TableContainer hidden={props.betList.length === 0}
                component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Number</TableCell>
                            <TableCell align="center">Amount</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.betList.map((b) => (
                            <TableRow key={b.n}>
                                <TableCell align="center" component="th" scope="row">
                                    {b.n}
                                </TableCell>
                                <TableCell align="center">{b.amount}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <div className="controls">
                <Button hidden={props.winner !== undefined || props.betList.length === 0}
                    onClick={props.spin}>Spin</Button>
                <Button hidden={props.winner === undefined || props.netBet === undefined} onClick={props.reset}>Reset</Button>
            </div>
        </div>
    );
}

export default BetsTable
