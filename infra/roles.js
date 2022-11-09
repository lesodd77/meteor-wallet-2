// @ts-nocheck
import { Meteor } from 'meteor/meteor';
import { WalletRoles } from './WalletRoles';
import { Roles } from 'meteor/alanning:roles';

Roles.createRole(WalletRoles.ADMIN, { unlessExists: true });

Meteor.startup(() => {
    const user = Meteor.users.findOne({ email: 'fadecsolution@gmail.com' });

    if (!user || Roles.userIsInRole(user._id, WalletRoles.ADMIN)) {
        return;
    }
    Roles.addUsersToRoles(user._id, WalletRoles.ADMIN);
});
