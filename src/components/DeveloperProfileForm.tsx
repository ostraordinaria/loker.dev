import {
  type DeveloperProfile,
  type Profile,
  type Location,
} from "@prisma/client";
import { z } from "zod";

const developerProfileSchema = z.object({
  name: z.string().nonempty(),
  username: z.string().optional(),
  bio: z.string().optional(),
  availability: z.enum(["ACTIVELY_LOOKING", "CASUALLY_LOOKING", "NOT_OPEN"], {
    errorMap: () => {
      return { message: "Please select your availability" };
    },
  }),
  location: z
    .string()
    .nullable()
    .refine((defaultValue) => defaultValue !== null, {
      message: "Please select location",
    }),
  repoUrl: z.string().optional(),
  personalSiteUrl: z.string().optional(),
});

const DeveloperProfileForm = ({
  existingProfile,
  handleSubmit,
  fetchingLocations,
  locations,
  isSubmitting,
  formErrors,
}: {
  existingProfile: Profile & DeveloperProfile;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  fetchingLocations: boolean;
  locations: Location[];
  isSubmitting: boolean;
  formErrors: Partial<z.infer<typeof developerProfileSchema>>;
}) => {
  return (
    <div className="main-container flex !max-w-7xl flex-col justify-center">
      <h1 className="text-3xl">
        {!existingProfile ? "Complete your profile" : "Profile"}
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <div className="mb-4 flex flex-col">
            <label className="mb-1">Name:</label>
            <input
              type="text"
              className={formErrors.name ? "input-error input" : "input"}
              name="name"
              placeholder="Your name"
            />
            {formErrors.name && (
              <p className="mt-1 text-xs text-red-500">{formErrors.name}</p>
            )}
          </div>
          <div className="mb-4 flex flex-col">
            <label className="mb-1">Username:</label>
            <input
              className={`input`}
              type="text"
              name="username"
              placeholder="Your preferred username"
            />
          </div>

          <div className="mb-4 flex flex-col">
            <label className="mb-1">Bio:</label>
            <textarea
              name="bio"
              className={
                formErrors.bio ? "textarea-error textarea" : "textarea"
              }
              placeholder="Tell recruiter about you"
            />
            {formErrors.bio && (
              <p className="mt-1 text-xs text-red-500">{formErrors.bio}</p>
            )}
          </div>

          <div className="mb-4 flex flex-col">
            <label className="mb-1">Repo profile:</label>
            <input
              name="repoUrl"
              className={formErrors.repoUrl ? "input-error input" : "input"}
              placeholder="GitHub profile or similar"
            />
            {formErrors.repoUrl && (
              <p className="mt-1 text-xs text-red-500">{formErrors.repoUrl}</p>
            )}
          </div>

          <div className="mb-4 flex flex-col">
            <label className="mb-1">Personal Website:</label>
            <input
              name="personalSiteUrl"
              className={
                formErrors.personalSiteUrl ? "input-error input" : "input"
              }
              placeholder="Personal website"
            />
            {formErrors.personalSiteUrl && (
              <p className="mt-1 text-xs text-red-500">
                {formErrors.personalSiteUrl}
              </p>
            )}
          </div>

          <div className="mb-4 flex flex-col">
            <label className="mb-1">Availability:</label>
            <select
              name="availability"
              className={
                formErrors.availability ? "select-error select" : "select"
              }
              defaultValue={""}
            >
              <option defaultValue="" disabled>
                Select Availability
              </option>
              <option defaultValue="ACTIVELY_LOOKING">Actively Looking</option>
              <option defaultValue="CASUALLY_LOOKING">Casually Looking</option>
              <option defaultValue="NOT_OPEN">Not Open</option>
            </select>
            {formErrors.availability && (
              <p className="mt-1 text-xs text-red-500">
                {formErrors.availability}
              </p>
            )}
          </div>
          <div className="mb-4 flex flex-col">
            <label className="mb-1">Location:</label>
            {fetchingLocations ? (
              <span className="loading loading-spinner loading-lg"></span>
            ) : (
              <select
                className={
                  formErrors.location ? "select-error select" : "select"
                }
                name="location"
                defaultValue={""}
              >
                <option defaultValue="" disabled>
                  Select Location
                </option>
                {locations?.map((location) => (
                  <option key={location.id} defaultValue={location.id}>
                    {location.remote ? "Remote" : location.city}
                  </option>
                ))}
              </select>
            )}
            {formErrors.location && (
              <p className="mt-1 text-xs text-red-500">{formErrors.location}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="btn bg-indigo-600 text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
};

export default DeveloperProfileForm;
