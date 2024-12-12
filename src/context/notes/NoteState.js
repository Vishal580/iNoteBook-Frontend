import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const s1 = {
        "name": "vishal",
        "class": "5A"
    }

    const [state, setState] = useState(s1);

    const update = () =>{
        setTimeout(()=>{
            setState({
                "name": "Vishnu",
                "class": "6b"
            })
        }, 1000)
    }
    return(
     <NoteContext.Provider value={{state, update}}>
        {props.children}
     </NoteContext.Provider>
    )
}

export default NoteState;