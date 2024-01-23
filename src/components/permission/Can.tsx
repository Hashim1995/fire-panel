/* eslint-disable react/function-component-definition */
/* eslint-disable array-callback-return */
import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { ISelectorAuth } from '@/models/user';

interface IProps {
  action: string[];
  children: any;
  disableIfActionsTrue?: string[];
}

const Can: React.FC<IProps> = ({ action, children, disableIfActionsTrue }) => {
  const [restrictedComponent, setrestrictedComponent] =
    useState<boolean>(false);
  const auth: ISelectorAuth = useSelector((state: any) => state?.user);

  useEffect(() => {
    disableIfActionsTrue?.some(item => {
      if (!auth?.user?.permissions?.actions[item]) {
        setrestrictedComponent(false);
      }
    });
    action?.some(item => {
      if (auth?.user?.permissions?.actions[item]) {
        setrestrictedComponent(auth?.user?.permissions?.actions[item]);
      }
    });
  }, [action, disableIfActionsTrue, auth]);

  return restrictedComponent ? children : null;
};

export default Can;
