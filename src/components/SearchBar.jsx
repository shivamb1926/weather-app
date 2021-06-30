import React from 'react';
import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { StylesProvider, ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import './css/SearchBar.css'

const theme = createMuiTheme({
    palette: {
      primary: red,
    },
  });

export default function SearchBar(props) {

    const [value, setValue] = useState('');

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    const search = () => {
        props.searchCity(value)
    }

    const keySearch = (event) => {
        if(event.key === 'Enter'){
            props.searchCity(value);
        }
    } 

    return (
        <div className="search-bar"> 
            <ThemeProvider theme={theme}>
                <StylesProvider injectFirst>
                    <TextField
                        id="standard-full-width"
                        placeholder="Search"
                        fullWidth
                        variant='outlined'
                        value={value}
                        onChange={handleChange}
                        onKeyPressCapture={keySearch}
                    />
                    <Button variant='outlined' onClick={search}><Icon style={{ fontSize: 30 }}>search</Icon></Button>
                </StylesProvider>
            </ThemeProvider>
        </div>
    )
}
