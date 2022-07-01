import { Option } from "../components/select.component"
import {FilterField} from "../types/booking";

export const LOCATIONS: Option[] = [
    {
        value: "new-york",
        description: "New York"
    },
    {
        value: "orlando",
        description: "Orlando"
    },
    {
        value: "barbados",
        description: "Barbados"
    },
    {
        value: "toronto",
        description: "Toronto"
    }
]


export const FILTERS: FilterField[] = [
    {
        label: "Price per person",
        id: "pricePerPerson",
        options: [
            {
                value: [0,1500],
                label: "£0 - £1500",
            },
            {
                value: [1500,2000],
                label: "£1500 - £2000"
            },
            {
                value: [2000, Number.POSITIVE_INFINITY],
                label: "£2000 +"
            },
        ]
    },
    {
        label: "Hotel facilities",
        id: "facilities",
        options: [
            {
                value: "Restaurant",
                label: "Restaurant"
            },
            {
                value: "Spa",
                label: "Spa"
            },
            {
                value: "No Smoking",
                label: "No Smoking"
            },
            {
                value: "Free Parking",
                label: "Free Parking"
            },
            {
                value: "Room Service",
                label: "Room Service"
            },
            {
                value: "Fitness Centre/Gym",
                label: "Fitness Centre/Gym"
            },
            {
                value: "Laundry Service",
                label: "Laundry Service"
            },
            {
                value: "Internet Access",
                label: "Internet Access"
            },

        ]
    },
    {
        label: "Star rating",
        id: "starRating",
        options: [
            {
                value: 1,
                label: "1 Star"
            },
            {
                value: 2,
                label: "2 Stars"
            },
            {
                value: 3,
                label: "3 Stars"
            },
            {
                value: 4,
                label: "4 Stars"
            },
            {
                value: 5,
                label: "5 Stars"
            },
            {
                value: null,
                label: "unrated"
            },
        ]
    }
]