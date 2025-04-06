import Avatar1 from "@/assets/avatars/avatar-1.png";
import Avatar2 from "@/assets/avatars/avatar-2.png";
import Avatar3 from "@/assets/avatars/avatar-3.png";
import Avatar4 from "@/assets/avatars/avatar-4.png";
import Avatar5 from "@/assets/avatars/avatar-5.png";
import Avatar6 from "@/assets/avatars/avatar-6.png";
import Avatar7 from "@/assets/avatars/avatar-7.png";

const profilePictureMapping = {
  "avatar-1": Avatar1,
  "avatar-2": Avatar2,
  "avatar-3": Avatar3,
  "avatar-4": Avatar4,
  "avatar-5": Avatar5,
  "avatar-6": Avatar6,
  "avatar-7": Avatar7,
};

function getProfilePicture(
  value:
    | "avatar-1"
    | "avatar-2"
    | "avatar-3"
    | "avatar-4"
    | "avatar-5"
    | "avatar-6"
    | "avatar-7"
) {
  return profilePictureMapping[value];
}

export default getProfilePicture;
