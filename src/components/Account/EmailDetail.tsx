import CustomTextField from "../custom/CustomTextField.tsx";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import EditOffIcon from "@mui/icons-material/EditOff";
import { styled } from "@mui/material/styles";
import {
  getEmailDetail,
  updateEmailDetail,
} from "../../services/emailDetail.ts";

const StyledBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export type EmailDetailFormData = z.infer<typeof schema>;

interface Props {
  submitButton: ReactNode;
}

function EmailDetail({ submitButton }: Props) {
  const [isEditable, setIsEditable] = useState(false);
  const [initialValue, setInitialValue] = useState<EmailDetailFormData>();

  const useFormMethods = useForm<EmailDetailFormData>({
    defaultValues: { email: "" },
    resolver: zodResolver(schema),
  });

  const { handleSubmit, setValue, reset } = useFormMethods;

  useEffect(() => {
    if (!isEditable) {
      reset();

      setTimeout(() => {
        const { email } = getEmailDetail();
        setInitialValue({ email });
        setValue("email", email);
      }, 1000);
    }
  }, [isEditable]);

  const handleOnUpdateUser = (data: EmailDetailFormData) => {
    setIsEditable(false);
    if (initialValue?.email === data.email) return;
    updateEmailDetail(data);
  };

  return (
    <Box>
      <StyledBox>
        <Typography>Email address</Typography>
        <IconButton
          size="small"
          aria-label="Edit personal details"
          onClick={() => {
            setIsEditable(!isEditable);
          }}
        >
          {!isEditable ? <EditIcon /> : <EditOffIcon />}
        </IconButton>
      </StyledBox>
      <Divider sx={{ my: 1, mb: 4 }} />
      <FormProvider {...useFormMethods}>
        <form
          onSubmit={handleSubmit((data) => handleOnUpdateUser(data))}
          autoComplete="off"
          noValidate={true}
        >
          <Stack spacing={4}>
            <CustomTextField
              label="Email address"
              name="email"
              variant="filled"
              type="email"
              readOnly={!isEditable}
            />
            {isEditable && submitButton}
          </Stack>
        </form>
      </FormProvider>
    </Box>
  );
}

export default EmailDetail;
