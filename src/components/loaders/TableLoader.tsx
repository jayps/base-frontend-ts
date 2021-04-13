import React from "react";

export interface TableLoaderProps {
    rows?: number;
}

const TableLoader: React.FC<TableLoaderProps> = ({rows = 4}) => {
    const generateRows = () => {
        const output = [];

        for (let i = 0; i < rows; i++) {
            output.push(
                <div className="ph-row mb-4" style={{display: "flex", justifyContent: "center"}}>
                    <div className="ph-col-2 big mr-4"></div>
                    <div className="ph-col-2 big mr-4"></div>
                    <div className="ph-col-2 big mr-4"></div>
                    <div className="ph-col-2 big mr-4"></div>
                    <div className="ph-col-2 big mr-4"></div>
                </div>
            )
        }

        return output;
    }

    return (
        <div className="ph-item">
            <div className="ph-col-12">
                {generateRows()}
            </div>
        </div>
    )
}

export default TableLoader;
