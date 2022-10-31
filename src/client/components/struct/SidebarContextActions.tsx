import React from "react"

type Props = {
    type?: string
    additionalInfo?: {}
}

export default function contextActions(props: Props) {
    if (props.type === 'Default' || props.type === undefined) {
        return(
            <ul>
                <li>
                    No actions here.
                </li>
            </ul>
        )
    }

    return (<></>)
}