import { FormControlLabel, Grid, Radio, Stack, Typography, } from "@mui/material";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import CustomTextField from "../custom/CustomTextField.tsx";
import { useNavigate, useParams } from "react-router-dom";
import CustomRadioGroup from "../custom/CustomRadioGroup.tsx";
import { useEffect, useState } from "react";
import CustomDatePicker from "../custom/CustomDatePicker.tsx";
import SwitchComponent from "../common/SwitchComponent.tsx";
import CustomButton from "../custom/CustomButton.tsx";
import { format, startOfDay } from "date-fns";
import { Note } from "../../services/note-service.ts";
import useNotes from "../../hooks/useNotes.ts";
import useCategories from "../../hooks/useCategories.ts";

const schema = z.object({
    _id: z.string().optional(),
    title: z.string().min(1, { message: "Title is required" }).max(255),
    description: z
        .string()
        .min(1, { message: "Description is required" })
        .max(255_000),
    categoryId: z.enum(
        [
            "6480a60e62d3456b1289f58a", // Personal
            "6480a62a62d3456b1289f58c", // Work
            "6480a64562d3456b1289f592", // School
            "6480a66262d3456b1289f594", // Home
        ],
        {
            errorMap: () => ({ message: "A category must be selected" }),
        }
    ),
    dateCreated: z.date().optional(),
    dateLastModified: z.date().optional(),
    upcomingDate: z
        .date({
            invalid_type_error: "Upcoming date of task is required",
        })
        .min(startOfDay(new Date()), {
            message: "Date from the past is not valid",
        }),
});

export type NoteFormData = z.infer<typeof schema>;

interface Props {
    drawerToggle: boolean;
}

function NoteForm({ drawerToggle }: Props) {
    const { id } = useParams();
    const navigate = useNavigate();

    const useFormMethods = useForm<NoteFormData>({
        defaultValues: {
            title: "",
            description: "",
            categoryId: "6480a66262d3456b1289f594",
            upcomingDate: startOfDay(new Date()),
        },
        resolver: zodResolver(schema),
    });
    const { handleSubmit, reset, resetField, setValue, watch } = useFormMethods;

    const [upcoming, setUpcoming] = useState(false);
    const [, setCategoryName] = useState("");
    const [, setOriginalUpcomingDate] = useState("");

    const { categories } = useCategories();
    const {
        currentNote,
        createNote,
        isCreatingNote,
        updateNote,
        isUpdatingNote,
        noteErrorMessage,
        noteStatusCode,
    } = useNotes(id);

    useEffect(() => {
        if (id) {
            setInitialFormState();

            if (id === "new") return;

            if (noteStatusCode === 404) return navigate("/not-found");

            if (!noteErrorMessage && currentNote) populateForm(currentNote);
        }
    }, [id, currentNote, noteErrorMessage, noteStatusCode]);

    useEffect(() => {
        if (!upcoming) {
            resetField("upcomingDate");
        }
    }, [upcoming]);

    const setInitialFormState = () => {
        reset();
        setUpcoming(false);
        setCategoryName("");
        setOriginalUpcomingDate("");
    };

    const populateForm = (note: Note) => {
        setValue("_id", note._id);
        setValue("title", note.title);
        setValue("description", note.description);
        setValue("categoryId", note.category._id as NoteFormData["categoryId"]);
        setValue("dateCreated", new Date(note.dateCreated));
        setValue("dateLastModified", new Date(note.dateLastModified));
        setValue("upcomingDate", new Date(note.upcomingDate));
        setUpcoming(true);
        setCategoryName(note.category.name);
        setOriginalUpcomingDate(note.upcomingDate);
    };

    const handleOnSubmitNote = (data: NoteFormData) => {
        const withTimezone = {
            ...data,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        };
        if (id === "new") createNote(withTimezone, navigate);
        else updateNote(withTimezone, navigate);
    };

    const dateCreated = watch("dateCreated");
    const dateLastModified = watch("dateLastModified");
    // const past = isBefore(
    //   startOfDay(new Date(originalUpcomingDate)),
    //   startOfDay(new Date())
    // );
    // console.log("archive note?", past);

    return (
        <>
            <FormProvider {...useFormMethods}>
                <form
                    onSubmit={handleSubmit((data) => {
                        handleOnSubmitNote(data);
                        reset();
                    })}
                    autoComplete="off"
                >
                    <Stack spacing={4}>
                        {/*{past && (*/}
                        {/*  <Typography color={"primary"}>*/}
                        {/*    Archived notes cannot be edited but they can be deleted.*/}
                        {/*  </Typography>*/}
                        {/*)}*/}
                        <CustomTextField
                            label="Title"
                            // InputProps={{
                            //   readOnly: past,
                            // }}
                        />
                        <Stack spacing={1}>
                            <CustomTextField
                                label="Description"
                                multiline
                                rows={7}
                                // InputProps={{
                                //   readOnly: past,
                                // }}
                            />
                            {dateCreated && dateLastModified && (
                                <Stack sx={{ color: "#E0E0E0" }}>
                                    <Typography variant="caption">
                                        {`Created on: ${format(
                                            new Date(dateCreated),
                                            "EEE MMMM dd, yyyy 'at' hh:mm a"
                                        )}`}
                                    </Typography>
                                    <Typography variant="caption">
                                        {`Last modified on: ${format(
                                            new Date(dateLastModified),
                                            "EEE MMMM dd, yyyy 'at' hh:mm a"
                                        )}`}
                                    </Typography>
                                </Stack>
                            )}
                        </Stack>
                        <CustomRadioGroup label="Category" name="categoryId">
                            {categories.map((c) => (
                                <FormControlLabel
                                    key={c._id}
                                    value={c._id}
                                    control={<Radio/>}
                                    label={c.name}
                                />
                            ))}
                        </CustomRadioGroup>
                        {/*{!past ? (*/}
                        {/*  <CustomRadioGroup label="Category" name="categoryId">*/}
                        {/*    {categories.map((c) => (*/}
                        {/*      <FormControlLabel*/}
                        {/*        key={c._id}*/}
                        {/*        value={c._id}*/}
                        {/*        control={<Radio />}*/}
                        {/*        label={c.name}*/}
                        {/*      />*/}
                        {/*    ))}*/}
                        {/*  </CustomRadioGroup>*/}
                        {/*) : (*/}
                        {/*  <Typography variant="body2">Category: {categoryName}</Typography>*/}
                        {/*)}*/}
                        <Grid container>
                            {id === "new" && (
                                // {(id === "new" || !past) && (
                                <Grid
                                    item
                                    sm={drawerToggle ? 12 : 6}
                                    md={6}
                                    sx={{ width: "100%" }}
                                >
                                    <SwitchComponent
                                        label="Upcoming task"
                                        checked={upcoming}
                                        onChange={(value) => setUpcoming(value)}
                                    />
                                </Grid>
                            )}
                            <Grid
                                item
                                sm={drawerToggle ? 12 : 6}
                                md={6}
                                sx={{ width: "100%" }}
                            >
                                {upcoming && (
                                    <CustomDatePicker
                                        label="Date of task"
                                        name="upcomingDate"
                                        // past={past}
                                    />
                                )}
                            </Grid>
                        </Grid>
                        <CustomButton
                            type="submit"
                            variant="contained"
                            drawerToggle={drawerToggle}
                            maxWidth="220px"
                            disabled={isCreatingNote || isUpdatingNote}
                            // disabled={past || isCreatingNote || isUpdatingNote}
                            sx={{ fontWeight: "700" }}
                        >
                            {isCreatingNote || isUpdatingNote ? "Submitting..." : "Submit"}
                        </CustomButton>
                    </Stack>
                </form>
            </FormProvider>
        </>
    );
}

export default NoteForm;
