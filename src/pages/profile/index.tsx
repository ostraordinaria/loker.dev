import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ZodError, type z } from "zod";
import Authenticated from "~/components/Authenticated";
import DeveloperProfileForm from "~/components/DeveloperProfileForm";
import Layout from "~/components/Layout";
import { api } from "~/utils/api";
import { developerProfileSchema } from "./developer";
import RecruiterProfileForm from "~/components/RecruiterProfileForm";
import { recruiterProfileSchema } from "./recruiter";

const ProfilePage = () => {
  const router = useRouter();
  const {
    data: profile,
    isLoading: fetchingProfile,
    refetch,
  } = api.profile.getProfile.useQuery();
  const { data: locations, isLoading: fetchingLocations } =
    api.location.getAll.useQuery();

  useEffect(() => {
    if (fetchingProfile) return;
    if (!profile) {
      router.push("/");
    }
  }, [fetchingProfile, profile, router]);

  const DeveloperProfile = () => {
    const { mutate, isLoading: isSubmitting } =
      api.profile.updateDeveloper.useMutation({
        onSuccess: async () => {
          toast.success("Profile updated");
          await refetch();
        },
        onError: (e) => {
          if (e.message) {
            toast.error(e.message);
          } else {
            toast.error("Something went wrong! Please try again later.");
          }
        },
      });

    const [formErrors, setFormErrors] = useState<
      Partial<z.infer<typeof developerProfileSchema>>
    >({});

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
      profile?.developerProfile && (
        <DeveloperProfileForm
          existingProfile={{ ...profile, ...profile.developerProfile }}
          fetchingLocations={fetchingLocations}
          locations={locations || []}
          isSubmitting={isSubmitting}
          handleSubmit={handleSubmit}
          formErrors={formErrors}
        />
      )
    );
  };

  const RecruiterProfile = () => {
    const { mutate, isLoading: isSubmitting } =
      api.profile.updateRecruiter.useMutation({
        onSuccess: async () => {
          toast.success("Profile updated");
          await refetch();
        },
        onError: (e) => {
          if (e.message) {
            toast.error(e.message);
          } else {
            toast.error("Something went wrong! Please try again later.");
          }
        },
      });

    const [formErrors, setFormErrors] = useState<
      Partial<z.infer<typeof recruiterProfileSchema>>
    >({});

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
      profile?.recruiterProfile && (
        <RecruiterProfileForm
          existingProfile={{ ...profile, ...profile.recruiterProfile }}
          fetchingLocations={fetchingLocations}
          locations={locations || []}
          isSubmitting={isSubmitting}
          handleSubmit={handleSubmit}
          formErrors={formErrors}
        />
      )
    );
  };

  return (
    <Authenticated>
      <Layout>
        <DeveloperProfile />
        <RecruiterProfile />
      </Layout>
    </Authenticated>
  );
};

export default ProfilePage;
