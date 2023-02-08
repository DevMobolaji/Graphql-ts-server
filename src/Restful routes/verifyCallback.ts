import { TestDevSource } from "../data-source";
import { User } from "../entity/User";

export const verifyCallback = async (_accessToken: any, _refreshToken: any, profile: any, done: any) => {
    const { id, emails } = profile;
    const vf = emails[0].verified

    const query = TestDevSource
        .getRepository(User)
        .createQueryBuilder("user")
        .where("user.googleId = :id", { id })

    let email: string | null = null;

    if (emails) {
        email = emails[0].value;
        query.orWhere("user.email = :email", { email })
    }

    let user = await query.getOne()

    if (!user) {
        user = await User.create({
            googleId: id,
            email,
            confirmed: vf
        }).save()
    } else if (!user.googleId) {
        user.googleId = id;
        await user.save()
    } else {
        //login too out frontend
    }

    return done(null, { id: user.id });
}