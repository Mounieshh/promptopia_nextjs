import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

import { connectToDb } from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      try {
        await connectToDb();

        const sessionUser = await User.findOne({
          email: session.user.email,
        });

        if (sessionUser) {
          session.user.id = sessionUser._id.toString();
        }

        return session;
      } catch (error) {
        console.error("Error in session callback:", error);
        return session;
      }
    },

    async signIn({ profile }) {
      try {
        await connectToDb();

        const userExists = await User.findOne({
          email: profile.email,
        });

        if (!userExists) {
          let username = profile.name.replace(/\s/g, "").toLowerCase();
          username = username.replace(/[^a-zA-Z0-9._]/g, "");
          username = username.substring(0, 20);

          if (!/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/.test(username)) {
            username = `user${Date.now()}`;
          }

          await User.create({
            email: profile.email,
            username: username,
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.error("Error in sign-in callback:", error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
