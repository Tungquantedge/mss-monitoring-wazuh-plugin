import React from 'react';
import {
	EuiTextArea,
} from '@elastic/eui';
import { IInputFormType } from './types';

export const InputFormTextArea = ({ value, isInvalid, onChange } : IInputFormType) => {
	return (
		<EuiTextArea
			fullWidth
			value={value}
			isInvalid={isInvalid}
			onChange={onChange}
		/>
	);
};
