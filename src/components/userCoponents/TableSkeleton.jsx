import axios from "axios";
import React, { memo, useEffect, useState } from "react";
import { Avatar, Box, Fab, Grid, Pagination, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";

const TableSkeleton = () => {
  const columns = [
    {
      field: "avatar",
      headerName: "avatar",
      renderCell: (params) => <Avatar src={params.row.Avatar} />,
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

      width: 150,
    },
    {
      field: "action",
      headerName: "actton",
      renderCell: (params) => (
        <Box sx={{ display: "flex" }}>
          {" "}
          <Box sx={{ position: "relative" }}>
            <Fab
              aria-label="save"
              color="primary"
              sx={{ height: 40, width: 40 }}
              disabled={true}
            >
              <SaveIcon />
            </Fab>
          </Box>{" "}
          <Fab
            sx={{ ml: 1, height: 40, width: 40 }}
            color="secondary"
            aria-label="delete"
          >
            <DeleteIcon fontSize="large" />
          </Fab>
        </Box>
      ),
      width: 110,
    },
  ];
  const placeholderData = Array(10)
    .fill()
    .map((_, i) => ({
      id: i,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      createdAt: "",
      avatar: "",
      country: "",
    }));

  return (
    <div style={{ width: "100%" }}>
      <DataGrid
        rows={placeholderData}
        columns={columns}
        getRowId={(row) => row.id}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[5, 10, 25]}
        loading={true}
      />
    </div>
  );
};

export default memo(TableSkeleton);
