import React from "react";

export interface TableLoaderProps {
    rows?: number;
}

const FormLoader: React.FC<TableLoaderProps> = ({rows = 4}) => {
    return (
        <div className="ph-item">
            <div className="ph-col-12">
                <div className="ph-row mb-4">
                    <div className="ph-col-2 big mr-4"/>
                </div>
                <div className="ph-row mb-4">
                    <div className="ph-col-6 big mr-4"/>
                </div>
            </div>
            <div className="ph-col-12">
                <div className="ph-row mb-4">
                    <div className="ph-col-2 big mr-4"/>
                </div>
                <div className="ph-row mb-4">
                    <div className="ph-col-6 big mr-4"/>
                </div>
            </div>
            <div className="ph-col-12">
                <div className="ph-row mb-4">
                    <div className="ph-col-2 big mr-4"/>
                </div>
                <div className="ph-row mb-4">
                    <div className="ph-col-6 big mr-4"/>
                </div>
            </div>
            <div className="ph-col-12">
                <div className="ph-row mb-4">
                    <div className="ph-col-2 big mr-4"/>
                </div>
                <div className="ph-row mb-4">
                    <div className="ph-col-6 big mr-4"/>
                </div>
            </div>
            <div className="ph-col-12">
                <div className="ph-row mb-4">
                    <div className="ph-col-2 big mr-4"/>
                </div>
                <div className="ph-row mb-4">
                    <div className="ph-col-6 big mr-4"/>
                </div>
            </div>
        </div>
    )
}

export default FormLoader;
