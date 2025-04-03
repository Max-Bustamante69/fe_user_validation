import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import ValidationForm from '@/components/ValidationForm';
import Card from '@/components/Card';

function UserValidation() {

    const [session, setSession] = useState(null);
    const [status, setStatus] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const sessionId = sessionStorage.getItem("sessionId");

    const fetchSessionData = async () => {
        const response = await axios.get(
          `http://127.0.0.1:8000/kyc/api/session/${sessionId}`
        );

        const sessionData = response.data;
        setSession(sessionData);
        setStatus({ message: "Session data fetched successfully", type: "success" });
    }


    useEffect(() => {
       fetchSessionData()
    }, [])

  return (
    <Card className="flex flex-col gap-12 shadow-xl">
      <div>
        <h1 className="text-3xl text-primary font-bold ">
          Formulario de Validacion
        </h1>
        <h2 className="text-lg text-primary-text font-semibold">
          Valida tu identidad 
        </h2>
      </div>
      <ValidationForm user={session?.personal_data} />
    </Card>
  );
}

export default UserValidation
