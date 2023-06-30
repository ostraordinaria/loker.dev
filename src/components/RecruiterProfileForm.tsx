import { type z } from "zod";
import {
  type RecruiterProfile,
  type Location,
  type Profile,
} from "@prisma/client";
import { type recruiterProfileSchema } from "~/pages/profile/recruiter";

const RecruiterProfileForm = ({
  existingProfile,
  handleSubmit,
  fetchingLocations,
  locations,
  isSubmitting,
  formErrors,
}: {
  existingProfile: Profile & RecruiterProfile;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  fetchingLocations: boolean;
  locations: Location[];
  isSubmitting: boolean;
  formErrors: Partial<z.infer<typeof recruiterProfileSchema>>;
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
              defaultValue={existingProfile.name}
            />
            {formErrors.name && (
              <p className="mt-1 text-xs text-red-500">{formErrors.name}</p>
            )}
          </div>
          <div className="mb-4 flex flex-col">
            <label className="mb-1">Contact:</label>
            <input
              className={formErrors.contact ? "input-error input" : "input"}
              type="text"
              name="contact"
              placeholder="Contact info"
              defaultValue={existingProfile.contact}
            />
            {formErrors.contact && (
              <p className="mt-1 text-xs text-red-500">{formErrors.contact}</p>
            )}
          </div>
          <div className="mb-4 flex flex-col">
            <label className="mb-1">Company Name:</label>
            <input
              className={formErrors.companyName ? "input-error input" : "input"}
              type="text"
              name="companyName"
              placeholder="Company name"
              defaultValue={existingProfile.companyName}
            />
            {formErrors.companyName && (
              <p className="mt-1 text-xs text-red-500">
                {formErrors.companyName}
              </p>
            )}
          </div>
          <div className="mb-4 flex flex-col">
            <label className="mb-1">Company Size:</label>
            <select
              className={
                formErrors.companySize ? "select-error select" : "select"
              }
              defaultValue={existingProfile.companySize}
              name="companySize"
            >
              <option defaultValue="" disabled>
                Select Size
              </option>
              {["<10", "11-50", "50+"].map((size) => (
                <option key={size}>{size}</option>
              ))}
            </select>
            {formErrors.companySize && (
              <p className="mt-1 text-xs text-red-500">
                {formErrors.companySize}
              </p>
            )}
          </div>
          <div className="mb-4 flex flex-col">
            <label className="mb-1">Company Industry:</label>
            <input
              className={
                formErrors.companyIndustry ? "input-error input" : "input"
              }
              type="text"
              name="companyIndustry"
              placeholder="Company industry"
              defaultValue={existingProfile.companyIndustry}
            />
            {formErrors.companyIndustry && (
              <p className="mt-1 text-xs text-red-500">
                {formErrors.companyIndustry}
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
                defaultValue={existingProfile.locationId || ""}
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
          <div className="mb-4 flex flex-col">
            <label className="mb-1">Website:</label>
            <input
              className={formErrors.website ? "input-error input" : "input"}
              type="text"
              name="website"
              placeholder="Website url"
              defaultValue={existingProfile.website}
            />
            {formErrors.website && (
              <p className="mt-1 text-xs text-red-500">{formErrors.website}</p>
            )}
          </div>
          <div className="mb-4 flex flex-col">
            <label className="mb-1">About the company:</label>
            <textarea
              name="bio"
              className={
                formErrors.bio ? "textarea-error textarea" : "textarea"
              }
              placeholder="Describe about the company"
              defaultValue={existingProfile.bio}
            />
            {formErrors.bio && (
              <p className="mt-1 text-xs text-red-500">{formErrors.bio}</p>
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

export default RecruiterProfileForm;
