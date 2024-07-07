import React from 'react'

const Alert = (props) => {
    const capitalize = (word) =>{
        if(word==="danger"){
            word="error"
        }else if(word==="primary"){
            word="success"
        }
        const lower = word.toLowerCase()
        return word.charAt(0).toUpperCase()+lower.slice(1)
    }
    return (
        <div style={{height: "50px"}}>
                {props.alert && <div className={`alert alert-${props.alert.type}`} role="alert">
                    <strong>{capitalize(props.alert.type)}</strong> : {props.alert.message}
                </div>}
            </div>
    )
}

export default Alert
