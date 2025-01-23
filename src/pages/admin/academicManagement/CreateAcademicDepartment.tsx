/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, Divider, Row } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import {
  useAddAcademicDepartmentMutation,
  useGetAllFacultyQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

const CreateAcademicDepartment = () => {
  const [addAcademicDepartment] = useAddAcademicDepartmentMutation();
  const { data: facultyData } = useGetAllFacultyQuery(undefined);
  const facultyOptions = facultyData?.data?.map((item: any) => ({
    value: item._id,
    label: item.name,
  }));

  console.log(facultyData);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");

    try {
      const departmentData = {
        name: data.name,
        academicFaculty: data.academicFaculty,
      };

      console.log(departmentData);

      await addAcademicDepartment(departmentData);
      toast.success("Academic Department Created successfully", {
        id: toastId,
      });
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
      <Row justify="center">
        <Col span={24}>
          <PHForm onSubmit={onSubmit}>
            <Divider>Create Academic Department</Divider>
            <Row gutter={8}>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput type="text" name="name" label="Academic Department" />
              </Col>
            </Row>

            <Row gutter={8}>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHSelect
                  options={facultyOptions || []}
                  // disabled={isLoading}
                  name="academicFaculty"
                  label="Academic Faculty"
                />
              </Col>
            </Row>

            <Button htmlType="submit">Submit</Button>
          </PHForm>
        </Col>
      </Row>
    </div>
  );
};

export default CreateAcademicDepartment;
