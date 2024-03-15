import { useNavigate } from "react-router-dom";
import { getMyStatus, getRequests, logOut, verifyToken } from "../API";
import { useEffect, useState } from "react";

export function Requirements() {

    const navigate = useNavigate();
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const tokenValid = await verifyToken();
            if (!tokenValid) {
                logOut(navigate)
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const requestsData = await getRequests();
                setRequests(requestsData);
                console.log('Requests Data:', requestsData); 
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchRequests();
    }, []);

    const handleUpdate = async (requestId, newStatus) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Token not found');
                return;
            }

            const response = await fetch(`http://127.0.0.1:8000/catalog/requests/${requestId}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ status: newStatus }), // Enviar o novo status
            });

            if (!response.ok) {
                throw new Error('Failed to update request status');
            }

            // Atualiza a lista de pedidos após a atualização
            const updatedRequests = requests.map(request =>
                request.id === requestId ? { ...request, status: newStatus } : request
            );
            setRequests(updatedRequests);

            console.log('Request status updated successfully!');
        } catch (error) {
            console.error('Error updating request status:', error);
        }
    };

    return(
        <>
            <h1>Requirements</h1>
            <ul>
                {requests.map((request) => (
                    <li key={request.id}>
                        <p>ID: {request.id}</p>
                        <p>User: {request.user.first_name} {request.user.last_name}</p>
                        <p>Book: {request.book.title}</p>
                        <p>Status: {request.status} 
                            <button onClick={() => handleUpdate(request.id, 'FULFILLED')}>Mark as Fulfilled</button>
                            <button onClick={() => handleUpdate(request.id, 'CANCELLED')}>Cancel</button>
                        </p> 
                        <p>Request Date: {request.request_date}</p> 
                        <hr />
                    </li>
                ))}
            </ul>
        </>
        
    )
}