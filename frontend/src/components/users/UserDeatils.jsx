import { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Input } from "@material-tailwind/react";
import { useUpdateProfile } from "../../hooks";

const UserDetails = () => {
  const user = useSelector((state) => state.userDetails.user);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, update] = useUpdateProfile();
  const [userInput, setUserInput] = useState({
    name: user?.name || "",
    email: user?.email || "",
    image: user?.image || ""
  });

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setImagePreview(reader.result);
        setUserInput(prev => ({ ...prev, image: reader.result }));
      }
    };
    reader.readAsDataURL(file);
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      await update(userInput);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="h-[90vh] flex items-center justify-center">
      <div className="flex flex-col items-center p-4 mx-auto bg-blue-gray-50 shadow-lg rounded-lg lg:w-[30vw] md:w-[50vw] w-[70vw] gap-4">
        <img
          src={user.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkr94Z9oGA_KuzX9ghnsctIEudavAJJht_VUyCDUw6c8eBeijX1Hg1RA6ckmWhBVNUlx4&usqp=CAU"}
          alt="User Profile"
          className="w-20 h-20 rounded-lg object-cover"
        />

        <div className="text-lg w-full">
          <form className="flex flex-col gap-4" onSubmit={updateProfile}>
            <div>
              <Input
                type="file"
                onChange={handleFileChange}
                accept="image/*"
              />
              {imagePreview && (
                <img
                  className="w-10 h-10 mt-2 rounded object-cover"
                  src={imagePreview}
                  alt="Preview"
                />
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="name">Name</label>
              <Input
                id="name"
                value={userInput.name}
                onChange={(e) => setUserInput(prev => ({
                  ...prev,
                  name: e.target.value
                }))}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email">Email</label>
              <Input
                id="email"
                type="email"
                value={userInput.email}
                onChange={(e) => setUserInput(prev => ({
                  ...prev,
                  email: e.target.value
                }))}
              />
            </div>

            <div className="flex justify-center">
              <Button
                type="submit"
                className="lg:w-[9vw] w-[15vw]"
                disabled={loading}
              >
                {loading ? "Loading..." : "Update"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;