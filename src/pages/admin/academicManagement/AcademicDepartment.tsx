import { Button, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useGetAllDepartmentQuery } from "../../../redux/features/admin/academicManagement.api";
import { TAcademicDepartment } from "../../../types/academicManagement.type";

export type TTableData = Pick<TAcademicDepartment, "name" | "academicFaculty">;

const AcademicDepartment = () => {
  const {
    data: academicDepartment,
    isLoading,
    isFetching,
  } = useGetAllDepartmentQuery(undefined);

  console.log("Data =>", { academicDepartment, isLoading, isFetching });

  const tableData = academicDepartment?.data?.map(
    ({
      _id,
      name,
      academicFaculty,
    }: {
      _id: string;
      name: string;
      academicFaculty: {name:string};
    }) => ({
      key: _id,
      name,
      academicFaculty: academicFaculty.name,
    })
  );
  const columns: ColumnsType<{
    key: string;
    name: string;
    academicFaculty: string;
  }> = [
    {
      title: "Academic Department Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Academic Faculty Name",
      dataIndex: "academicFaculty",
      key: "academicFaculty",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button onClick={() => handleUpdate(record.key)}>Update</Button>
      ),
    },
  ];

  const handleUpdate = (id: string) => {
    console.log(`Update clicked for ID: ${id}`);
  };

  return (
    <div>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        rowKey="key"
      />
    </div>
  );
};

export default AcademicDepartment;
