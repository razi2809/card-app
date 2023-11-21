import React, { memo, useState } from "react";
import { Avatar, Box, Fab } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";

import SaveChangeButton from "./SaveChangeButton";
const UsersTableComponent = ({ onDeleteuser, dataOfUsers, users, loading }) => {
  const [myData, setMyData] = useState(dataOfUsers);
  const [rowId, SetRowId] = useState("");
  const columns = [
    {
      field: "avatar",
      headerName: "avatar",
      renderCell: (params) => <Avatar src={params.row.avatar} />,
      sortable: false,
      filterable: false,
      width: 60,
    },
    {
      field: "firstName",
      headerName: "First Name",
      editable: true,
      width: 100,
    },

    {
      field: "lastName",
      headerName: "Last Name",
      editable: true,
      width: 100,
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
    },
    {
      field: "phone",
      headerName: "Phone",
      editable: true,
      width: 130,
    },
    {
      field: "id",
      headerName: " user id",
      width: 220,
    },
    {
      field: "country",
      headerName: "country",
      editable: true,

      // renderCell: (params) => moment(params.row.createdAt).format(`DD-MM-yyyy`),
      width: 150,
    },
    {
      field: "action",
      headerName: "actton",
      renderCell: (params) => (
        <Box sx={{ display: "flex" }}>
          {" "}
          <SaveChangeButton params={params} rowId={rowId} users={users} />
          <Fab
            sx={{ ml: 1, height: 40, width: 40 }}
            color="secondary"
            aria-label="delete"
            onClick={() => handleDeleteuser(params.row.id)}
          >
            <DeleteIcon fontSize="large" />
          </Fab>
        </Box>
      ),
      width: 110,
    },
  ];

  const handleDeleteuser = (id) => {
    const updatedRows = myData.filter((row) => row.id !== id);
    setMyData(updatedRows);
    onDeleteuser(id);
  };

  return (
    <div style={{ width: "100%" }} sx={{}}>
      <DataGrid
        rows={myData}
        columns={columns}
        getRowId={(row) => row.id}
        // pageSizeOptions={[10, 20, 30, 100]}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[5, 10, 25]}
        onCellEditStop={(params) => {
          SetRowId(params.id);
        }}
        loading={loading}
        // onCellEditStop={(params) => SetnewValues(params)}
      />
    </div>
  );
};

export default memo(UsersTableComponent);
