import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
const ProfilePage = () => {
  const getUsers = async () => {
    return fetch("http://localhost:3001/users").then((res) => res.json());
  };
  // const handleEdit = (userId: number) => {};
  // const handleDelete = async (userId: number) => {
  //   try {
  //     await fetch(`http://localhost:3001/users/${userId}`, {
  //       method: "DELETE",
  //     });
  //   } catch (error) {
  //     console.error("Error deleting user:", error);
  //   }
  // };
  // const navigate = useNavigate();
  const getUser = useQuery({
    queryKey: ["userData"],
    queryFn: getUsers,
  });
  const updateUser = async (formData: FormData) => {
    const userId = formData.get("userId");
    const username = formData.get("username");
    if (!userId || !username) {
      throw new Error("Invalid form data");
    }
    const res = await fetch(`http://localhost:3001/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: userId, name: username }),
    });
    if (!res.ok) {
      throw new Error("Failed to update user");
    }
    return res.json();
  };
  const queryClient = useQueryClient();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    newPostMutation.mutate(formData);
  };
  const newPostMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      console.log("User updated successfully");
      queryClient.invalidateQueries({ queryKey: ["userData"] });
    },
  });
  // const userDeleteMutation = useMutation({
  //   mutationFn: handleDelete,
  //   onSuccess: () => {
  //     console.log("User deleted successfully");
  //     queryClient.invalidateQueries({ queryKey: ["userData"] });
  //   },
  // });
  return (
    <div style={{ height: "100%" }}>
      <h1>User Data</h1>
      {getUser.data?.map((user: any) => (
        <div
          key={user.id}
          style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}
        >
          <p style={{ flex: 1, margin: 0 }}>
            <span>{user.id}. </span>
            {user.name}
          </p>
       
       
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <input type="number" name="userId" />
        <input type="text" placeholder="Enter user name" name="username" />
       
      </form>
     
    </div>
  );
};
export default ProfilePage;
