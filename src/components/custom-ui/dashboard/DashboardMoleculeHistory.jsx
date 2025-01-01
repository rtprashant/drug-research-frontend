import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto'
const apiUrl = import.meta.env.VITE_BACKEND_URL;
function DashboardMoleculeHistory() {
  const [dashBoard, setDashBoard] = useState([])
  const [pending, setPending] = useState(0)
  const [rejected, setRejected] = useState(0)
  const [accepted, setAccepted] = useState(0)
  const chartRef = useRef()
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/v1/moleculeGenration/getMoleculeHistory`, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });
        setDashBoard(response.data.data);
     
      } catch (error) {
        console.error('Error fetching molecule history:', error);
      }
    };

    fetchHistory();
  }, []);
  useEffect(() => {
    const pendingCount = dashBoard.filter(molecule => molecule.status === "Pending").length;
    const rejectedCount = dashBoard.filter(molecule => molecule.status === "Rejected").length;
    const acceptedCount = dashBoard.filter(molecule => molecule.status === "Accepted").length;

    setPending(pendingCount);
    setRejected(rejectedCount);
    setAccepted(acceptedCount);
    
  }, [dashBoard ,pending ,rejected , accepted  ]);
  const data = {
    labels: ['Pending', 'Accepted', 'Rejected'],
    datasets: [
      {
        label: 'Molecule Status',
        data: [pending, accepted, rejected],
        backgroundColor: ['rgb(255, 205, 86)', 'rgb(75, 192, 192)', 'rgb(255, 99, 132)'],
        hoverOffset: 4,
      },
    ],
  };
  return (
    <div className='bg-white shadow-2xl rounded-xl w-[40vw] p-10'>
      <div className='font-bold text-2xl'>Molecule Status</div>
      {dashBoard.length > 0 ? (
        <div className='flex flex-col gap-1 mt-5'>
          <div className='h-[20vw] w-[20vw] flex ml-20'>
            <Doughnut
              data={data}
              ref={chartRef}
              options={{
                responsive: true,
              }}
              className=""
            />
          </div>

          <div className='flex gap-5 mt-5'>
            <h1 className='font-bold font-spaceGrotesk'>Total Genrated Molecule :</h1>
            <p> {dashBoard.length}</p>
          </div>
          <div className='flex gap-5'>
            <h1 className='font-bold font-spaceGrotesk text-yellow-500'>Pending :</h1>
            <p> {pending} </p>
          </div>
          <div className='flex gap-5'>
            <h1 className='font-bold font-spaceGrotesk text-green-500'>Accepted :</h1>
            <p> {accepted} </p>
          </div>
          <div className='flex gap-5'>
            <h1 className='font-bold font-spaceGrotesk text-red-500'>Rejected :</h1>
            <p> {rejected} </p>
          </div>
        </div>
      ) : (
        <div>Nothing To ShowCase Here</div>
      )
      }


    </div>
  )
}

export default DashboardMoleculeHistory
