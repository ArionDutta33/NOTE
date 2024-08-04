import { getInitials } from "../../Utils/helper";

const ProfileInfo = () => {
  return (
    <div className=" flex items-center gap-3">
      <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100">
        {getInitials(" John William")}
      </div>
      <div>
        <p className="text-sm font-medium">William</p>
        <button className="text-sm font-text-slate-700 underline">
          Lougout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
