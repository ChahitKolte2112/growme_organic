import { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import Department from "../component/Department";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PostData } from "../utils/interfaces";
const Home = () => {
    const [load, setload] = useState<boolean>(true);
    const navigate = useNavigate();
    const [data, setData] = useState<PostData[]>([]);
    const [details, setDetails] = useState<any>({});

    const columns: GridColDef[] = [
        { field: "id", headerName: "id", width: 50 },
        {
            field: "userId",
            headerName: "userId",
            width: 100,
            editable: false,
        },
        {
            field: "title",
            headerName: "title",
            width: 200,
            editable: true,
        },
        {
            field: "body",
            headerName: "body",
            type: "string",
            width: 555,
            editable: false,
        },
    ];

    useEffect(() => {
        const fetchData: any = async () => {
            const result: any = await axios.get(
                "https://jsonplaceholder.typicode.com/posts"
            );
            setData(result?.data);
            setload(false);
        };
        fetchData();
        
        if(localStorage.getItem("userdetails")){
            const obj :any= localStorage.getItem("userdetails");
            const temp: any = JSON.parse(obj);
            setDetails(temp);
        }
    }, []);

    return (
        <div style={{ backgroundColor: "#f8f4f3" }}>
            <div
                style={{
                    backgroundColor: "#c6a79f",
                    display: "flex",
                    justifyContent: "flex-end",
                    gap:"20px",
                    padding: "5px",
                }}
            >
                <div>
                    <h4>{"Welcome " + details?.name + " (" + details?.email +") "}</h4>
                </div>
                <Button
                    sx={{ color: "white", border: "2px solid whitesmoke",fontSize:"12px",padding:"5px" ,lineHeight:0,fontWeight:"bold"}}
                    onClick={() => {
                        localStorage.clear();
                        navigate("/");
                    }}
                >
                    LOGOUT
                </Button>
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "30px",
                    marginBottom: "90px",
                }}
            >
                <Box
                    sx={{
                        height: "500px",
                        width: "60%",
                    }}
                >
                    <h1>Posts</h1>
                    <DataGrid
                        rows={data}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 5,
                                },
                            },
                        }}
                        sx={{cursor:"pointer"}}
                        showColumnVerticalBorder
                        showCellVerticalBorder
                        rowHeight={75}
                        loading={load}
                        disableRowSelectionOnClick
                    />
                </Box>
            </div>

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "30px",
                }}
            >
                <Box
                    sx={{
                        width: { sm: "80%", sx: "100%", md: "60%", lg: "60%" },
                    }}
                >
                    <h1>Departments</h1>
                    <Department />
                </Box>
            </div>
        </div>
    );
};

export default Home;
