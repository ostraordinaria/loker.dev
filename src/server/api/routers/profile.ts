import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { developerProfileSchema } from "~/pages/profile/developer";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const profileRouter = createTRPCRouter({
  getById: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.profile.findFirst({ where: { userId: input.userId } });
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
});
