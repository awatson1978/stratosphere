/**
 * Collection
 */
ReleaseVersions = new Mongo.Collection("releaseVersions");

/**
 * Indexes
 */
if(Meteor.isServer){
    ReleaseVersions._ensureIndex({ "track": 1 });
    ReleaseVersions._ensureIndex({ "private": 1 });
    ReleaseVersions._ensureIndex({ "track": 1, "version":1 });
    ReleaseVersions._ensureIndex({ "hidden":1, "lastUpdated":1});
}

/**
 * Schemas
 */
Stratosphere.schemas.ReleaseVersionSchema = new SimpleSchema([Stratosphere.schemas.BaseSchema,{
    track:{
        type:String
    },
    version:{
        type:String,
        custom:Stratosphere.utils.validateVersion
    },
    orderKey:{
        type:String
    },
    description:{
        type:String
    },
    recommended:{
        type:Boolean,
        defaultValue:false
    },
    tool:{
        type:String
    },
    packages:{
        type:Object,
        blackbox:true
    },
    patchReleaseVersion:{
        type:String,
        optional:true,
    },
    publishedBy:{
        type:Stratosphere.schemas.UserSchema,
        optional:true
    },
    published:{
        type:Date,
        optional:true
    }
}]);
Stratosphere.schemas.CustomReleaseVersionSchema = new SimpleSchema([Stratosphere.schemas.ReleaseVersionSchema,Stratosphere.schemas.CustomFieldsSchema.pick(['private','hidden'])]);
