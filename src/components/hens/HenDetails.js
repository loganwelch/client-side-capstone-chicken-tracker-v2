import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./HenDetails.css"

export const HenDetails = () => {
    const { henId } = useParams()
    const [hen, setHen] = useState({})
    const navigate = useNavigate()


    useEffect(
        () => {
            fetch(`http://localhost:8088/hens?_expand=breed&_expand=layingStatuses&id=${henId}`)
                .then(response => response.json())
                .then((data) => {
                    const singleHen = data[0]
                    setHen(singleHen)
                })
        },
        [henId]
    )

    const deleteButton = () => {
        return <button onClick={() => {
            fetch(`http://localhost:8088/hens/${henId}`, {
                method: "DELETE"
            })
                .then(() => {
                    navigate("/hens")
                })
        }} className="hen__delete">Delete Hen</button>
    }

    return <>
        <div className="centered-page">
            <div className="whole-page">
                <div className="page-container">
                    <section className="hen-details-photo-container">
                        <img src={hen.henPhoto} alt="Hen Photo" className="hen-details-photo" />
                    </section>
                    <section className="henCard" key={(`hen--${hen.id}`)}>
                        <header className="henCard__header">
                            <span className="hen-name">{hen.name}</span>
                        </header>
                        <div>Breed: {hen?.breed?.name}</div>
                        <div>Date Hatched: {hen.dateHatched}</div>
                        <div>Laying Status: {hen?.layingStatuses?.status}</div>
                        <div>Behavioral Notes: {hen.notes}</div>
                    </section>
                </div>
                <section>
                    <div className="hen__footer">
                        {
                            <button className="footer-button" onClick={() => navigate(`/profile/edit/${henId}`)} >Edit Hen</button>
                        }
                        {
                            <button className="footer-button">{deleteButton()}</button>
                        }
                    </div>
                </section>
            </div>
        </div>
    </>
}