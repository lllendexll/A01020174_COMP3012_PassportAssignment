import { Strategy as GitHubStrategy, Profile } from 'passport-github2';
import { PassportStrategy } from '../../interfaces/index';
import { database } from '../../models/userModel';
import { Request } from 'express';

const githubStrategy: GitHubStrategy = new GitHubStrategy(
    {
        clientID: "Ov23li3uNZYrsgSunhqT",
        clientSecret: "adf578da0af09b08996b1ea5a6c84921aae2487e",
        callbackURL: "http://localhost:8000/auth/github/callback",
        passReqToCallback: true,
    },
    
    /* FIX ME 😭 */
    async (req: Request, accessToken: string, refreshToken: string, profile: Profile, done: (error: any, user?: any) => void) => {
        console.log(profile);
        const user = {
            id: Number(profile.id),
            name: profile.username,
        };
        
        database.push(user);
        done(null, user);
    }
);

const passportGitHubStrategy: PassportStrategy = {
    name: 'github',
    strategy: githubStrategy,
};

export default passportGitHubStrategy;
