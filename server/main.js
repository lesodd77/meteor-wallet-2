// @ts-nocheck
import { Meteor } from 'meteor/meteor';
import '../app/api/collections/TransactionsCollection';
import '../app/api/methods/ContactsMethods';
import '../app/api/methods/TransactionsMethods';
import '../app/api/publications/WalletsPublication';
import '../app/api/publications/ContactsPublication';
import '../app/api/collections/ContactsCollection';
import { WalletsCollection } from '../app/api/collections/WalletsCollection';
import '../infra/CustomError';

Meteor.startup(() => {
  if (!WalletsCollection.find().count()) {
     WalletsCollection.insert({
   createdAt: new Date(),
  });
}
});
