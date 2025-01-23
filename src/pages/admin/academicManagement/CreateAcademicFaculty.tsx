import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useAddAcademicFacultyMutation } from "../../../redux/features/admin/academicManagement.api";

const CreateAcademicFaculty = () => {
  const [addAcademicFaculty] = useAddAcademicFacultyMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");

    // console.log(data);
    try {
      const facultyData = {
        name: data.facultyName,
      };

      // console.log(facultyData);
      await addAcademicFaculty(facultyData)

      // await addAcademicFaculty(facultyData);
      toast.success("Faculty Created successfully!", { id: toastId });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errors = error?.data?.errorSources || [
        "An unexpected error occurred",
      ];
      // console.log(errors.forEach(error(error.massage)));
      errors.forEach((error: { path: string; message: string }) => {
        toast.error(` ${error.path}: ${error.message}`); // Log only the error message
      });
    }
  };

  return (
    <div>
      <Flex justify="center" align="center">
        <Col span={12}>
          <PHForm onSubmit={onSubmit}>
            <PHInput type="text" name="facultyName" label="Faculty Name" />
            <Button htmlType="submit" type="primary">
              Submit
            </Button>
          </PHForm>
        </Col>
      </Flex>
    </div>
  );
};

export default CreateAcademicFaculty;
