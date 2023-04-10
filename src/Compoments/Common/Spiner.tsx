import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

export default function Spiner() {
    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{mt: 1}}>
                <CircularProgress size={350}/>
            </Box>
        </Container>
    );
}