import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Menu from './Menu';
import Busket from './Busket';
import ErrorPage from './components/ErrorPage/errorPage';
import { useTelegram } from './components/hooks/useTelegram';

async function Auth() {
    const { tg } = useTelegram.getTelegramData();
    const initData = tg.initData;
    return axios.post('http://127.0.0.1:3002/auth/check_init_data', {
        initData: initData
    })
    .then(response => response)
    .catch(error => {
        throw new Response(error.response.data.err, {status: 401});
    })
} 

const router = createBrowserRouter([
    {   
        path: "/",
        element: <Menu/>,
        errorElement: <ErrorPage/>,
        loader: async () => {
            const data = await Auth();
            useTelegram.setTelegramData.setUserId(data);
            return null;
        }

    },
    {
        path: "/busket",
        element: <Busket/>,
        errorElement: <ErrorPage/>,
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);