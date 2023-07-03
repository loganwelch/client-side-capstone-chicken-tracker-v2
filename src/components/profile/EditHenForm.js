import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./EditHenForm.css"

export const EditHenForm = () => {
    const { henId } = useParams()
    const [hen, updateHen] = useState({
        userId: 0,
        breedId: 0,
        name: "",
        dateHatched: "",
        layingStatusesId: 0,
        notes: "",
        henPhoto: ""
    })

    const [breeds, setBreeds] = useState([])
    const [layingStatuses, setLayingStatuses] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        fetch(`http://localhost:8088/hens/${henId}`)
            .then(response => response.json())
            .then((data) => {

                updateHen(data)
            })
    }, [henId])

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        return fetch(`http://localhost:8088/hens/${hen.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(hen)
        })
            .then(response => response.json())
            .then(() => {
                navigate(`/hens/${hen.id}`)
            })
    }

    useEffect(
        () => {
            fetch(`http://localhost:8088/breeds`)
                .then(response => response.json())
                .then((hensArray) => {
                    setBreeds(hensArray)
                })
        },
        []
    )
    useEffect(
        () => {
            fetch(`http://localhost:8088/layingStatuses`)
                .then(response => response.json())
                .then((chickensArray) => {
                    setLayingStatuses(chickensArray)
                })
        },
        []
    )


    return (
        <>
            <form className="profile">
                <h2 className="profile__title">Edit Hen Profile</h2>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            value={hen.name}
                            onChange={
                                (evt) => {
                                    const copy = { ...hen }
                                    copy.name = evt.target.value
                                    updateHen(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="breed">Breed:</label>
                        <select
                            required autoFocus
                            className="form-control"
                            value={hen.breedId}
                            onChange={
                                (evt) => {
                                    const copy = { ...hen }
                                    copy.breedId = parseInt(evt.target.value)
                                    updateHen(copy)
                                }
                            }>
                            <option value="" defaultValue>Change Breed Type</option>
                            {breeds.map(item => (
                                <option value={item.id} key={item.id}>{item.name}</option>
                            ))}
                        </select>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="dateHatched">Date Hatched:</label>
                        <input
                            required autoFocus
                            type="date"
                            className="form-control"
                            value={hen.dateHatched}
                            onChange={
                                (evt) => {
                                    const copy = { ...hen }
                                    copy.dateHatched = evt.target.value
                                    updateHen(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="layingStatus">Laying Status:</label>
                        <select
                            required autoFocus
                            className="form-control"
                            value={hen.layingStatusesId}
                            onChange={
                                (evt) => {
                                    const copy = { ...hen }
                                    copy.layingStatusesId = parseInt(evt.target.value)
                                    updateHen(copy)
                                }
                            }>
                            <option value="" defaultValue>Change Laying Status</option>
                            {layingStatuses.map(item => (
                                <option value={item.id} key={item.id}>{item.status}</option>
                            ))}
                        </select>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="name">Behavioral Notes:</label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            value={hen.notes}
                            onChange={
                                (evt) => {
                                    const copy = { ...hen }
                                    copy.notes = evt.target.value
                                    updateHen(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="photo">Photo URL:</label>
                        <textarea
                            required autoFocus
                            type="text"
                            className="form-control"
                            value={hen.henPhoto}
                            onChange={
                                (evt) => {
                                    const copy = { ...hen }
                                    copy.henPhoto = evt.target.value
                                    updateHen(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <button
                    onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                    className="btn btn-primary">
                    Save Hen Profile
                </button>
            </form>
        </>
    )
}

                // <fieldset>
                //     <div className="form-group">
                //         <label htmlFor="henPhoto">Hen Photo:</label>
                //         <input
                //             type="file"
                //             accept="image/*"

                //             onChange={uploadPicture}
                //             className="form-control"
                //         />
                //         {picturePreview && (
                //             <img
                //                 src={hen.henPhoto}
                //                 alt="Preview"
                //                 className="form-control"
                //             />
                //         )}
                //     </div>
                // </fieldset>