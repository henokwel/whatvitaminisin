import React from 'react'


export const Title = (props) => {

    return (
        <div className="title">
            <span className="dash"></span> <p>{props.title}</p>
        </div>
    )
}