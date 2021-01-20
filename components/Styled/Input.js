import React from 'react';

function Input(props, ref) {
	return <input {...props} ref={ref} />;
}

const forwardedInput = React.forwardRef(Input);

export default forwardedInput;
