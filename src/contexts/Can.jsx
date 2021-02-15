import { createContextualCan } from '@casl/react';
import React from 'react';

export const AbilityContext = React.createContext();
const Can = createContextualCan(AbilityContext.Consumer);

export default Can;
