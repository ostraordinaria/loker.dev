import Link from "next/link";
import { api } from "~/utils/api";

const ProfileCompletion = () => {
  const { data: isProfileExist, isLoading } = api.profile.isProfileExist.useQuery();
  if (isLoading) return;
  if (!isProfileExist) {
    return (
      <div className="main-container flex flex-col">
        <div className="alert alert-info">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="h-6 w-6 shrink-0 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>

          <span>Please complete your profile to access more features</span>
          <div>
            <Link href="/profile/developer" className="btn-primary btn">
              I am a developer
            </Link>
          </div>
          <div>
            <Link href="/profile/recruiter" className="btn-primary btn">
              I am a recruiter
            </Link>
          </div>
        </div>
      </div>
    );
  }
};

export default ProfileCompletion;
