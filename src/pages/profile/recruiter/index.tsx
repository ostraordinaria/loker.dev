import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { ZodError, z } from "zod";
import Authenticated from "~/components/Authenticated";
import Layout from "~/components/Layout";
import { api } from "~/utils/api";

export const recruiterProfileSchema = z.object({
  name: z.string().nonempty({ message: "Required" }),
  contact: z.string().nonempty({ message: "Required" }),
  companyName: z.string().nonempty({ message: "Required" }),
  companySize: z.string().nonempty({
    message: "Please select company size",
  }),
  companyIndustry: z.string().nonempty({ message: "Required" }),
  location: z.string().nonempty({ message: "Please select location" }),
  website: z.string().url({ message: "Please enter a valid url" }),
  bio: z.string().nonempty({ message: "Required" }),
});

const Profile = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [formErrors, setFormErrors] = useState<
    Partial<z.infer<typeof recruiterProfileSchema>>
  >({});
  const { data: isProfileExist } = api.profile.isProfileExist.useQuery();
  if (isProfileExist) {
    router.push("/");
  }
  const { data: locations, isLoading } = api.location.getAll.useQuery();
  const { mutate, isLoading: isSubmitting } =
    api.profile.registerRecruiter.useMutation({
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
        name: formData.get("name"),
        contact: formData.get("contact"),
        companyName: formData.get("companyName"),
        companySize: formData.get("companySize") || "",
        companyIndustry: formData.get("companyIndustry"),
        location: formData.get("location") || "",
        website: formData.get("website"),
        bio: formData.get("bio"),
      };
      const recruiterProfile = recruiterProfileSchema.parse(data);
      mutate(recruiterProfile);
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
                <label className="mb-1">Contact:</label>
                <input
                  className={formErrors.contact ? "input-error input" : "input"}
                  type="text"
                  name="contact"
                  placeholder="Contact info"
                />
                {formErrors.contact && (
                  <p className="mt-1 text-xs text-red-500">
                    {formErrors.contact}
                  </p>
                )}
              </div>
              <div className="mb-4 flex flex-col">
                <label className="mb-1">Company Name:</label>
                <input
                  className={
                    formErrors.companyName ? "input-error input" : "input"
                  }
                  type="text"
                  name="companyName"
                  placeholder="Company name"
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
                  defaultValue={""}
                  name="companySize"
                >
                  <option value="" disabled>
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
                />
                {formErrors.companyIndustry && (
                  <p className="mt-1 text-xs text-red-500">
                    {formErrors.companyIndustry}
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
              <div className="mb-4 flex flex-col">
                <label className="mb-1">Website:</label>
                <input
                  className={formErrors.website ? "input-error input" : "input"}
                  type="text"
                  name="website"
                  placeholder="Website url"
                />
                {formErrors.website && (
                  <p className="mt-1 text-xs text-red-500">
                    {formErrors.website}
                  </p>
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
      </Layout>
    </Authenticated>
  );
};

export default Profile;
