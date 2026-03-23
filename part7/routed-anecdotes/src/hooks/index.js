import { useState } from "react";

export const useField = (name) => {
    const [value, setValue] = useState('')

    const onChange = ({ target }) => {
        setValue(target.value)
    }

    const reset = ()=> {
        setValue('')
    }


    return {
        name,
        value,
        onChange,
        reset
    }
}