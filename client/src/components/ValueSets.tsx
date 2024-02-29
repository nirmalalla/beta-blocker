import React, { useState, useEffect } from "react"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import internal from "stream";

interface Medication{
    beta_name: string,
    medname: string,
    simple_generic_name: string,
    route: string,
    outpatients: string,
    inpatients: string,
    patients: string

}

const ValueSets = () => {
    const [valueSets, setValueSets] = useState<Medication[] | null>([])
  
    useEffect(() => {
        const getSets = async () => {
            try {
                const data = await fetch(
                    "http://localhost:5000"
                ).then((res) => res.json())
                setValueSets(data)
            }catch(e){
                console.log(e)
            }
        }

        void getSets()
    })

    return(
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Value Set</TableCell>
                        <TableCell align="right">Medication Name</TableCell>
                        <TableCell align="right">Simple Generic Name</TableCell>
                        <TableCell align="right">Route</TableCell>
                        <TableCell align="right">Outpatients</TableCell>
                        <TableCell align="right">Inpatients</TableCell>
                        <TableCell align="right">Patients</TableCell>
                    </TableRow>
                </TableHead>
                    {valueSets ? 
                    
                        <TableBody>
                            {valueSets.map((medication) => (
                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">{medication.beta_name}</TableCell>
                                    <TableCell align="right">{medication.medname}</TableCell>
                                    <TableCell align="right">{medication.simple_generic_name}</TableCell>
                                    <TableCell align="right">{medication.route}</TableCell>
                                    <TableCell align="right">{medication.outpatients}</TableCell>
                                    <TableCell align="right">{medication.inpatients}</TableCell>
                                    <TableCell align="right">{medication.patients}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    

                    :
                    <div></div>}
            </Table>
        </TableContainer>
    )
}

export default ValueSets;