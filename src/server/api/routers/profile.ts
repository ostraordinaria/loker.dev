import { TRPCError } from "@trpc/server";
import { developerProfileSchema } from "~/pages/profile/developer";
import { recruiterProfileSchema } from "~/pages/profile/recruiter";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const profileRouter = createTRPCRouter({
  getProfile: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.profile.findFirst({
      where: { userId: ctx.session.user.id },
      include: { developerProfile: true, recruiterProfile: true },
    });
  }),

  isProfileExist: protectedProcedure.query(({ ctx }) => {
    return Boolean(
      ctx.prisma.profile.count({
        where: { userId: ctx.session.user.id },
      })
    );
  }),

  registerDeveloper: protectedProcedure
    .input(developerProfileSchema)
    .mutation(async ({ ctx, input }) => {
      const { availability, location, name, bio, personalSiteUrl, repoUrl } =
        input;

      const isProfileExist = await ctx.prisma.profile.findFirst({
        where: { userId: ctx.session.user.id },
      });

      if (isProfileExist) {
        throw new TRPCError({
          code: "UNPROCESSABLE_CONTENT",
          message: "Profile exist",
        });
      }

      const profile = await ctx.prisma.profile.create({
        data: {
          userId: ctx.session.user.id,
          name,
          developerProfile: {
            create: {
              bio,
              personalSiteUrl,
              repoUrl,
              locationId: location,
              availability,
            },
          },
        },
      });

      return profile;
    }),

  updateDeveloper: protectedProcedure
    .input(developerProfileSchema)
    .mutation(async ({ ctx, input }) => {
      const { availability, location, name, bio, personalSiteUrl, repoUrl } =
        input;

      const isProfileExist = await ctx.prisma.profile.findFirst({
        where: { userId: ctx.session.user.id },
      });

      if (!isProfileExist) {
        throw new TRPCError({
          code: "UNPROCESSABLE_CONTENT",
          message: "Profile not found",
        });
      }

      const profile = await ctx.prisma.profile.update({
        where: { userId: ctx.session.user.id },
        data: {
          name,
          developerProfile: {
            update: {
              bio,
              personalSiteUrl,
              repoUrl,
              locationId: location,
              availability,
            },
          },
        },
      });

      return profile;
    }),

  registerRecruiter: protectedProcedure
    .input(recruiterProfileSchema)
    .mutation(async ({ ctx, input }) => {
      const {
        companyIndustry,
        companyName,
        companySize,
        contact,
        website,
        location,
        name,
        bio,
      } = input;

      const isProfileExist = await ctx.prisma.profile.findFirst({
        where: { userId: ctx.session.user.id },
      });

      if (isProfileExist) {
        throw new TRPCError({
          code: "UNPROCESSABLE_CONTENT",
          message: "Profile exist",
        });
      }

      const profile = await ctx.prisma.profile.create({
        data: {
          userId: ctx.session.user.id,
          name,
          recruiterProfile: {
            create: {
              bio,
              companyIndustry,
              companyName,
              companySize,
              contact,
              website,
              locationId: location,
            },
          },
        },
      });

      return profile;
    }),

  updateRecruiter: protectedProcedure
    .input(recruiterProfileSchema)
    .mutation(async ({ ctx, input }) => {
      const {
        companyIndustry,
        companyName,
        companySize,
        contact,
        website,
        location,
        name,
        bio,
      } = input;

      const isProfileExist = await ctx.prisma.profile.findFirst({
        where: { userId: ctx.session.user.id },
      });

      if (!isProfileExist) {
        throw new TRPCError({
          code: "UNPROCESSABLE_CONTENT",
          message: "Profile not found",
        });
      }

      const profile = await ctx.prisma.profile.update({
        where: { userId: ctx.session.user.id },
        data: {
          userId: ctx.session.user.id,
          name,
          recruiterProfile: {
            update: {
              bio,
              companyIndustry,
              companyName,
              companySize,
              contact,
              website,
              locationId: location,
            },
          },
        },
      });

      return profile;
    }),
});
