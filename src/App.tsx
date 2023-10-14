import { useEffect, useState } from "react";
import "./App.css";
import { Form, Formik,Field } from "formik";
import React from "react";
import axios from "axios";

function App() {
 const [usersData, setUsersData] = useState([])
 const [userFinded, setUserFinded] = useState([])
 
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImplZnJ5ZGVwQGdtYWlsLmNvbSJ9.S2DfGJ14lJySLiOC8g2cc9WpshpeYFvV5PLedSDvHMs"
   
  const getAllUser = async ()=>{
    const response = await axios.get("http://localhost:3000/api/auth?limit=100")
    const res = response.data
    setUsersData(res)
    console.log(res)
  }

  const onSubmitFomr = (values:any)=>{
console.log(values.docNumber)
    const userFinded = usersData.find((user:any)=> user.documentNumber === values.docNumber)
    if(userFinded)
    setUserFinded(userFinded)


  }
  useEffect(() => {
     getAllUser()
  }, [ ])
  

  return (
    
      <div>
        <p>Hola mundo</p>
        <hr />

        <section style={{
          marginBottom:"200px"
        }}>
          <Formik
            initialValues={{
              docNumber: "",
            }}
            onSubmit={onSubmitFomr}
          >
            <Form>
              <Field name="docNumber" placeholder="Ingresa tu numero d dni"/>
            <button type="submit">Consultar</button>
            </Form>
          </Formik>

          <h4>Resultado de usuario: {userFinded.name}</h4>
        </section>
        <section>
          {
            usersData.map((user:any)=>(
              <p>
                {user.name}
              </p>
            ))
          }
        </section>
      </div>
     
  );
}

export default App;
