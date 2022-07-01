import { h, JSX } from 'preact'
import { useRouter } from "preact-router";
import {useEffect, useState} from 'preact/hooks';
import SearchComponent from '../components/search.component';
import { doRequest } from '../services/http.service';
import {BookingRequest, BookingResponse} from '../types/booking';
import { DateTime } from 'luxon';
import * as React from "preact/compat";
import {ListItemComponent} from "../components/list-item.component";
import FilterComponent from "../components/filter.component";
import * as style from './results.module.less'
import {FILTERS} from "../consts/search";


export default function ResultsRoute(): JSX.Element {
    const [searchParams] = useRouter();
    const [data, setData] = useState<BookingResponse | null>(null);
    const [filter, setFilter] = useState(null);

    useEffect(() => {
        (async ()=> {
            const departureDate = DateTime.fromFormat(searchParams?.matches?.departureDate, "yyyy-MM-dd").toFormat("dd-MM-yyyy");
            const requestBody: BookingRequest = {
                "bookingType": "holiday",
                "filter": [],
                "location": searchParams?.matches?.location,
                "departureDate": departureDate,
                "duration": searchParams?.matches?.duration as unknown as number,
                "gateway": "LHR",
                "partyCompositions": [
                    {
                        "adults": searchParams?.matches?.adults as unknown as number,
                        "childAges": [],
                        "infants": 0
                    }
                ]
            }

            const searchResult = await doRequest('POST', '/cjs-search-api/search', requestBody)

            //filter check for pricePerPerson
            if(filter?.pricePerPerson?.length) {
                const range = filter?.pricePerPerson.map(price => {
                    price = price.split(",")
                    return [Number(price[0]), Number(price[1])]
                }).flat(1)

                searchResult.holidays = searchResult.holidays.filter(holiday => {
                    return holiday.pricePerPerson >= range[0] && holiday.pricePerPerson <= range.at(-1)
                })
            }

            //Filter check for Hotel Facilities
            if(filter?.facilities?.length){
                searchResult.holidays = searchResult.holidays.filter(holiday => {
                    return filter.facilities.every(facility => holiday.hotel.content.hotelFacilities.includes(facility))
                })
            }

            //Filter check for ratings
            if(filter?.starRating?.length){
                searchResult.holidays = searchResult.holidays.filter(holiday => {
                    return filter.starRating.includes(holiday.hotel.content.starRating)
                        || (filter.starRating.includes("") && !holiday.hotel.content.starRating)
                })
            }

            setData(searchResult as BookingResponse)
        })()

    }, [searchParams,filter])

    const onFilterChange = (name, value) => {
        setFilter({...filter, [name]: value})
    }


    return (
        <section>
            <SearchComponent />
                <div>
                    {data?.holidays.length > 0 && <h1>{data?.holidays.length} hotels found in {data?.destination?.name}</h1>}
                    {data?.holidays.length === 0 && <h1>No results found, please refine your search</h1>}
                </div>
                <div class={style['col']}>
                    <div>
                        {FILTERS.map(data => <FilterComponent onFilterChecked={onFilterChange} options={data.options} id={data.id} label={data.label} />)}
                    </div>
                    <div>{data?.holidays.map(data => <ListItemComponent { ...data } />)}</div>

                </div>
        </section>
    )
}