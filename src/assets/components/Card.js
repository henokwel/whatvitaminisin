import React from 'react'


export const Card = (props) => {
    const { nutrientName, unitName, value } = props.item
     return (
        <div className="card_container">
            <div className="card_vitaminEle">
                {nutrientName.replace(/,/g, '')}
            </div>
            <div className="card_Ele_info">
                <div>
                    <p>
                        {value}
                    </p>
                </div>
                <div>
                    <p>
                        {unitName.toLowerCase()}
                    </p>
                </div>
            </div>
        </div>
    )
}
