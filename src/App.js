import React, { useEffect, useState } from 'react'
import CardContainer from './assets/components/CardContainer'
import SearchInput from './assets/components/SearchInput'
import { Title } from './assets/components/Title'
import bgspace from './assets/Icons/bgspace.svg'
import './styles/style.css'

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
                    mode: 'cors',
                    cache: 'no-cache', 
                    headers: {
                        'Content-Type': 'application/json'
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