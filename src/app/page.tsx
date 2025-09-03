import UsersTable from "@/components/users-table";
import { getUsers } from "@/server/users";
import AddUserBtn from "@/components/crud_buttons/add-user-btn";

export default async function Home() {
  const users = await getUsers();

  return (
    <div>
      <div className="flex flex-col gap-4 max-w-7xl mx-auto p-4 md:p-24">
        <h1 className="text-2xl font-bold">Users</h1>
        <div className="flex justify-end">
          <AddUserBtn />
        </div>
        <UsersTable users={users} />

      </div>

    </div>
  );
}
