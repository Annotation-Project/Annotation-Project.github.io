import React from 'react';
import './App.css';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import PrivateRoute from "./helpers/PrivateRoutes";
import {Authentication} from "./components/Authentication";
import {Dashboard} from "./components/Dashboard";
import {Project} from "./components/Project";

export const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/authentication" element={<Authentication />} />
                <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
                <Route path="/projects/:id" element={<PrivateRoute element={<Project />} />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />

            </Routes>
        </BrowserRouter>
    )
}
