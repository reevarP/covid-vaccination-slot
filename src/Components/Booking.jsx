import React, { useEffect } from "react";
import { useState } from "react";

const Booking = () => {
    const [district, setDistrict] = useState([]);
    const [slotsdatas, setSlotsDatas] = useState([]);
    const [statesplace, setStatesPlace] = useState([]);
    const getSlotData = async (value) => {
        let today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        console.log(today);
        const response2 = await fetch(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${value}&date=${dd}-${mm}-${yyyy}`);
        const slotdata = await response2.json();
        console.log(slotdata);
        setSlotsDatas(slotdata.sessions);
    }
    const getStateData = async () => {
        const response3 = await fetch("https://cdn-api.co-vin.in/api/v2/admin/location/states");
        const statedata = await response3.json();
        setStatesPlace(statedata.states);
    }
    const getDistrictData = async (value) => {
        const response = await fetch(`https://cdn-api.co-vin.in/api/v2/admin/location/districts/${value}`);
        const districtdata = await response.json();
        console.log(districtdata);
        setDistrict(districtdata.districts);
    }

    const showDist = (event) => {
        getSlotData(event.target.value);
    }

    const showStates = (event) => {
        getDistrictData(event.target.value);
    }

    useEffect(() => {
        getStateData();
        // getSlotData();
        // getStateData();
    }, [])
    return (
        <>
            <div className="wholewebsite">
                <div className="container">
                    <h1>Vaccination Booking slot</h1>
                    <div className="content">
                        <select onChange={event => { showStates(event) }}>
                            <option disabled hidden selected>States</option>
                            {statesplace.map((eachstate, index) => {
                                return(
                                    <option key={index} value={eachstate.state_id}>{eachstate.state_name}</option>
                                );
                            })}
                        </select>
                        <select onChange={event => { showDist(event) }}>
                            <option disabled hidden selected>District</option>
                            {district.map((eachdistrict, index) => {
                                return (
                                    <option key={index} value={eachdistrict.district_id}>{eachdistrict.district_name}</option>
                                );
                            })}
                        </select>
                        <div className="receiveddata">
                            {slotsdatas.map((eachdata) => {
                                return(
                                    <div className="infocard">
                                        <div className="dataline">
                                            <span className="title">Address--</span><span>{eachdata.name}, {eachdata.district_name}, {eachdata.state_name}-{eachdata.pincode}</span>
                                        </div>
                                        <div className="dataline">
                                            <span className="title">Available Capacity Dose 1--</span><span>{eachdata.available_capacity_dose1}</span>
                                        </div>
                                        <div className="dataline">
                                            <span className="title">Available Capacity Dose 2--</span><span>{eachdata.available_capacity_dose2}</span>
                                        </div>
                                        <div className="dataline">
                                            <span className="title">Vaccine--</span><span>{eachdata.vaccine}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Booking;