import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./Hens.css"

export const HenList = ({ searchTermState }) => {
    const [hens, setHens] = useState([])
    const [filteredHens, setFiltered] = useState([])
    const [laying, setLaying] = useState(null)
    const navigate = useNavigate()

    const localPalaceUser = localStorage.getItem("palace_user")
    const palaceUserObject = JSON.parse(localPalaceUser)

    useEffect(
        () => {
            const searchedHens = hens.filter(hen => {
                return hen.name.toLowerCase().includes(searchTermState.toLowerCase())
            })
            setFiltered(searchedHens)
        },
        [searchTermState]
    )

    // useEffect(
    //     () => {
    //         const searchedHenBreeds = hens.filter(hen => {
    //             return hen.breed.toLowerCase().startsWith(searchTermState.toLowerCase())
    //         })
    //         setFiltered(searchedHenBreeds)
    //     },
    //     [searchTermState]
    // )

    useEffect(
        () => {
            if (laying === true) {
                const layingHens = hens.filter(hen => hen.layingStatusesId === 1)
                setFiltered(layingHens)
            }
            else if (laying === false) {
                const nonLayingHens = hens.filter(hen => hen.layingStatusesId === 2)
                setFiltered(nonLayingHens)
            }
            else {
                setFiltered(hens)
            }
        },
        [hens, laying]
    )


    useEffect(
        () => {
            fetch(`http://localhost:8088/hens?_expand=breed`)
                .then(response => response.json())
                .then((henArray) => {
                    setHens(henArray)

                })
        },
        []
    )

    useEffect(
        () => {
            const myHens = hens.filter(hen => hen.userId === palaceUserObject.id)
            setFiltered(myHens)
        },
        [hens]
    )

    return <>
        <>
            <div>
                <button className="button" onClick={() => navigate("/hen/create")} >Add New Hen</button>
            </div>
        </>
        <>
            <button className="button" onClick={() => { setLaying(true) }} >Laying Hens</button>
            <button className="button" onClick={() => { setLaying(false) }} >Non-Laying Hens</button>
            <button className="button" onClick={() => { setLaying(null) }} >All Hens</button>
        </>
        <h2>List of Hens</h2>

        <article className="hens">
            <div className="hen-list">

                {
                    filteredHens.map(
                        (hen) => {
                            return <section className="hen" key={(`hen--${hen.id}`)}>
                                <div>
                                    <Link to={`/hens/${hen.id}`}>{hen.name}</Link>
                                </div>
                                <div className="hen-photo">
                                    <img src={hen.henPhoto} alt="Hen Photo" className="square-hen-image" />
                                </div>
                                <footer className="hen-footer">{hen?.breed?.name}</footer>
                            </section>
                        }
                    )
                }

            </div>
        </article>
    </>
}