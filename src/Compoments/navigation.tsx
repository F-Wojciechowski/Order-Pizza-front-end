import {Link} from "react-router-dom";
import React from 'react';

interface Props {
    links: string[]
}

export const Navigation = ({links}: Props) => {
    return (
        <>
            {links.map(el => <Link key={el} to={"/" + el}>{el} </Link>)}
        </>
    )
}