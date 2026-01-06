import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import MinistryRequest from '../pages/MinistryRequest';
import Gallery from '../pages/Gallery';
import PrayerSharing from '../pages/PrayerSharing';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ministry-request" element={<MinistryRequest />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/prayer" element={<PrayerSharing />} />
        </Routes>
    );
};

export default AppRoutes;
