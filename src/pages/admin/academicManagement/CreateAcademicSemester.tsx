import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";

const nameOptions = [
  {
    value: "01",
    label: "Autumn",
  },
  {
    value: "02",
    label: "Summer",
  },
  {
    value: "03",
    label: "Fall",
  },
];

const CreateAcademicSemester = () => {
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    const name = nameOptions[Number(data?.name) - 1].label;
    const semesterData = {
      name: name,
      code: data?.name,
    };
    console.log(semesterData);
  };

  return (
    <Flex justify="center" align="center" >
      <Col span={6}>
        <PHForm onSubmit={onSubmit}>
          <PHSelect label="Name" name={"name"} options={nameOptions} />
          <PHSelect label="Year" name={"year"} options={nameOptions} />
          <PHSelect label="Start Month" name={"startMonth"} options={nameOptions} />
          <PHSelect label="End Month" name={"endMonth"} options={nameOptions} />
          <Flex justify="center" align="center">
            <Button type="primary" style={{width:"100%"}} htmlType="submit">Submit</Button>
          </Flex>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
