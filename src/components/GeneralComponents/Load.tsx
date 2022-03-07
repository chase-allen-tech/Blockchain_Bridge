import React from 'react';

function  Load(props:any){

	const html =  (
		<div className="loading-page"> 
		{//loading-card
		}
			<div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
			{/* <h2>Loaded {props.loaded.loaded} of {props.loaded.all}</h2> */}
		</div>
	)

	return html;

}

export default Load;