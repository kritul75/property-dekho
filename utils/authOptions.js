
import GoogleProvider from "next-auth/providers/google";
import connectDB from '@/config/database';
import User from '@/models/User';


export const authOptions = {
    // Configure one or more authentication providers
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        authorization: {
          params: {
            prompt: 'consent',
            access_type: 'offline',
            response_type: 'code',
          },
        },
      }),
      // ...add more providers here
    ],
    callbacks: {
      
        async signIn({profile}){
          try {
                // 1.connect db
              await connectDB();
              // 2.check if user exists
              let user = await User.findOne({email:profile.email});
              // 3.not exists then save  user to db
              if(!user){
                // Truncate user name if too long
                const username = profile.name.slice(0, 20);
                
                user = await User.create({
                  email:profile.email,
                  username,
                  image:profile.picture,
                }) 
                
              }
              console.log(user);
              // return response
                return true;
          } catch (error) {
                console.log(error)
                console.error(error);
                return false;
          }
          
        },
        async session({ session }) {
          //sending user id with session
          try {
            await connectDB();
            const {_id} = await User.findOne({email:session.user.email});
            session.userId = _id.toString();

            return session;
          } catch (error) {
            console.log(error)
            console.error(error);
            return null;
          }
        }
      },
     

  }

  