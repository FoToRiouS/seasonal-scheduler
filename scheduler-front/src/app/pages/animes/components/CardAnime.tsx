import React, {ReactNode} from "react";
import {Col} from "react-bootstrap";

interface ICardAnimeProps {
    image: string,
    jpnName: string,
    engName: string
    children?: ReactNode
}
export const CardAnime: React.FC<ICardAnimeProps> = ({image, jpnName, engName, children}) => {
    return (
        <Col className={"d-flex flex-column align-items-center"}>
            <img src={image} alt={jpnName}/>
            <span className="text-danger">{jpnName}</span>
            <span className="text-danger">{engName}</span>
            <span className={"bg-black text-light"}>
                {children}
            </span>
        </Col>
    )
}