/** @jsx h */
import { h, JSX } from 'preact'
import * as React from "preact/compat";
import {Holiday} from "../types/booking";
import * as style from './list-item.module.less'

export const ListItemComponent = ({hotel, pricePerPerson, totalPrice}: Holiday ) => {
return (
    <div class={style['li-container']}>
        <div class={style['li-image']}>
            <img alt={hotel.content.name} src={hotel.content.images[0].RESULTS_CAROUSEL.url} />
        </div>
        <div class={style['li-description']}>
            <h2>{hotel.name}</h2>
            {hotel?.content.starRating ? <p>{hotel?.content.starRating}/5 ratings</p> : <p>No ratings yet</p>}
            <h4>FACILITIES</h4>
            <span>{hotel.content.hotelFacilities.join(" - ")}</span>
        </div>
        <div class={style['li-price']}>
            <span>Per person:</span>
            <p>{pricePerPerson}</p>
            <span>Total Amount:</span>
            <p>{totalPrice}</p>
        </div>

    </div>
)

}