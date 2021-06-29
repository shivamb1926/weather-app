import React from 'react';
import Switch from '@material-ui/core/Switch';
import { StylesProvider } from '@material-ui/styles';

import './Toggle.css';

export default function Toggle(props) {

  
    const handleChange = (event) => {
      props.setState({ ...props.state, [event.target.name]: event.target.checked });
    };
  
    return (
      <div>
        <StylesProvider injectFirst>
          <Switch
          size="medium"
          checked={props.state.checkedA}
          onChange={handleChange}
          name="checkedA"
          inputProps={{ 'aria-label': 'secondary checkbox' }}
          className="toggle"
            />
        </StylesProvider>
        
        </div>
    )
}

