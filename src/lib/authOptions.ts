import CredentialsProvider from 'next-auth/providers/credentials';
import { NextAuthOptions } from 'next-auth';
import managerSchema from '@/schema/manager-schema';
import db from '@/lib/mongoDB-connect';

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: 'Credentials',

      credentials: {
        name: { label: 'Name', type: 'text', placeholder: 'jsmith' },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.name) {
            throw new Error('Missing register data');
          }

          await db.dbConnect();

          const manager = await managerSchema
            .findOne({
              name: credentials.name,
            })
            .exec();

          if (!manager) {
            throw new Error('user not found');
          }

          return manager;
        } catch (error) {
          throw new Error('Error while register' + error);
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
