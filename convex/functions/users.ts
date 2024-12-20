import { internalMutation, query, QueryCtx } from "../_generated/server";
import { UserJSON } from "@clerk/backend";
import { v, Validator } from "convex/values";

function generateRandomUsername() {
  const adjectives = [
    "Swift", "Mighty", "Brave", "Clever", "Lucky", "Silent", "Fierce",
    "Bold", "Witty", "Loyal", "Happy", "Gentle", "Kind", "Shy", "Bright"
  ];
  const animals = [
    "Fox", "Wolf", "Tiger", "Lion", "Bear", "Hawk", "Eagle", "Panther",
    "Otter", "Owl", "Dragon", "Phoenix", "Falcon", "Shark", "Dolphin"
  ];
  
  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
  const randomNumber = Math.floor(100 + Math.random() * 900); // Random 3-digit number
  
  return `${randomAdjective}${randomAnimal}${randomNumber}`;
}

export const current = query({
  args: {},
  handler: async (ctx) => {
    return await getCurrentUser(ctx);
  },
});

export const upsertFromClerk = internalMutation({
  args: { data: v.any() as Validator<UserJSON> }, // no runtime validation, trust Clerk
  async handler(ctx, { data }) {

    const user = await userByClerkId(ctx, data.id);
    if (user === null) {
      await ctx.db.insert("users", {
        clerkId: data.id,
        username: data.username ?? generateRandomUsername(),
        image: data.image_url ?? "",
      });
    } else {
      await ctx.db.patch(user._id, {
        username: data.username ?? generateRandomUsername(),
        image: data.image_url ?? "",
      });
    }
    
  },
});

export const deleteFromClerk = internalMutation({
  args: { clerkUserId: v.string() },
  async handler(ctx, { clerkUserId }) {
    const user = await userByClerkId(ctx, clerkUserId);

    if (user !== null) {
      await ctx.db.delete(user._id);
    } else {
      console.warn(
        `Can't delete user, there is none for Clerk user ID: ${clerkUserId}`,
      );
    }
  },
});

export async function getCurrentUserOrThrow(ctx: QueryCtx) {
  const userRecord = await getCurrentUser(ctx);
  if (!userRecord) throw new Error("Can't get current user");
  return userRecord;
}

export async function getCurrentUser(ctx: QueryCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (identity === null) {
    return null;
  }
  return await userByClerkId(ctx, identity.subject);
}

async function userByClerkId(ctx: QueryCtx, clerkId: string) {
  return await ctx.db
    .query("users")
    .withIndex("by_clerk_id", (q) => q.eq("clerkId", clerkId))
    .unique();
}