import React from 'react';

function Input(props, ref) {
	return (
		<input
			className='shadow-inner w-full bg-gray-50 p-3 rounded mb-4 outline-none'
			{...props}
			ref={ref}
		/>
	);
}

const forwardedInput = React.forwardRef(Input);

export default forwardedInput;
