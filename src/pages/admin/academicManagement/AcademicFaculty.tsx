import { Button, Table, TableColumnsType } from "antd";
import { TAcademicFaculty } from "../../../types/academicManagement.type";
import { useGetAllFacultyQuery } from "../../../redux/features/admin/academicManagement.api";

export type TTableData = Pick<TAcademicFaculty, "name">;

const AcademicFaculty = () => {
  const {
    data: academicFaculty,
    isLoading,
    isFetching,
  } = useGetAllFacultyQuery(undefined);

  console.log({ academicFaculty, isLoading, isFetching });

  const tableData = academicFaculty?.data?.map(
    ({ _id, name }: { _id: string; name: string }) => ({
      key: _id,
      name,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: " Academic Faculty Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Action",
      key: "x",
      render: (record) => (
        <div>
          <Button onClick={() => handleUpdate(record.key)}>Update</Button>
        </div>
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

export default AcademicFaculty;
