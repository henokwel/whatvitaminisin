import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { Card } from './Card';
import notFound from '../Icons/pixeltrue-error.svg'

function CardContainer(props) {

    const foodWithValue = props.selectedFood !== null && props.selectedFood !== undefined ?
        props.selectedFood.foodNutrients.filter(item => item.value !== 0 && Number.isInteger(item.value)) : ""

    return (
        <div className="cardsContainer">
            {
                props.selectedFood === null ? "" : props.selectedFood === undefined ?
                    <div className="notFound">
                        <p>We were unable to find your item, please try another one.</p>
                        <br />
                        <img src={notFound} width="100%" alt="Item not found error image" />
                    </div>
                    : props.loading === true ?
                        <SkeletonTheme color="#DDDDDD" highlightColor="#dadada">
                            <Skeleton count={foodWithValue.length} className="skeleton" width={287} height={180}
                                style={{ display: "inline-block", margin: "10px", border: "4px solid #DFDFDF", borderRadius: "22px" }}
                            />
                        </SkeletonTheme>
                        :
                        <>
                            {foodWithValue.map((item, index) => <Card key={index} item={item} />)}
                        </>
            }
        </div>
    )
}


export default CardContainer;