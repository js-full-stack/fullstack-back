// import {
//   Ability,
//   AbilityBuilder,
//   AbilityClass,
//   InferSubjects,
// } from '@casl/ability';
// import { Injectable } from '@nestjs/common';
// import { Action } from 'src/app.utils';
// import { Program } from '../programs/program.entity';
// import { User } from '../users/user.entity';
// Action;

// type Subjects = InferSubjects<typeof Program | typeof User> | 'all';

// export type AppAbility = Ability<[Action, Subjects]>;

// @Injectable()
// export class CaslAbilityFactory {
//   createForUser(user: User) {
//     const { can, cannot, build } = new AbilityBuilder<
//       Ability<[Action, Subjects]>
//     >(Ability as AbilityClass<AppAbility>);

//     if (user.role.role === 'couch') {
//       can(Action.Manage, 'all'); // read-write access to everything
//     } else {
//       can(Action.Read, 'all'); // read-only access to everything
//     }

//     can(Action.Update, Program, { authorId: user.id });
//     // cannot(Action.Delete, Article, { isPublished: true });

//     return build({
//       // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
//       detectSubjectType: (item) =>
//         item.constructor as ExtractSubjectType<Subjects>,
//     });
//   }
// }
