import arrow_white from '../assets/arrow_white.svg';
import React, { useState } from 'react';
import classes from '../styles/Dropdown.module.css';

function Collapse({ title, content }) {

  const [isOpen , setOpenClose] = useState(false);

  return (
    <div className={classes.dropdown}>
      <header className={classes.dropdown_header} onClick={() => setOpenClose(!isOpen)} >
        <h2>
          {title}
        </h2>
        <img src={arrow_white} style={{ transform: isOpen && 'rotate(0deg)' }}></img>
      </header>
      <div className={classes.dropdown_content} style={{maxHeight: isOpen? `none` : `0px`}}>
        {typeof content === 'string' ? (
          <p>
            {content}
          </p>) : (<p>
            {content.map((string, index) =>
              <React.Fragment key={index}>
                {`${string}`}<br />
              </React.Fragment>
            )}
          </p>)}
      </div>
    </div>
  );
}

export default Collapse;