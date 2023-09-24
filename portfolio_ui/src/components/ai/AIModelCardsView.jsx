import React from 'react'
import {shivanshResume} from '../../data';
import AICard from './AICard';
import { Grid } from '@mui/material';

export default function AIModelCardsView() {
    const models = shivanshResume.aimodels?shivanshResume.aimodels:[];
    return (
        <>
            <Grid container gap={2} 
            sx={{padding:"15px",
                '@media (max-width:650px)': {
                    justifyContent: 'center',
                    alignItems: 'center',
                },
            }}>
                {models.map(model => {
                    return (
                        <Grid item>
                            <AICard aiproject={model}/>
                        </Grid>
                    )
                })}
            </Grid>
        </>
    )
}
