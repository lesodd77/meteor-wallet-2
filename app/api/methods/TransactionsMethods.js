import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { ADD_TYPE, TransactionsCollection, TRANSFER_TYPE } from '../collections/TransactionsCollection';

Meteor.methods({
    'transactions.insert'(args) {
      const schema = new SimpleSchema({
        isTransferring: {
          type: Boolean,
          },
          sourceWalletId: {
            type: String,
          },
          destinationWalletId: {
            type: String,
            optional: !args.isTransferring,
          },
          amount: {
            type: Number,
            min: 1,
          },
      });
      const cleanArgs = schema.clean(args);
      schema.validate(cleanArgs);
      const { isTransferring, sourceWalletId, destinationWalletId, amount } = args;
        // insert a new data in transaction collection & check if the authorization
        return TransactionsCollection.insert({
        type: isTransferring ? TRANSFER_TYPE : ADD_TYPE,
         sourceWalletId,
         destinationWalletId: isTransferring ? destinationWalletId : null,
          amount,
          createdAt: new Date(),
        });
      },
  });