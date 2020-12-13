import React from 'react'
import Button from '@material-ui/core/Button';
import useStyle from "./../../../style/style";


export default function MaterialPage() {
    const classes = useStyle();
    return (
        <div className={classes.content}>
            <span>Ninh</span>
            <h3 className= {classes.title}>MaterialPage</h3>
            <Button variant="contained" color = "primary">Default</Button>
        </div>
    )
}
