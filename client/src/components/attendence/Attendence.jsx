import React, { useState, useEffect } from 'react';
import './Attendence.styles.css'
import 'primeicons/primeicons.css';       

import { VirtualScroller } from 'primereact/virtualscroller';
 
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useParams } from "react-router-dom";
import { Button } from 'primereact/button';
import axios from 'axios';
import * as XLSX from 'xlsx';
import LoadingDemo from '../Buttons/Buttons';

        
export default function Attendance() {
    const [studentDetails, setStudentDetails] = useState([]);
    const { eventName } = useParams();  

    useEffect(() => {
        // Function to fetch student data
        const fetchStudentData = async () => {
            try {
                const response = await axios.get(`http://localhost:9000/fetchStudentData?eventName=${eventName}`);
                if (response.status === 200) {
                    setStudentDetails(response.data); // Update student data state
                }
            } catch (error) {
                console.error(error);
            }
        };

        // Fetch data initially
        fetchStudentData();

        // Set up polling to fetch data every 5 seconds
        const intervalId = setInterval(fetchStudentData, 10000);

        // Clean up interval on component unmount
        return () => clearInterval(intervalId);
    }, [eventName]); // Include eventName in the dependency array to re-trigger effect when it changes

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(studentDetails);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Student Details");
      
        XLSX.writeFile(workbook, "student_details.xlsx");
    };

    <script src="https://unpkg.com/primereact/primereact.all.min.js"></script>


    return (
        <div className="card  flex flex-wrap justify-content-center gap-3">
        <div className="uiop">
                <div  onClick={exportToExcel}>
        <LoadingDemo />
        </div>
        
            <DataTable value={studentDetails} showGridlines tableStyle={{ minWidth: '5rem' }}   
        paginator
        rows={20}
        rowsPerPageOptions={[20, 40, 50]}
        totalRecords={3}>
                <Column key="RegdNo" field="RegdNo" header="RegdNo" />
                <Column key="Branch" field="Branch" header="Branch" />
                <Column key="year" field="year" header="year" />
                <Column key="contactNo" field="contactNo" header="contactNo" />
                <Column key="email" field="email" header="email" />

            </DataTable>
            </div>


        </div>
    );
}
