import React from 'react'

function Card(props) {
	return (
		<>
			<div className="container">
				<div className={props.className.concat('p-5 rounded-md overflow-x-clip')}>{props.content}</div>
			</div>
		</>
	)
}

export default Card
