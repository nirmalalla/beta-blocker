import React, { useState, useEffect } from "react"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import internal from "stream";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

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
    const [valueSets, setValueSets] = useState<Medication[] | null>(null);
    const [filteredB, setFilteredB] = useState(false);
    const [filteredR, setFilteredR] = useState(false);
    const [filteredS, setFilteredS] = useState(false);
    const [filteredSets, setFilteredSets] = useState<Medication[] | null>(null);
    const [anchorElB, setAnchorElB] = useState<null | HTMLElement>(null);
    const [selectedFieldB, setSelectedFieldB] = useState<string>('');
    const [anchorElR, setAnchorElR] = useState<null | HTMLElement>(null);
    const [selectedFieldR, setSelectedFieldR] = useState<string>('');
    const [anchorElS, setAnchorElS] = useState<null | HTMLElement>(null);
    const [selectedFieldS, setSelectedFieldS] = useState<string>('');
  
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
    }, [])

    const handleBetaFilter = async (field: string) => {
        if (filteredB){
            try {
                const data = await fetch(
                    "http://localhost:5000"
                ).then((res) => res.json())
                setFilteredSets(data);
            }catch(e){
                console.log(e)
            }
        }
        
        if (valueSets) {
            const filteredData = valueSets.filter((medication) => {
                return medication.beta_name.trim() === field; // Example filter based on 'beta_name'
            });
           
            setValueSets(filteredData);
        }else if (filteredSets != null && filteredB){
            const filteredData = filteredSets.filter((medication) => {
                return medication.beta_name.trim() === field; // Example filter based on 'beta_name'
            });
            console.log(filteredData)
            setValueSets(filteredData);
        }
        setAnchorElB(null);
        setSelectedFieldB(field);
        setFilteredB(true);
    };

    const handleRouteFilter = async (field: string) => {
        if (filteredR){
            try {
                const data = await fetch(
                    "http://localhost:5000"
                ).then((res) => res.json())
                setFilteredSets(data);
            }catch(e){
                console.log(e)
            }
        }
        
        if (valueSets) {
            const filteredData = valueSets.filter((medication) => {
                return medication.route.trim() === field; // Example filter based on 'beta_name'
            });
           
            setValueSets(filteredData);
        }else if (filteredSets != null && filteredR){
            const filteredData = filteredSets.filter((medication) => {
                return medication.route.trim() === field; // Example filter based on 'beta_name'
            });
            
            setValueSets(filteredData);
        }
        setAnchorElR(null);
        setSelectedFieldR(field);
        setFilteredR(true);
    }

    const handleSimpleFilter = async (field: string) => {
        if (filteredS){
            try {
                const data = await fetch(
                    "http://localhost:5000"
                ).then((res) => res.json())
                setFilteredSets(data);
            }catch(e){
                console.log(e)
            }
        }
        
        if (valueSets) {
            const filteredData = valueSets.filter((medication) => {
                return medication.simple_generic_name.trim().includes(field); // Example filter based on 'beta_name'
            });
           
            setValueSets(filteredData);
        }else if (filteredSets != null && filteredS){
            const filteredData = filteredSets.filter((medication) => {
                return medication.simple_generic_name.trim().includes(field); // Example filter based on 'beta_name'
            });
            
            setValueSets(filteredData);
        }
        setAnchorElS(null);
        setSelectedFieldS(field);
        setFilteredS(true);
    }

    const resetFilter = async () => {
        setAnchorElB(null);
        setSelectedFieldB('');
        setAnchorElR(null);
        setSelectedFieldR('');
        setAnchorElS(null);
        setSelectedFieldS('');

        try {
            const data = await fetch(
                "http://localhost:5000"
            ).then((res) => res.json())
            setValueSets(data)
        }catch(e){
            console.log(e)
        }
        setFilteredB(false);
        setFilteredR(false);
        setFilteredS(false);
    };

    const handleMenuOpenB = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorElB(event.currentTarget);
    };

    const handleMenuCloseB = () => {
        setAnchorElB(null);
    };

    const handleMenuOpenR = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorElR(event.currentTarget);
    };

    const handleMenuCloseR = () => {
        setAnchorElR(null);
    };

    const handleMenuOpenS = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorElS(event.currentTarget);
    };

    const handleMenuCloseS = () => {
        setAnchorElS(null);
    };


    return(
        <div>
            <div style={{ display: 'flex', gap: '10px', justifyContent: "center", marginBottom: '20px', marginTop: '20px'}}>
                <Button variant="contained" onClick={handleMenuOpenB}>
                    Beta Blocker Set {selectedFieldB ? `(${selectedFieldB})` : ''}
                </Button>
                <Menu
                    anchorEl={anchorElB}
                    open={Boolean(anchorElB)}
                    onClose={handleMenuCloseB}
                >
                    <MenuItem onClick={() => handleBetaFilter('ERX GENERAL BETA BLOCKERS PQRS MEASURE 7,8')}>ERX GENERAL BETA BLOCKERS PQRS MEASURE 7,8</MenuItem>
                    <MenuItem onClick={() => handleBetaFilter('AMB ERX GENERAL BETA-BLOCKERS NON-COMBO,NON-SO...')}>AMB ERX GENERAL BETA-BLOCKERS NON-COMBO,NON-SOTALOL ORAL</MenuItem>
                    <MenuItem onClick={() => handleBetaFilter('AMB ERX GENERAL BETA-BLOCKER DIURETIC COMBO ORAL')}>AMB ERX GENERAL BETA-BLOCKER DIURETIC COMBO ORAL</MenuItem>
                    <MenuItem onClick={() => handleBetaFilter("ERX GENERAL JCCM BETA BLOCKERS")}>ERX GENERAL JCCM BETA BLOCKERS</MenuItem>
                    <MenuItem onClick={() => handleBetaFilter("ERX CV ICD BETA BLOCKER (ANY)")}>ERX CV ICD BETA BLOCKER (ANY)</MenuItem>
                    <MenuItem onClick={() => handleBetaFilter("ERX SYSTEMIC BETA-BLOCKERS")}>ERX SYSTEMIC BETA-BLOCKERS</MenuItem>
                    <MenuItem onClick={() => handleBetaFilter("ERX PERIOPERATIVE BETA BLOCKERS")}>ERX PERIOPERATIVE BETA BLOCKERS</MenuItem>
                    <MenuItem onClick={() => handleBetaFilter("ERX GENERAL HEDIS CARDIO BETA BLOCKERS")}>ERX GENERAL HEDIS CARDIO BETA BLOCKERS</MenuItem>
                    <MenuItem onClick={() => handleBetaFilter("ERX GENERAL BETA BLOCKERS")}>ERX GENERAL BETA BLOCKERS</MenuItem>
                    <MenuItem onClick={() => handleBetaFilter("ERX GENERAL MU BETA BLOCKER THERAPY FOR LVSD 2.16.840.1.113883.3.526.3.1184")}>ERX GENERAL MU BETA BLOCKER THERAPY FOR LVSD 2.16.840.1.113883.3.526.3.1184</MenuItem>
                    <MenuItem onClick={() => handleBetaFilter("ACO ERX PRESCRIBED BETA BLOCKER")}>ACO ERX PRESCRIBED BETA BLOCKER</MenuItem>
                    <MenuItem onClick={() => handleBetaFilter("ACO ERX BETA BLOCKER ORDERED")}>ACO ERX BETA BLOCKER ORDERED</MenuItem>
                </Menu>

                <Button variant="contained" onClick={handleMenuOpenR}>
                    Route {selectedFieldR ? `(${selectedFieldR})` : ''}
                </Button>
                <Menu
                    anchorEl={anchorElR}
                    open={Boolean(anchorElR)}
                    onClose={handleMenuCloseR}
                >
                    <MenuItem onClick={() => handleRouteFilter('oral')}>Oral</MenuItem>
                    <MenuItem onClick={() => handleRouteFilter('ophthalmic')}>Ophthalmic</MenuItem>
                    <MenuItem onClick={() => handleRouteFilter('intraVENOUS')}>Intravenous</MenuItem>
                    <MenuItem onClick={() => handleRouteFilter("miscellaneous")}>Miscellaneous</MenuItem>
                </Menu>

                <Button variant="contained" onClick={handleMenuOpenS}>
                    Simple Generic Name {selectedFieldS ? `(${selectedFieldS})` : ''}
                </Button>
                <Menu
                    anchorEl={anchorElS}
                    open={Boolean(anchorElS)}
                    onClose={handleMenuCloseS}
                >
                    <MenuItem onClick={() => handleSimpleFilter('atenolol')}>Atenolol</MenuItem>
                    <MenuItem onClick={() => handleSimpleFilter('sotalol HCl')}>Sotalol HCl</MenuItem>
                    <MenuItem onClick={() => handleSimpleFilter('betaxolol HCl')}>Betaxolol HCl</MenuItem>
                    <MenuItem onClick={() => handleSimpleFilter('metoprolol tartrate')}>Metoprolol tartrate</MenuItem>
                    <MenuItem onClick={() => handleSimpleFilter('nadolol')}>Nadolol</MenuItem>
                    <MenuItem onClick={() => handleSimpleFilter('pindolol')}>Pindolol</MenuItem>
                    <MenuItem onClick={() => handleSimpleFilter('acebutolol HCl')}>Acebutolol HCl</MenuItem>
                    <MenuItem onClick={() => handleSimpleFilter('timolol maleate')}>Timolol Maleate</MenuItem>
                    <MenuItem onClick={() => handleSimpleFilter('chlorthalidone')}>Chlorthalidone</MenuItem>
                    <MenuItem onClick={() => handleSimpleFilter('carteolol HCl')}>Carteolol HCl</MenuItem>
                    <MenuItem onClick={() => handleSimpleFilter('labetalol HCl')}>Labetalol HCl</MenuItem>
                    <MenuItem onClick={() => handleSimpleFilter('bendroflumethiazide')}>Bendroflumethiazide</MenuItem>
                    <MenuItem onClick={() => handleSimpleFilter('hydrochlorothiazide')}>Hydrochlorothiazide</MenuItem>
                    <MenuItem onClick={() => handleSimpleFilter('penbutolol sulfate')}>Penbutolol Sulfate</MenuItem>
                    <MenuItem onClick={() => handleSimpleFilter('carvedilol')}>Carvedilol</MenuItem>
                    <MenuItem onClick={() => handleSimpleFilter('bisoprolol')}>Bisoprolol</MenuItem>
                    <MenuItem onClick={() => handleSimpleFilter('esmolol HCl')}>Esmolol HCl</MenuItem>
                    <MenuItem onClick={() => handleSimpleFilter('brimonidine tartrate')}>Brimonidine Tartrate</MenuItem>
                    <MenuItem onClick={() => handleSimpleFilter('nebivolol HCl')}>Nebivolol HCl</MenuItem>
                    <MenuItem onClick={() => handleSimpleFilter('latanoprost')}>Latanoprost</MenuItem>
                </Menu>

                <Button variant="contained" onClick={resetFilter}>
                    Reset
                </Button>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow style={{ backgroundColor: '#f0f0f0' }} className="mb-3">
                            <TableCell style={{ color: '#333333' }}>Value Set</TableCell>
                            <TableCell align="right" style={{ color: '#333333' }}>Medication Name</TableCell>
                            <TableCell align="right" style={{ color: '#333333' }}>Simple Generic Name</TableCell>
                            <TableCell align="right" style={{ color: '#333333' }}>Route</TableCell>
                            <TableCell align="right" style={{ color: '#333333' }}>Outpatients</TableCell>
                            <TableCell align="right" style={{ color: '#333333' }}>Inpatients</TableCell>
                            <TableCell align="right" style={{ color: '#333333' }}>Patients</TableCell>
                        </TableRow>
                    </TableHead>
                        {valueSets ? 
                        
                            <TableBody>
                                {valueSets.map((medication) => (
                                    <TableRow 
                                    sx={{ 
                                        '&:last-child td, &:last-child th': { 
                                            border: 0 
                                        },
                                        '&:hover': {
                                            backgroundColor: '#f5f5f5' // Add hover effect
                                        }
                                    }}>
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
        </div>
    )
}

export default ValueSets;