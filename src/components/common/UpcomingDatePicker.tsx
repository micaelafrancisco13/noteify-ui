import { useState } from "react";
import { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/lab";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import AdapterDayjs from "@mui/lab/AdapterDayjs";

function UpcomingDatePicker() {
    const [value, setValue] = useState<Dayjs | null>(null);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker", "DatePicker"]}>
                <DemoItem label="Responsive variant">
                    <DatePicker
                        value={value}
                        onChange={(newValue) => setValue(newValue)}
                    />
                </DemoItem>
            </DemoContainer>
        </LocalizationProvider>
    );
}

export default UpcomingDatePicker;
