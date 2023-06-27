import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { ZodError, z } from "zod";
import Authenticated from "~/components/Authenticated";
import Layout from "~/components/Layout";
import { api } from "~/utils/api";

export const developerProfileSchema = z.object({
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
    .refine((value) => value !== null, {
      message: "Please select location",
    }),
  repoUrl: z.string().optional(),
  personalSiteUrl: z.string().optional(),
});

const CreateDeveloperProfile = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [formErrors, setFormErrors] = useState<
    Partial<z.infer<typeof developerProfileSchema>>
  >({});

  const { data: isProfileExist } = api.profile.isProfileExist.useQuery();
  if (isProfileExist) {
    router.push("/");
  }
  const { data: locations, isLoading } = api.location.getAll.useQuery();
  const { mutate, isLoading: isSubmitting } =
    api.profile.registerDeveloper.useMutation({
      onSuccess: () => {
        toast.success("Profile created");
        router.push("/profile");
      },
      onError: (e) => {
        if (e.message) {
          toast.error(e.message);
        } else {
          toast.error("Something went wrong! Please try again later.");
        }
      },
    });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);

    try {
      const data = {
        username: formData.get("username"),
        bio: formData.get("bio"),
        availability: formData.get("availability"),
        location: formData.get("location"),
        name: formData.get("name"),
        repoUrl: formData.get("repoUrl"),
        personalSiteUrl: formData.get("personalSiteUrl"),
      };
      const developerProfile = developerProfileSchema.parse(data);
      mutate(developerProfile);
    } catch (error) {
      if (error instanceof ZodError) {
        setFormErrors(error.formErrors.fieldErrors);
      }
    }
  };

  return (
    <Authenticated>
      <Layout>
        <div className="main-container flex !max-w-7xl flex-col justify-center">
          <h1 className="text-3xl">
            {session?.user ? "Complete your profile" : "Profile"}
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <>
                <div className="mb-4 flex flex-col">
                  <label className="mb-1">Name:</label>
                  <input
                    type="text"
                    className={formErrors.name ? "input-error input" : "input"}
                    name="name"
                    placeholder="Your name"
                  />
                  {formErrors.name && (
                    <p className="mt-1 text-xs text-red-500">
                      {formErrors.name}
                    </p>
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
                    <p className="mt-1 text-xs text-red-500">
                      {formErrors.bio}
                    </p>
                  )}
                </div>

                <div className="mb-4 flex flex-col">
                  <label className="mb-1">Repo profile:</label>
                  <input
                    name="repoUrl"
                    className={
                      formErrors.repoUrl ? "input-error input" : "input"
                    }
                    placeholder="GitHub profile or similar"
                  />
                  {formErrors.repoUrl && (
                    <p className="mt-1 text-xs text-red-500">
                      {formErrors.repoUrl}
                    </p>
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
                    <option value="" disabled>
                      Select Availability
                    </option>
                    <option value="ACTIVELY_LOOKING">Actively Looking</option>
                    <option value="CASUALLY_LOOKING">Casually Looking</option>
                    <option value="NOT_OPEN">Not Open</option>
                  </select>
                  {formErrors.availability && (
                    <p className="mt-1 text-xs text-red-500">
                      {formErrors.availability}
                    </p>
                  )}
                </div>
                <div className="mb-4 flex flex-col">
                  <label className="mb-1">Location:</label>
                  {isLoading ? (
                    <span className="loading loading-spinner loading-lg"></span>
                  ) : (
                    <select
                      className={
                        formErrors.location ? "select-error select" : "select"
                      }
                      name="location"
                      defaultValue={""}
                    >
                      <option value="" disabled>
                        Select Location
                      </option>
                      {locations?.map((location) => (
                        <option key={location.id} value={location.id}>
                          {location.remote ? "Remote" : location.city}
                        </option>
                      ))}
                    </select>
                  )}
                  {formErrors.location && (
                    <p className="mt-1 text-xs text-red-500">
                      {formErrors.location}
                    </p>
                  )}
                </div>
              </>
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
      </Layout>
    </Authenticated>
  );
};

export default CreateDeveloperProfile;
