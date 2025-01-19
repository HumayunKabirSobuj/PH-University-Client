import { useGetAllSemestersQuery } from "../../../redux/features/academicSemester/academicSemesterApi";

const AcademicSemester = () => {
  const {data} = useGetAllSemestersQuery(undefined);
  console.log('Academic Semester data => ', data)
  return (
    <div>
      <h1>This is Academic Semester Components</h1>
    </div>
  );
};

export default AcademicSemester;
