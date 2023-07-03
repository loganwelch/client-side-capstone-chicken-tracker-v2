import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UploadWidget from '../UploadWidget'


export const HenForm = () => {
    const [hen, update] = useState({
        userId: 0,
        breedId: 0,
        name: "",
        dateHatched: "",
        layingStatusesId: 0,
        notes: "",
        henPhoto: "",
    });

    const [userId, setUserId] = useState(0);
    useEffect(() => {
        const palaceUser = localStorage.getItem("palace_user");
        if (palaceUser !== null) {
            setUserId(JSON.parse(palaceUser).id);
        }
    }, []);

    const navigate = useNavigate()
    const [breeds, setBreeds] = useState([])
    const [layingStatuses, setLayingStatuses] = useState([])
    // const [picturePreview, setPicturePreview] = useState(null)
    // const [pictureAsFile, setPictureAsFile] = useState(null)



    // const uploadPicture = (e) => {
    //     const file = e.target.files[0];

    //     if (file) {
    //         setPicturePreview(URL.createObjectURL(file));
    //         setPictureAsFile(file);

    //         update((prevHen) => ({
    //             ...prevHen,
    //             henPhoto: file.name,
    //         }));
    //     }
    // };


    // const handleSaveButtonClick = (event) => {
    //     event.preventDefault();
    //     console.log("You clicked the button");

    //     if (
    //         userId !== 0 &&
    //         hen.breedId !== 0 &&
    //         hen.name !== "" &&
    //         hen.dateHatched !== "" &&
    //         hen.layingStatusesId !== 0
    //     ) {
    //         return fetch(`http://localhost:8088/hens`, {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify(hen),
    //         })
    //             .then((response) => response.json())
    //             .then(() => {
    //                 navigate("/hens");
    //             });
    //     }
    // };
    const handleSaveButtonClick = (event) => {
        event.preventDefault();
        console.log("You clicked the button");

        const henToSendToAPI = {
            userId: userId,
            breedId: hen.breedId,
            name: hen.name,
            dateHatched: hen.dateHatched,
            layingStatusesId: hen.layingStatusesId,
            notes: hen.notes,
            henPhoto: hen.henPhoto,
        };


        henToSendToAPI.userId = userId;
        if (
            userId !== 0 &&
            hen.breedId !== 0 &&
            hen.name !== "" &&
            hen.dateHatched !== "" &&
            hen.layingStatusesId !== 0
        ) {
            return fetch(`http://localhost:8088/hens`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(henToSendToAPI),
            })
                .then((response) => response.json())
                .then(() => {
                    navigate("/hens");
                });

        }
    };

    useEffect(() => {
        fetch(`http://localhost:8088/breeds`)
            .then((response) => response.json())
            .then((hensArray) => {
                setBreeds(hensArray);
            });
    }, []);

    useEffect(() => {
        fetch(`http://localhost:8088/layingStatuses`)
            .then((response) => response.json())
            .then((chickensArray) => {
                setLayingStatuses(chickensArray);
            });
    }, []);




    return (
        <form className="henForm" onSubmit={handleSaveButtonClick}>
            <h2 className="henForm__title">New Hen Addition</h2>

            <fieldset>
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        required
                        autoFocus
                        type="text"
                        className="form-control"
                        placeholder="What is the name of your new chicken?"
                        value={hen.name}
                        onChange={(evt) => {
                            const copy = { ...hen };
                            copy.name = evt.target.value;
                            update(copy);
                        }}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Breed:</label>
                    <select
                        required
                        autoFocus
                        className="form-control"
                        placeholder="Type of Breed"
                        value={hen.breedId}
                        onChange={(evt) => {
                            const copy = { ...hen };
                            copy.breedId = parseInt(evt.target.value);
                            update(copy);
                        }}
                    >
                        <option value="">Select Breed</option>
                        {breeds.map((breed) => (
                            <option key={breed.id} value={breed.id}>
                                {breed.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="dateHatched">Date Hatched:</label>
                    <input
                        required
                        autoFocus
                        type="date"
                        className="form-control"
                        placeholder="Date Hatched"
                        value={hen.dateHatched}
                        onChange={(evt) => {
                            const copy = { ...hen };
                            copy.dateHatched = evt.target.value;
                            update(copy);
                        }}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="layingStatuses">Laying Status:</label>
                    <select
                        required autoFocus
                        className="form-control"
                        placeholder="Laying Status"
                        value={hen.layingStatusesId}
                        onChange={(evt) => {
                            const copy = { ...hen };
                            copy.layingStatusesId = parseInt(evt.target.value);
                            update(copy);
                        }}
                    >
                        <option value="">Select Laying Status</option>
                        {layingStatuses.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.status}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="notes">Notes:</label>
                    <textarea
                        className="form-control"
                        placeholder="Additional Notes"
                        value={hen.notes}
                        onChange={(evt) => {
                            const copy = { ...hen };
                            copy.notes = evt.target.value;
                            update(copy);
                        }}
                    ></textarea>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="photo">Photo URL:</label>
                    <textarea
                        className="form-control"
                        placeholder="Photo URL here"
                        value={hen.henPhoto}
                        onChange={(evt) => {
                            const copy = { ...hen };
                            copy.henPhoto = evt.target.value;
                            update(copy);
                        }}
                    ></textarea>
                </div>
            </fieldset>


            <button type="submit" className="btn btn-primary">
                Save Hen
            </button>
        </form>
    );
};


// <fieldset>
//     <div className="form-group"
//         type="file">
//         <label htmlFor="henPhoto">Upload Hen Photo:</label>
//         <UploadWidget onFileSelect={uploadPicture} />

//         {picturePreview && (
//             <img src={picturePreview} alt="Preview" />
//         )}
//     </div>
// </fieldset>
{/* <div className="form-group">
<label htmlFor="henPhoto">Upload Hen Photo:</label>
<input
type="file"
accept=".jpg, .jpeg, .png"
onChange={uploadPicture}
/>
{picturePreview && (
    <img
    src={picturePreview}
    alt="Preview"
    className="henForm__preview"
    />
    )}
</div> */}


// const uploadPicture = (e) => {
//     setPicturePreview(URL.createObjectURL(e.target.files[0]));
//     setPictureAsFile(e.target.files[0]);

//     const copy = { ...hen };
//     copy.henPhoto = e.target.files[0].name;
//     update(copy);
// };

// const setImageAction = () => {
//     const formData = new FormData();
//     formData.append("file", pictureAsFile);

//     const henToSendToAPI = {
//         userId: userId,
//         breedId: hen.breedId,
//         name: hen.name,
//         dateHatched: hen.dateHatched,
//         layingStatusesId: hen.layingStatusesId,
//         notes: hen.notes,
//         henPhoto: hen.henPhoto,
//     };

//     for (const key in henToSendToAPI) {
//         formData.append(key, henToSendToAPI[key]);
//     }

//     if (
//         userId !== 0 &&
//         hen.breedId !== 0 &&
//         hen.name !== "" &&
//         hen.dateHatched !== "" &&
//         hen.layingStatusesId !== 0
//     ) {
//         return fetch("http://localhost:8088/hens", {
//             method: "POST",
//             body: formData,
//         })
//             .then((response) => response.json())
//             .then(() => {
//                 navigate("/hens");
//             });
//     }
// };