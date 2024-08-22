import { UserActivityGetData } from "./UserActivityGetData";
import { UserAccountGetData } from "./UserAccountGetData";
import { MapGetData } from "./MapGetData";

export const UserActivityContent = () => {
  return (
    <div className="mt-24 mb-16 flex flex-col gap-5">
      <div className="flex justify-center">- Monitoring All Data -</div>
      <UserActivityGetData />
      <UserAccountGetData />
      <MapGetData />
    </div>
  );
};
