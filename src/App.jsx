import React from 'react';
import './App.css';
import {HashRouter, Navigate, Route, Routes} from "react-router-dom";
import PrivateRoute from "./helpers/PrivateRoutes";
import {Authentication} from "./components/Authentication/Authentication";
import {Dashboard} from "./components/Dashboard";
import {Project} from "./components/Project";

export const App = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path="/authentication" element={<Authentication />} />
                <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
                <Route path="/projects/:id" element={<PrivateRoute element={<Project />} />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
        </HashRouter>
    )
}
