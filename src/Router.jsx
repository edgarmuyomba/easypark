import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import App from "./components/App/App";
import Users from "./components/Users/Users";
import Sessions from "./components/Sessions/Sessions";
import ParkingLots from "./components/ParkingLots/ParkingLots";
import Sensors from "./components/Sensors/Sensors";
import ParkingLot from "./components/ParkingLot/ParkingLot";
import User from "./components/User/User";
import Reports from "./components/Reports/Reports";

export default function Router() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <App />,
            children: [
                {
                    // index: true,
                    path: 'dashboard/',
                    element: <Dashboard />
                },
                {
                    index: true,
                    path: 'parking_lots/',
                    element: <ParkingLots />
                },
                {
                    path: 'sessions/',
                    element: <Sessions />
                },
                {
                    path: 'users/',
                    element: <Users />
                },
                {
                    path: 'sensors/',
                    element: <Sensors />
                },
                {
                    path: 'reports/',
                    element: <Reports />
                }
            ]
        },
        {
            path: 'parking_lot/:uuid/',
            element: <ParkingLot />
        },
        {
            path: 'user/:user_id/',
            element: <User />
        }
    ]);

    return <RouterProvider router={router} />
}