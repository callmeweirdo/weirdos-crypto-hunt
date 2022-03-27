import { Button } from '@material-ui/core'
import React from 'react'

import {makeStyles} from '@material-ui/core';



const SelectButton = ({children, onClick, selected}) => {

    const useStyles = makeStyles(() => ({
      SelectButton: {
        border: "1px solid gold",
        borderRadius: 5,
        padding: 10,
        paddingLeft: 20,
        fontFamily: "Montserrat",
        cursor: "pointer",
        backgroundColor: selected ? "gold" : "",
        color: selected ? "black" : "",
        fontWeight: selected ? 700 : 500,
        "&:hover": {
            backgroundColor: "gold",
            color: "black",
        },
        width: "22%"
      },
    }));

    const classes = useStyles();

  return (
    <Button 
    className={classes.SelectButton}
    onClick={onClick}>
        {children}
    </Button>
  )
}

export default SelectButton