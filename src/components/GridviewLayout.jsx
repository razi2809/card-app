import { ToggleButton, ToggleButtonGroup, Tooltip } from "@mui/material";
import React, { useState } from "react";
import GridOnIcon from "@mui/icons-material/GridOn";
import TocOutlinedIcon from "@mui/icons-material/TocOutlined";
import { useNavigate, useSearchParams } from "react-router-dom";
const GridviewLayout = ({ handleDevices }) => {
  const [searchParams] = useSearchParams();
  const WhatPage = parseInt(searchParams.get("page")) || 1;
  const WhatView = searchParams.get("view") || "table";
  const [layout, setLayout] = useState(WhatView);
  const navigate = useNavigate();

  const handleDevicesChange = (event, newDevices) => {
    if (newDevices) {
      if (newDevices == "grid") {
        handleDevices(newDevices);
        navigate(`/sandbox?page=${WhatPage}&view=${newDevices}`);
      } else {
        navigate(`/sandbox?view=${newDevices}`);
        handleDevices(newDevices);
      }
      setLayout(newDevices);
    }
  };
  return (
    <ToggleButtonGroup
      value={layout}
      onChange={handleDevicesChange}
      aria-label="device"
      exclusive
    >
      <ToggleButton
        value="grid"
        aria-label="grid"
        sx={{ borderRadius: "30%", mr: 0, height: 1 }}
      >
        <Tooltip title="grid view" placement="top">
          <GridOnIcon />
        </Tooltip>
      </ToggleButton>

      <ToggleButton
        value="table"
        aria-label="table"
        sx={{ borderRadius: "30%", height: 1 }}
      >
        <Tooltip title="table view" placement="top">
          <TocOutlinedIcon />
        </Tooltip>
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default GridviewLayout;
