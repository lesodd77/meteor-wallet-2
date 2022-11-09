
import { Meteor } from 'meteor/meteor';
import { WalletsCollection } from '../collections/WalletsCollection';


Meteor.publish('myWallets', function publishAllWallets() {
    const { userId } = this;
    if (!userId) {
        throw new Meteor.Error('Access denied');
    }
    return WalletsCollection.find({ userId });
});
