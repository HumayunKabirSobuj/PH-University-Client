import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { semesterOptions } from "../../../constants/semester";
import { monthOptions } from "../../../constants/global";

import { zodResolver } from "@hookform/resolvers/zod";

import { academicSemesterSchema } from "../../../schemas/academicManagement.schema";
// const semesterOptions = [
//   {
//     value: "01",
//     label: "Autumn",
//   },
//   {
//     value: "02",
//     label: "Summer",
//   },
//   {
//     value: "03",
//     label: "Fall",
//   },
// ];

const currentYear = new Date().getFullYear();
const yearOptions = [0, 1, 2, 3, 4].map((number) => ({
  value: String(currentYear + number),
  label: String(currentYear + number),
}));
console.log(yearOptions);

const CreateAcademicSemester = () => {
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    const name = semesterOptions[Number(data?.name) - 1]?.label;
    const semesterData = {
      name: name,
      code: data?.name,
      year: data?.year,
      startMonth: data?.startMonth,
      endMonth: data?.endMonth,
    };
    console.log(semesterData);
  };

  

  return (
    <Flex justify="center" align="center" >
      <Col lg={8} md={24} sm={24}>
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicSemesterSchema)}
        >
          <PHSelect label="Name" name={"name"} options={semesterOptions} />
          <PHSelect label="Year" name={"year"} options={yearOptions} />
          <PHSelect
            label="Start Month"
            name={"startMonth"}
            options={monthOptions}
          />
          <PHSelect
            label="End Month"
            name={"endMonth"}
            options={monthOptions}
          />
          <Flex justify="center" align="center">
            <Button type="primary" style={{ width: "100%" }} htmlType="submit">
              Submit
            </Button>
          </Flex>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
