import { useState } from "react"
import { HenSearch } from "./HenSearch"
import { HenList } from "./HenList"
//import { HenSearchBreed } from "./HenSearchBreed"

export const HenContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return <>
        <HenSearch setterFunction={setSearchTerms} />
        <HenList searchTermState={searchTerms} />
    </>
}