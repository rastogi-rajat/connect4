import React from "react";
import "./gridItem.css";

export default class GridItem extends React.PureComponent {
    cellClick = () => {
        console.log("row ",this.props.row)
        console.log("col ",this.props.col)
        console.log("data ",this.props.data)
        this.props.action(this.props.col)
    }
    render() {
        let classType = "";
        if(this.props.data) {
            classType = this.props.data.color ==="red"? "cells-red": "cells-blue"
        }
        return (
            <div key={`${this.props.row}-${this.props.col}`} className={`cells ${classType}`} onClick = {this.cellClick}>
                
            </div>
        )
    }
}