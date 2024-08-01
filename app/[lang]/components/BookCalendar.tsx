"use client";
import { useEffect, useState } from "react";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import { usePathname } from "next/navigation";
import { DateCalendar } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/fr";
import {
  Box,
  Card,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Input,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { getDictionary } from "@/get-dictionaries";

type Slot = {
  slot_start: string;
  slot_end: string;
};

export default function Calendar() {
  const currentLang = usePathname().split("/")[1];
  const dictionary = getDictionary(currentLang);

  const [date, setDate] = useState<string | null>(
    new Date().toISOString().split("T")[0]
  );
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedLaneNumber, setSelectedLaneNumber] = useState<number | string>(
    ""
  );
  const laneNumbers = [1, 2, 3, 4, 5, 6, 7, 8];

  useEffect(() => {
    (async () => {
      if (date && selectedLaneNumber) {
        console.log("Fetching slots for date:", date);
        try {
          const response = await fetch(
            `/api/available-slots?date=${date}&noLanes=${selectedLaneNumber}`
          );
          const data = await response.json();
          console.log("API response:", data);
          if (data) {
            const filteredSlots = data.filter((slot) => {
              console.log(Object.values(slot)[0]);
              if (Object.values(slot)[0] >= selectedLaneNumber) return slot;
            });
            console.log(filteredSlots);
            setSlots(filteredSlots);
          } else {
            setSlots([]);
          }
          console.log(slots);
        } catch (error) {
          console.error("Error fetching slots:", error);
        }
      }
    })();
  }, [date, selectedLaneNumber]);

  const handleDateChange = (newDate: any) => {
    if (newDate) {
      const formattedDate = newDate.toISOString().split("T")[0];
      setDate(formattedDate);
    }
  };

  const handleLaneNumberChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setSelectedLaneNumber(event.target.value as number);
  };

  const renderRow = ({ index, style }: ListChildComponentProps) => {
    const slot = slots[index];
    return (
      <ListItem style={style} key={index} component="div">
        <ListItemButton>
          {
            <ListItemText
              primary={`
              ${Object.keys(slot)[0]} 
              ${Object.values(slot)[0]} lanes available`}
            />
          }
        </ListItemButton>
      </ListItem>
    );
  };

  return (
    <>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        adapterLocale={currentLang}
      >
        <Box display="flex" flexDirection="column" alignItems="center">
          <Box sx={{ pb: 5 }}>
            <Typography variant="h5">{dictionary["calendar"].title}</Typography>
          </Box>
          <Box display="flex" alignItems="flex-start" mt={2}>
            <Box sx={{ pr: 5 }}>
              <DateCalendar onChange={(newDate) => handleDateChange(newDate)} />
            </Box>
            <Box
              sx={{
                width: 300,
                height: 400,
                bgcolor: "background.paper",
                marginLeft: 2,
              }}
            >
              <Box sx={{ pb: 5 }}>
                <FormControl fullWidth>
                  <InputLabel
                    id="number-select-label"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: "80%",
                      height: "100%",
                    }}
                  >
                    {dictionary["calendar"].timeDropDown}
                  </InputLabel>
                  <Select
                    labelId="number-select-label"
                    id="number-select"
                    value={selectedLaneNumber}
                    label="Number"
                    onChange={handleLaneNumberChange}
                  >
                    {laneNumbers.map((laneNumber) => (
                      <MenuItem key={laneNumber} value={laneNumber}>
                        {laneNumber}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              {/* <Box sx={{ pb: 5 }}>
                <FormControl fullWidth>
                  <InputLabel
                    id="number-select-label"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: "80%",
                      height: "100%",
                    }}
                  >
                    {dictionary["calendar"].timeDropDown}
                  </InputLabel>
                  <Select
                    labelId="number-select-label"
                    id="number-select"
                    value={selectedLaneNumber}
                    label="Number"
                    onChange={handleLaneNumberChange}
                  >
                    {laneNumbers.map((laneNumber) => (
                      <MenuItem key={laneNumber} value={laneNumber}>
                        {laneNumber}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box> */}
              <Card>
                {selectedLaneNumber && slots.length > 0 && (
                  <FixedSizeList
                    height={400}
                    width={300}
                    itemSize={50}
                    itemCount={slots.length}
                    overscanCount={5}
                  >
                    {renderRow}
                  </FixedSizeList>
                )}
              </Card>
              {/* <Typography>{dictionary["calendar"].tileSlots}</Typography> */}
            </Box>
          </Box>
        </Box>
      </LocalizationProvider>
    </>
  );
}
