https://classroom.google.com/u/0/c/NTc2ODE3MzUwNzBa/m/OTAwMzEwMzAxNzJa/details?hl=es

Instance methods
// define a schema
var animalSchema = new Schema({ name: String, type: String });
// assign a function to the "methods" object of our animalSchema
animalSchema.methods.findSimilarTypes = function (cb) {
return this.model('Animal').find({ type: this.type }, cb);
}
Now all of our animal instances have a findSimilarTypes method available to it.
var Animal = mongoose.model('Animal', animalSchema);
var dog = new Animal({ type: 'dog' });
dog.findSimilarTypes(function (err, dogs) {
console.log(dogs); // woof
});