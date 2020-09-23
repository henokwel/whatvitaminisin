import React, { useEffect, useState } from 'react'
import CardContainer from './assets/components/CardContainer'
import SearchInput from './assets/components/SearchInput'
import { Title } from './assets/components/Title'
import bgspace from './assets/Icons/bgspace.svg'
import './styles/style.css'
const data = [
    {
        derivationCode: "LCCD",
        derivationDescription: "Calculated from a daily value percentage per serving size measure",
        nutrientId: 1087,
        nutrientName: "Calcium, Ca",
        nutrientNumber: "301",
        unitName: "MG",
        value: 8,
    },
    {
        derivationCode: "LCCD",
        derivationDescription: "Calculated from a daily value percentage per serving size measure",
        nutrientId: 1087,
        nutrientName: "Calcium, Ca",
        nutrientNumber: "301",
        unitName: "MG",
        value: 8,
    },
    {
        derivationCode: "LCCD",
        derivationDescription: "Calculated from a daily value percentage per serving size measure",
        nutrientId: 1087,
        nutrientName: "Calcium, Ca",
        nutrientNumber: "301",
        unitName: "MG",
        value: 8,
    }
]

function App() {
    const [fooditemToSearch, setSearch] = useState(null)
    const [selectedFood, setFood] = useState(null)
    const [loading, setLoading] = useState(false)
    const [searchNotFound, setNotFound] = useState(false)
    useEffect(() => {
        // get user input
        // fetch data
        const getData = async () => {

            try {
                if (fooditemToSearch === null) return

                setLoading(true)
                setFood(null)
                setNotFound(false)
 
                const req = await fetch(`https://henok-food-web.herokuapp.com/search/`, {
                    method: "POST",
                    mode: 'cors', // no-cors, *cors, same-origin
                    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                    headers: {
                        'Content-Type': 'application/json'
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: JSON.stringify({ item: fooditemToSearch })
                })

                const res = await req.json()
                // Set Data
                setFood(res.foods[0])
                setLoading(false)
            } catch (error) {
                setNotFound(true)
            }
        }
        // clear user input
        getData()
    }, [fooditemToSearch])

    return (
        <>
            <SearchInput
                getUserInput={setSearch}
            />
            {fooditemToSearch === null ? "" :
                <Title
                    title={fooditemToSearch}
                />
            }
            <CardContainer
                selectedFood={selectedFood}
                loading={loading}
            />
        </>
    )

}

export default App;