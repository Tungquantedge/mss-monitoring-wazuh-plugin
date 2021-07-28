import React from 'react';
import { VisConfigLayout } from '../../../common/modules/panel';

export const OfficeBody = ({ changeView, toggleFilter, rows = [] }) => {

  const rowClickHandler = (field, value) => {
    toggleFilter(field, value);

    changeView(field);
  }

  return <VisConfigLayout rows={rows} rowClickHandler={rowClickHandler}/>
}