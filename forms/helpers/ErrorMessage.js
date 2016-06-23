import React from 'react'

export default ({ field }) => {
  if (field.touched && field.error) {
    return <span style={{color: 'red'}}>{field.error}</span>;
  } else {
    return null;
  }
}
