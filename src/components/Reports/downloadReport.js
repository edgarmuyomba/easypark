

export default downloadReport = (type, data) => {
    switch (type) {
        case "Occupancy Trends":
            break;
        case "Revenue Analysis":
            break;
        case "Time Analysis":
            break;
        case "Usage Patterns":
            exportToExcel(data, 'Usage Patterns');
            break;
        case "Peak Usage Hours":
            break;
        case "Session Duration":
            break;
        case "Session Distribution":
            break;
        case "User Activity":
            break;
    }
}