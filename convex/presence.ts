import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const updatePresence = mutation({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, { userId }) => {
    const now = Date.now();
    const existing = await ctx.db
      .query("presence")
      .withIndex("by_user_id", (q) => q.eq("userId", userId))
      .unique();

    if (existing) {
      await ctx.db.patch(existing._id, { lastSeen: now });
    } else {
      await ctx.db.insert("presence", { userId, lastSeen: now });
    }
  },
});

export const getOnlineUsers = query({
  args: {
    thresholdMs: v.optional(v.number()),
  },
  handler: async (ctx, { thresholdMs = 10_000 }) => {
    const now = Date.now();
    const onlineUsers = await ctx.db
      .query("presence")
      .withIndex("by_lastSeen", (q) => q.gte("lastSeen", now - thresholdMs))
      .collect();

    return onlineUsers.map((user) => user.userId);
  },
});
