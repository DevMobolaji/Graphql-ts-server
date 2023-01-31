import { Resolver } from "../../types/graphql-utils";

export default async (resolver: Resolver, ...params: any[]) => {

    const result = await resolver(params[0], params[1], params[2], params[3]);

    if (!params[2].session || !params[2].session.userId) {
        return null
    }
    //check if user is an admin
    //User.fineOne({ where: { id: context.session.userId } })
    
    // if (!user || !user.admin) {
    //     throw Error("not an admin")
    //     return null
    // }
    
    return result
}

// export default async (
//   resolver: Resolver,
//   parent: any,
//   args: any,
//   context: any,
//   info: any
// ) => {
//     const result = await resolver(parent, args, context, info);

//     if (!context.session || !context.session.userId) {
//         throw Error("No cookies")
//     }
//     return result;
// };