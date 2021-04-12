import React from "react";
import DashboardContainer from "../../components/dashboard-container/DashboardContainer";

const Dashboard: React.FC = () => {
    return (
        <DashboardContainer>
            <h1>Dashboard</h1>
            <div>
                Welcome, person!
            </div>
        </DashboardContainer>
    )
}

export default Dashboard;