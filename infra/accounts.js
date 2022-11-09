/* eslint-disable no-undef */
// @ts-nocheck
import { Accounts } from 'meteor/accounts-base';
// eslint-disable-next-line import/no-unresolved
import { PostsCollection } from '../app/api/collections/posts.collection';
import { WalletsCollection } from '../app/api/collections/WalletsCollection';
import { Meteor } from 'meteor/meteor';
import { ServiceConfiguration } from 'meteor/service-configuration';

function getEmailFromUser(user) {
   if (user.services?.google) {
    return user.services.google.email;
   }
   return user.emails[0].address;
}

Accounts.onCreateUser((options, user) => {
   const customizedUser = { ...user };

  // eslint-disable-next-line no-undef
  WalletsCollection.insert({ userId: user._id, createdAt: new Date() });
  PostsCollection.insert({ title,
   url,
   date,
   description,
   author,
   image,
    category,
    createdAt: new Date(),
      userId });

  customizedUser.email = getEmailFromUser(user);
   return customizedUser;
});

Accounts.setDefaultPublishFields({
   ...Accounts._defaultPublishFields.projection,
   email: 1,
});

const settings = Meteor.settings || {};

Meteor.startup(() => {
if (!settings.googleClientId || !settings.googleSecret) {
   throw Error('googleClientId and googleSecret are required');
}

// Accounts.config({ restrictedCreateionByEmailDomain: 'swed.com' });

ServiceConfiguration.configurations.upsert({
   service: 'google',
},

{
   $set: {
 service: 'google',
 clientId: settings.googleClientId,
 secret: settings.googleSecret,

},
});
});
