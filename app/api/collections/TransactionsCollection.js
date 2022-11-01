// @ts-nocheck
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { WalletsCollection } from './WalletsCollection';

export const TRANSFER_TYPE = 'TRANSFER';
export const ADD_TYPE = 'ADD';


export const TransactionsCollection = new Mongo.Collection('transactions');
 TransactionsCollection.before.insert(function (userId, transactionDocument) {
if (transactionDocument.type === TRANSFER_TYPE) {
  // we could also check here if destination wallet exist
  const sourceWalletId = WalletsCollection.findOne(transactionDocument.sourceWalletId);
  if (!sourceWalletId) {
      throw new Meteor.Error('Source wallet not found.');
  }
  if (sourceWalletId.balance < transactionDocument.amount) {
      throw new Meteor.Error('Insufficient funds.');
  }

  WalletsCollection.update(transactionDocument.sourceWalletId, {
  $inc: { balance: -transactionDocument.amount },
  });
  WalletsCollection.update(transactionDocument.destinationWalletId, {
      $inc: { balance: transactionDocument.amount },
      });
}

if (transactionDocument.type === ADD_TYPE) {
  const sourceWalletId = WalletsCollection.findOne(
      transactionDocument.sourceWalletId
      );
  if (!sourceWalletId) {
      throw new Meteor.Error('Source wallet not found.');
  }

  WalletsCollection.update(transactionDocument.sourceWalletId, {
  $inc: { balance: transactionDocument.amount },
  });
}

  transactionDocument.createdAt = Date.now();
});


const TransactionsSchema = new SimpleSchema({
    type: {
        type: String,
        allowedValues: [TRANSFER_TYPE, ADD_TYPE],
    },
    sourceWalletId: {
       type: String,
   },

    destinationWalletId: {
        type: String,
        optional: true,
   },
       amount: {
      type: Number,
   },
   createdAt: {
       type: Date,
   },
  });


  TransactionsCollection.attachSchema(TransactionsSchema);
