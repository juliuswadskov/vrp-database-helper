import { createConnection } from '@casper124578/mysql.ts'
import { Table } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { GrRefresh, IoMdClose } from 'react-icons/Gr';
import { useState } from 'react';

export async function getStaticProps() {
    const database = "vrpfx"
    const user = "root"

    const db = await createConnection({ database, user }); 
    const results = await db.query().select(["*"]).from("vrp_users").exec();

    return { props: { users: JSON.stringify(results)} }
}

export default function app({ users }) {
    const [getUsers, setUsers] = useState(users)
    return (
        <>
            <div className="bg-dark text-light users">
                <Table striped bordered variant="dark">
                    <thead>
                        <tr className="draggable">
                            <th>Id</th>
                            <th>Banned</th>
                            <th>Whitelisted</th>
                            <th>Ban Reason</th>
                            <th style={{
                                width: "147px"
                            }}>Mere</th>
                        </tr>
                    </thead>
                    <tbody>
                        {JSON.parse(getUsers).map((v) => {
                            return (
                                <tr>
                                    <td>{v.id}</td>
                                    <td className={v.banned ? "text-success" : "text-warning"}>{v.banned ? "true" : "false"}</td>
                                    <td className={v.whitelisted ? "text-success" : "text-warning"}>{v.whitelisted ? "true" : "false"}</td>
                                    <td>{v.ban_reason}</td>
                                    <td style={{
                                        width: "fit-content"
                                    }}><a href={"/users/" + v.id} className="btn btn-primary">Se oplysninger</a></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
            <div className="top">
                <button onClick={() => {
                    fetch(`/api/users`, {
                        method: "GET"
                    }).then(res => {
                        console.log(res.json().then(res => {
                            console.log(res)
                            setUsers(JSON.stringify(res))
                        }))
                    })
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-repeat" viewBox="0 0 16 16">
                        <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
                        <path fill-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>
                    </svg>
                </button>
                
                <button onClick={() => {
                    window.top.close(); return false
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                        <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"/>
                    </svg>
                </button>
            </div>
        </>
    )
} 