import { createConnection } from '@casper124578/mysql.ts'
import { Table } from 'react-bootstrap';
import style from '../../style/modules/users.module.css'

const database = "vrpfx"
const user = "root"

export async function getStaticPaths() {
    return {
        paths: [], //indicates that no page needs be created at build time
        fallback: 'blocking' //indicates the type of fallback
    }
}

export async function getStaticProps(req) {
    const user_id = req.params.user_id

    const db = await createConnection({ database, user }); 
    const users = await db.query().select(["*"]).from("vrp_user_identities").where("user_id", user_id).exec();
    const ranks = await db.query().select(["*"]).from("vrp_user_data").where("user_id", user_id).and("dkey", "vRP:datatable").exec();

    return {
        props: {
            users: JSON.stringify(users[0]),
            ranks: JSON.stringify(JSON.parse(ranks[0].dvalue).groups) 
        }
    }
}

export default function App({ users, ranks }) {
    const user = JSON.parse(users || {})
    const rank = Object.keys(JSON.parse(ranks || {}))
    return (
        <>
            <div className="bg-dark text-light users">
                <Table bordered variant="dark">
                    <thead className="draggable">
                        <tr>
                            <th>Firstname</th>
                            <th>Lastname</th>
                            <th>Phone</th>
                            <th>Age</th>
                            <th>Registration</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{user.firstname}</td>
                            <td>{user.name}</td>
                            <td>{user.phone}</td>
                            <td>{user.age}</td>
                            <td>{user.registration}</td>
                        </tr>
                    </tbody>
                </Table>
                <Table striped bordered variant="dark">
                    <thead>
                        <tr>
                            <th>Ranks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rank.map((v,k) => {
                            return (
                                <tr>
                                    <td>{v}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
            <div className="top">
                <a href="/home">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-90deg-left" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M1.146 4.854a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H12.5A2.5 2.5 0 0 1 15 6.5v8a.5.5 0 0 1-1 0v-8A1.5 1.5 0 0 0 12.5 5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4z"/>
                    </svg>
                </a>
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